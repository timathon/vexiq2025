const fs = require('fs');
const path = require('path');

// ==========================================
// 1. CALIBRATION CONSTANTS
// ==========================================
// Derived from comparing robot internal units vs millimeters
const SCALE_X = 3.82285;
const SCALE_Y = 3.73187;
const OFFSET_X = 0.0;
const OFFSET_Y = 0.6073;
const SCALE_W = 3.81762;
const SCALE_H = 3.73187;

// Directories
const INPUT_FOLDER = 'artifacts/mm-coordinates';
const OUTPUT_FOLDER = 'artifacts/robot-coordinates';

// ==========================================
// 2. ROBOT CONFIGURATION TEMPLATES
// ==========================================
// Standard styling required by the robot app
const DEFAULT_PAGE_INFO = {
    "leftGap": 0, "alignOffsetX": 0, "topGap": 0, "bottomGap": 0,
    "alignOffsetY": 0, "baseLine": 0, "contentAlign": "Left",
    "rotation": 0, "lineGap": 8, "alignOffsetYMax": 0, "alignOffsetXMax": 0,
    "pageHeight": 20.735, "pageWidth": 166.92,
    "space": 1, "lineGapOffset": 0, "isDefault": false,
    "lineNum": 0, "fontSize": 100, "rightGap": 0,
    "fontPath": [ "DJ_kvenjoy_DJ.gfont","Xztianyuanti_kvenjoy_田园.gfont"]
};

const DEFAULT_CONTENT_FORMAT = "{\"charset\":\"UTF-8\",\"autoGp\":false,\"gpNum\":1,\"firstLineAlign\":\"LEFT\"}";
const CENTER_CONTENT_FORMAT = "{\"charset\":\"UTF-8\",\"autoGp\":false,\"gpNum\":1,\"firstLineAlign\":\"CENTER\"}";

function convertItem(item) {
    /** Converts a single item's MM coordinates to Robot Coordinates. */

    // Apply calibration math
    const newX = (item.x * SCALE_X) + OFFSET_X;
    const newY = (item.y * SCALE_Y) + OFFSET_Y;
    const newW = item.width * SCALE_W;
    const newH = item.height * SCALE_H;

    // Determine alignment based on item name (auto-detect captions)
    const isCenter = item.name && item.name.toLowerCase().includes("caption");

    // Create the specific pageInfo for this item
    const pageInfo = { ...DEFAULT_PAGE_INFO };
    let contentFormat = DEFAULT_CONTENT_FORMAT;

    if (isCenter) {
        pageInfo.contentAlign = "Center";
        contentFormat = CENTER_CONTENT_FORMAT;
    }

    // Construct the robot item
    return {
        name: item.name || 'Text Block',
        type: "text",
        x: Math.round(newX * 100) / 100,  // Round to 2 decimal places
        y: Math.round(newY * 100) / 100,  // Round to 2 decimal places
        width: Math.round(newW * 100) / 100,  // Round to 2 decimal places
        height: Math.round(newH * 100) / 100,  // Round to 2 decimal places
        rotation: item.rotation || 0,
        text: item.text || '',
        contentFormat: contentFormat,
        pageInfo: pageInfo
    };
}

function findNextLayoutNumber() {
    /** Finds the highest layout_*.json number and returns the next number. */
    let layoutFiles = [];
    
    // Check if output folder exists
    if (!fs.existsSync(OUTPUT_FOLDER)) {
        return 1;
    }
    
    const files = fs.readdirSync(OUTPUT_FOLDER);
    layoutFiles = files.filter(file => 
        file.startsWith("layout_") && 
        file.endsWith(".json")
    );
    
    if (layoutFiles.length === 0) {
        return 1;
    }
    
    let maxNumber = 0;
    for (const filename of layoutFiles) {
        try {
            // Extract number from layout_1.json, layout_2.json, etc.
            const numberPart = filename.substring(7, filename.length - 5); // Remove "layout_" and ".json"
            const number = parseInt(numberPart, 10);
            if (!isNaN(number)) {
                maxNumber = Math.max(maxNumber, number);
            }
        } catch (error) {
            // If the number part is not a valid integer, skip this file
            continue;
        }
    }
    
    return maxNumber + 1;
}

function processFile(filePath) {
    /** Reads a JSON file, converts items, saves to output, and deletes input. */
    const filename = path.basename(filePath);
    
    // Determine the next layout number and create output filename
    const nextNumber = findNextLayoutNumber();
    const outputFilename = `layout_${nextNumber}.json`;
    const outputPath = path.join(OUTPUT_FOLDER, outputFilename);

    try {
        // 1. Read input file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // 2. Handle both list of items (snippet output) or full object
        const itemsList = Array.isArray(data) ? data : (data.items || []);

        // 3. Convert all items
        const robotItems = itemsList.map(item => convertItem(item));

        // 4. Wrap in final robot document structure
        const finalJson = {
            orientation: 0,
            width: 21,    // A4 Width (cm)
            height: 29.7, // A4 Height (cm)
            axesPosX: 0,
            axesPosY: 0,
            items: robotItems
        };

        // 5. Ensure output folder exists
        if (!fs.existsSync(OUTPUT_FOLDER)) {
            fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
            console.log(`Created output folder: '${OUTPUT_FOLDER}'`);
        }

        // 6. Save to output folder with new name
        fs.writeFileSync(outputPath, JSON.stringify(finalJson, null, 2));
        console.log(`✅ Converted: ${filename} -> ${outputFilename}`);

        // 7. DELETE INPUT FILE (Only reached if steps above succeed)
        fs.unlinkSync(filePath);
        console.log(`🗑️  Deleted input file: ${filename}`);

    } catch (error) {
        console.log(`❌ Error processing ${filename}: ${error.message}`);
        console.log("   (Input file was NOT deleted due to error)");
    }
}

// ==========================================
// 3. MAIN EXECUTION LOOP
// ==========================================
function main() {
    // Ensure input folder exists
    if (!fs.existsSync(INPUT_FOLDER)) {
        console.log(`Error: Folder '${INPUT_FOLDER}' does not exist.`);
        process.exit(1);
    }

    if (!fs.existsSync(OUTPUT_FOLDER)) {
        fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
        console.log(`Created output folder: '${OUTPUT_FOLDER}'`);
    }

    // Get all JSON files
    const files = fs.readdirSync(INPUT_FOLDER)
        .filter(file => path.extname(file).toLowerCase() === '.json')
        .map(file => path.join(INPUT_FOLDER, file));

    if (files.length === 0) {
        console.log(`No JSON files found in '${INPUT_FOLDER}'.`);
    } else {
        console.log(`Found ${files.length} files. Starting conversion...\n`);
        for (const file of files) {
            processFile(file);
        }
        console.log(`\nAll done! Check the '${OUTPUT_FOLDER}' folder.`);
    }
}

// Run main function if this script is executed directly
if (require.main === module) {
    main();
}

module.exports = {
    convertItem,
    findNextLayoutNumber,
    processFile,
    main
};