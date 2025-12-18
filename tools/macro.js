(async function() {
    // ================= CONFIGURATION =================
    // 1) Set the page start in the code
    let startPage = 1; 
    const delayBetweenSteps = 500; // Time in ms to wait between downloads (prevents browser blocking)
    
    // ================= HELPER FUNCTIONS =================

    // Adapted from page-text-position.js to work with a direct element instead of a selector
    function getTextPositionData(element, index) {
        if (!element) return null;

        // 1. Get Geometry (X, Y, Width, Height)
        const rect = element.getBoundingClientRect();

        // 2. Get Rotation (Parse CSS Transform Matrix)
        const style = window.getComputedStyle(element);
        const transform = style.transform || style.webkitTransform || style.mozTransform;
        
        let rotation = 0;
        if (transform && transform !== 'none') {
            try {
                const values = transform.split('(')[1].split(')')[0].split(',');
                const a = parseFloat(values[0]);
                const b = parseFloat(values[1]);
                rotation = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            } catch (e) {
                console.warn("Error parsing rotation", e);
            }
        }

        // 3. Construct the JSON object
        return {
            name: `Item_${index}_text`,
            type: "text",
            x: parseFloat(rect.x.toFixed(2)),
            y: parseFloat(rect.y.toFixed(2)),
            width: parseFloat(rect.width.toFixed(2)),
            height: parseFloat(rect.height.toFixed(2)),
            rotation: rotation,
            text: element.innerText.trim()
        };
    }

    // Helper to find leaf-like elements that actually contain text
    // This prevents selecting a parent <div> and its child <p> separately
    function getContentElements(container) {
        const elements = [];
        // Walk the tree to find elements that have direct text node children
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function(node) {
                    // Check if element is visible
                    if (node.offsetParent === null) return NodeFilter.FILTER_REJECT;
                    
                    // Check if it has non-empty direct text nodes
                    const hasText = Array.from(node.childNodes).some(n => 
                        n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0
                    );
                    
                    return hasText ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                }
            }
        );

        while (walker.nextNode()) {
            elements.push(walker.currentNode);
        }
        return elements;
    }

    // ================= MAIN PROCESS =================

    // 2) Count the .sheet in current html
    const initialSheetCount = document.querySelectorAll('.sheet').length;
    console.log(`Found ${initialSheetCount} sheets to process.`);

    let loopCount = 0;

    // 6) Repeat steps till all .sheet are gone
    while (document.querySelector('.sheet')) {
        // Target the top .sheet
        const topSheet = document.querySelector('.sheet');
        
        // Calculate current page number: start + loop count
        const currentPageNumber = startPage + loopCount;
        
        console.log(`Processing Sheet ${loopCount + 1} (Page ${currentPageNumber})...`);

        // 3) Get the text positions in the top .sheet
        const textElements = getContentElements(topSheet);
        const pageData = textElements.map((el, i) => getTextPositionData(el, i));

        // 4) Save the text position into a json file
        const fileName = `page-${currentPageNumber}.json`;
        const jsonStr = JSON.stringify(pageData, null, 2);
        const blob = new Blob([jsonStr], {type: "application/json"});
        
        // Trigger download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);

        // 5) Remove the .sheet on the top
        topSheet.remove();

        loopCount++;

        // Small delay to allow file download to register and DOM to reflow
        await new Promise(resolve => setTimeout(resolve, delayBetweenSteps));
    }

    console.log("All sheets processed.");
})();