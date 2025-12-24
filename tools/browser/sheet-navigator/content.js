// Content script - runs on all web pages
(function() {
    // Check if controls already exist to prevent duplicate injection
    if (document.querySelector('.sheet-controls-noprint')) {
        return;
    }

    // 1. Select and Save the .sheet divs
    const sheets = Array.from(document.querySelectorAll('.sheet'));
    
    if (sheets.length === 0) {
        console.log("No .sheet elements found on this page.");
        return;
    }

    // Store the parent node (usually body) to insert sheets back later
    const container = sheets[0].parentNode;

    // 2. Remove them from the DOM initially
    sheets.forEach(sheet => sheet.remove());

    // 3. Create the Control Panel
    const controlPanel = document.createElement('div');
    controlPanel.className = "sheet-controls-noprint";
    
    // Style the panel (Fixed BOTTOM CENTER)
    controlPanel.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #fff;
        border: 1px solid #ccc;
        padding: 10px 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: sans-serif;
        display: flex;
        gap: 10px;
        align-items: center;
        border-radius: 30px;
    `;

    // 4. Add "Non-Printable" Logic via CSS
    // This ensures the toolbar disappears when you press Ctrl+P
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        @media print { 
            .sheet-controls-noprint { display: none !important; } 
        }
    `;
    document.head.appendChild(styleTag);

    // 5. Create Inputs
    const numInput = document.createElement('input');
    numInput.type = 'number';
    numInput.min = 1;
    numInput.max = sheets.length;
    numInput.value = 1;
    numInput.style.width = '50px';
    numInput.style.padding = '5px';
    numInput.style.textAlign = 'center';
    numInput.style.borderRadius = '4px';
    numInput.style.border = '1px solid #ccc';

    const showBtn = document.createElement('button');
    showBtn.innerText = "Load Page";
    showBtn.style.padding = '6px 15px';
    showBtn.style.cursor = 'pointer';
    showBtn.style.backgroundColor = '#007bff';
    showBtn.style.color = 'white';
    showBtn.style.border = 'none';
    showBtn.style.borderRadius = '4px';

    const infoText = document.createElement('span');
    infoText.innerText = `Total Sheets: ${sheets.length}`;
    infoText.style.fontSize = '14px';
    infoText.style.color = '#333';
    infoText.style.fontWeight = 'bold';

    const disableBtn = document.createElement('button');
    disableBtn.innerText = "Disable";
    disableBtn.style.padding = '6px 15px';
    disableBtn.style.cursor = 'pointer';
    disableBtn.style.backgroundColor = '#dc3545';
    disableBtn.style.color = 'white';
    disableBtn.style.border = 'none';
    disableBtn.style.borderRadius = '4px';

    const exportBtn = document.createElement('button');
    exportBtn.innerText = "Export JSON";
    exportBtn.style.padding = '6px 15px';
    exportBtn.style.cursor = 'pointer';
    exportBtn.style.backgroundColor = '#28a745';
    exportBtn.style.color = 'white';
    exportBtn.style.border = 'none';
    exportBtn.style.borderRadius = '4px';

    // Create separator elements
    const separator1 = document.createElement('span');
    separator1.innerText = '|';
    separator1.style.color = '#666';
    separator1.style.fontSize = '20px';
    separator1.style.fontWeight = '300';
    separator1.style.padding = '0 5px';

    const separator2 = document.createElement('span');
    separator2.innerText = '|';
    separator2.style.color = '#666';
    separator2.style.fontSize = '20px';
    separator2.style.fontWeight = '300';
    separator2.style.padding = '0 5px';

    // 6. Logic to swap sheets
    let currentSheetNode = null;

    const renderSheet = () => {
        const index = parseInt(numInput.value) - 1; // Convert 1-based input to 0-based index

        if (index >= 0 && index < sheets.length) {
            // Remove the currently displayed sheet if it exists
            if (currentSheetNode) {
                currentSheetNode.remove();
            }
            
            // Get the new sheet and append it
            currentSheetNode = sheets[index];
            container.appendChild(currentSheetNode);
            
            // Optional: Scroll to top when loading new page
            window.scrollTo(0, 0);
        } else {
            alert(`Please enter a number between 1 and ${sheets.length}`);
        }
    };

    // Click event
    showBtn.onclick = renderSheet;

    // Allow pressing "Enter" in the input box
    numInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            renderSheet();
        }
    });

    // Disable button functionality
    disableBtn.onclick = () => {
        // Remove the current sheet from display
        if (currentSheetNode) {
            currentSheetNode.remove();
        }
        
        // Restore all sheets back to the container
        sheets.forEach(sheet => container.appendChild(sheet));
        
        // Remove the control panel
        controlPanel.remove();
        
        // Remove the style tag
        styleTag.remove();
        
        console.log("Sheet Navigator: Controls disabled. All sheets restored.");
    };

    // Export JSON button functionality
    exportBtn.onclick = async () => {
        await getLayoutJson('sheet_layout.json');
    };

    /**
     * Scrapes the .sheet element and saves the layout as a JSON file.
     * NOW SUPPORTS: Tables (td/th), Headers (h1-h6), Lists, and Footer/Page Numbers.
     * @param {string} fileName - The default name of the file (default: "sheet_layout.json")
     */
    async function getLayoutJson(fileName = 'sheet_layout.json') {
        // 1. Define the Container (The A4 Sheet)
        const sheet = currentSheetNode || document.querySelector('.sheet');
        if (!sheet) return console.error("Could not find .sheet element!");

        // Get the sheet's dimensions in pixels
        const sheetRect = sheet.getBoundingClientRect();

        // Calculate the scale: HTML pixels to Millimeters
        // We know the sheet is defined as 210mm wide in CSS
        const scaleFactor = 210 / sheetRect.width;

        // 2. Select all text elements you want to print
        // UPDATED: Added 'td, th' for tables, 'h1-h6' for titles, and '.page-number'
        const elements = Array.from(sheet.querySelectorAll(
            'h1, h2, h3, h4, h5, h6, p, .sticky-note, .footer, li, td, th, .page-number, .caption'
        ));
        
        const items = elements.map((el, index) => {
            // Get the element's exact position in pixels
            const rect = el.getBoundingClientRect();

            // Check if element is visible or empty
            if (rect.width === 0 || rect.height === 0) return null;
            
            // Skip table cells that are purely for structure (empty) if desired, 
            // but often we want them if they contain whitespace. 
            // We trim text to check real content.
            let finalText = el.innerText.trim();
            if (!finalText) return null; // Skip empty elements to keep JSON clean

            // Calculate coordinates relative to the sheet
            const x_mm = (rect.left - sheetRect.left) * scaleFactor;
            const y_mm = (rect.top - sheetRect.top) * scaleFactor;
            const width_mm = rect.width * scaleFactor;
            const height_mm = rect.height * scaleFactor;

            // Get Rotation if it exists
            const style = window.getComputedStyle(el);
            let rotation = 0;
            if (style.transform !== 'none') {
                const values = style.transform.split('(')[1].split(')')[0].split(',');
                const a = values[0];
                const b = values[1];
                rotation = Math.atan2(b, a); // Returns radians
            }

            // --- Handle List Markers (bullets/numbers) ---
            if (el.tagName === 'LI') {
                const parent = el.parentElement;
                // If inside an Unordered List (UL), add a bullet point
                if (parent && parent.tagName === 'UL') {
                    finalText = `• ${finalText}`;
                } 
                // If inside an Ordered List (OL), add the number (1., 2., etc.)
                else if (parent && parent.tagName === 'OL') {
                    const siblings = Array.from(parent.children).filter(child => child.tagName === 'LI');
                    const listIndex = siblings.indexOf(el) + 1;
                    finalText = `${listIndex}. ${finalText}`;
                }
            }

            // 3. Return the JSON Item structure
            return {
                name: `Item_${index}_${el.tagName.toLowerCase()}`,
                type: "text",
                tag: el.tagName.toLowerCase(),
                x: parseFloat(x_mm.toFixed(2)),
                y: parseFloat(y_mm.toFixed(2)),
                width: parseFloat(width_mm.toFixed(2)),
                height: parseFloat(height_mm.toFixed(2)),
                rotation: rotation,
                text: finalText
            };
        }).filter(item => item !== null);

        // --- SAVE TO FILE ---
        const jsonString = JSON.stringify(items, null, 2);

        try {
            if (window.showSaveFilePicker) {
                const handle = await window.showSaveFilePicker({
                    suggestedName: fileName,
                    types: [{
                        description: 'JSON File',
                        accept: { 'application/json': ['.json'] },
                    }],
                });
                const writable = await handle.createWritable();
                await writable.write(jsonString);
                await writable.close();
                console.log(`Successfully saved to user-selected path.`);
            } else {
                throw new Error("File System Access API not supported.");
            }
        } catch (err) {
            console.warn("Using fallback download method:", err.message);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    // Assemble and inject controls
    controlPanel.appendChild(infoText);
    controlPanel.appendChild(numInput);
    controlPanel.appendChild(showBtn);
    controlPanel.appendChild(separator1);
    controlPanel.appendChild(exportBtn);
    controlPanel.appendChild(separator2);
    controlPanel.appendChild(disableBtn);
    document.body.appendChild(controlPanel);

    // Automatically load the first page on start
    renderSheet();

    console.log("Sheet Navigator: Controls loaded at bottom of screen.");
})();