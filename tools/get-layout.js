function getLayoutJson() {
    // 1. Define the Container (The A4 Sheet)
    const sheet = document.querySelector('.sheet');
    if (!sheet) return console.error("Could not find .sheet element!");

    // Get the sheet's dimensions in pixels
    const sheetRect = sheet.getBoundingClientRect();
    
    // Calculate the scale: HTML pixels to Millimeters
    // We know the sheet is defined as 210mm wide in CSS
    const scaleFactor = 210 / sheetRect.width;

    // 2. Select all text elements you want to print
    // (Paragraphs, captions, footers, but exclude hidden/empty ones)
    const elements = Array.from(sheet.querySelectorAll('p, .sticky-note, .footer'));

    const items = elements.map((el, index) => {
        // Get the element's exact position in pixels
        const rect = el.getBoundingClientRect();

        // Check if element is visible
        if (rect.width === 0 || rect.height === 0) return null;

        // Calculate coordinates relative to the sheet (Top-Left is 0,0)
        // Convert to Millimeters using the scaleFactor
        const x_mm = (rect.left - sheetRect.left) * scaleFactor;
        const y_mm = (rect.top - sheetRect.top) * scaleFactor;
        const width_mm = rect.width * scaleFactor;
        const height_mm = rect.height * scaleFactor;

        // Get Rotation if it exists (e.g., sticky notes)
        const style = window.getComputedStyle(el);
        let rotation = 0;
        if (style.transform !== 'none') {
            const values = style.transform.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            rotation = Math.atan2(b, a); // Returns radians
        }

        // 3. Return the JSON Item structure
        return {
            name: `Item_${index}_${el.className || 'text'}`,
            type: "text",
            // Note: You may need to adjust the multiplier below depending on your 
            // robot app's specific unit (e.g. if 100 = 10mm, multiply by 10)
            x: parseFloat(x_mm.toFixed(2)), 
            y: parseFloat(y_mm.toFixed(2)), 
            width: parseFloat(width_mm.toFixed(2)),
            height: parseFloat(height_mm.toFixed(2)),
            rotation: rotation,
            text: el.innerText.trim()
        };
    }).filter(item => item !== null); // Remove empty items

    console.log(JSON.stringify(items, null, 2));
}

getLayoutJson();