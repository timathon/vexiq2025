function getLayoutJson(fileName = 'toc_layout.json') {
    const sheet = document.querySelector('.sheet');
    if (!sheet) return console.error("Could not find .sheet element!");

    const sheetRect = sheet.getBoundingClientRect();
    const scaleFactor = 210 / sheetRect.width;

    // --- UPDATED SELECTOR ---
    // 1. h1, h2, etc: Headings
    // 2. .page-number: The page number at the bottom
    // 3. li > strong > a: The "Chapter Title" links (prevents selecting the whole list block)
    // 4. ul > li > ul > li: The "Sub-chapter" items (1.1, 1.2, etc.)
    const elements = Array.from(sheet.querySelectorAll('h1, h2, h3, .page-number, li > strong > a, ul > li > ul > li'));

    const items = elements.map((el, index) => {
        const rect = el.getBoundingClientRect();

        // Skip invisible items
        if (rect.width === 0 || rect.height === 0) return null;

        const x_mm = (rect.left - sheetRect.left) * scaleFactor;
        const y_mm = (rect.top - sheetRect.top) * scaleFactor;
        const width_mm = rect.width * scaleFactor;
        const height_mm = rect.height * scaleFactor;

        // Rotation logic
        const style = window.getComputedStyle(el);
        let rotation = 0;
        if (style.transform !== 'none') {
            const values = style.transform.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            rotation = Math.atan2(b, a); 
        }

        return {
            name: `Item_${index}_${el.tagName}`,
            type: "text",
            x: parseFloat(x_mm.toFixed(2)),
            y: parseFloat(y_mm.toFixed(2)),
            width: parseFloat(width_mm.toFixed(2)),
            height: parseFloat(height_mm.toFixed(2)),
            rotation: rotation,
            // Use innerText to get clean text
            text: el.innerText.trim() 
        };
    }).filter(item => item !== null && item.text !== ""); // Filter nulls and empty strings

    // Save to file
    const jsonString = JSON.stringify(items, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`Saved ${items.length} items to ${fileName}`);
}

getLayoutJson();