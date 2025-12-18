/**
 * Scrapes the .sheet element and saves the layout as a JSON file.
 * Includes improved handling for Headers (h1-h6) and List Items (ul/ol markers).
 * @param {string} fileName - The default name of the file (default: "sheet_layout.json")
 */
async function getLayoutJson(fileName = 'sheet_layout.json') {
    // 1. Define the Container (The A4 Sheet)
    const sheet = document.querySelector('.sheet');
    if (!sheet) return console.error("Could not find .sheet element!");

    // Get the sheet's dimensions in pixels
    const sheetRect = sheet.getBoundingClientRect();

    // Calculate the scale: HTML pixels to Millimeters
    // We know the sheet is defined as 210mm wide in CSS
    const scaleFactor = 210 / sheetRect.width;

    // 2. Select all text elements you want to print
    // UPDATED: Added h1-h6 to capture headers, which were missing before.
    // const elements = Array.from(sheet.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .sticky-note, .footer, li'));
    const elements = Array.from(sheet.querySelectorAll('p, .sticky-note, .footer, li'));
    
    const items = elements.map((el, index) => {
        // Get the element's exact position in pixels
        const rect = el.getBoundingClientRect();

        // Check if element is visible
        if (rect.width === 0 || rect.height === 0) return null;

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

        // --- NEW LOGIC: Handle List Markers (bullets/numbers) ---
        let finalText = el.innerText.trim();

        if (el.tagName === 'LI') {
            const parent = el.parentElement;
            // If inside an Unordered List (UL), add a bullet point
            if (parent && parent.tagName === 'UL') {
                finalText = `• ${finalText}`;
            } 
            // If inside an Ordered List (OL), add the number (1., 2., etc.)
            else if (parent && parent.tagName === 'OL') {
                // Find index among LI siblings to determine the number
                const siblings = Array.from(parent.children).filter(child => child.tagName === 'LI');
                const listIndex = siblings.indexOf(el) + 1; // 1-based index
                finalText = `${listIndex}. ${finalText}`;
            }
        }

        // 3. Return the JSON Item structure
        return {
            name: `Item_${index}_${el.tagName.toLowerCase()}`, // Changed to tagName for better clarity
            type: "text",
            tag: el.tagName.toLowerCase(), // Useful to know if it's h1 vs p
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
        } 
        else {
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

// Usage:
getLayoutJson('layout_with_headers.json');