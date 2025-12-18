(function() {
    // 1. Select and Save the .sheet divs
    const sheets = Array.from(document.querySelectorAll('.sheet'));
    
    if (sheets.length === 0) {
        console.warn("No .sheet elements found!");
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

    // Assemble and inject controls
    controlPanel.appendChild(infoText);
    controlPanel.appendChild(numInput);
    controlPanel.appendChild(showBtn);
    document.body.appendChild(controlPanel);

    // Automatically load the first page on start
    renderSheet();

    console.log("Controls loaded at bottom of screen.");
})();