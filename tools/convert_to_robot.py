import json
import os
import glob

# ==========================================
# 1. CALIBRATION CONSTANTS
# ==========================================
# Derived from comparing robot internal units vs millimeters
SCALE_X = 3.82285
SCALE_Y = 3.73187
OFFSET_X = 0.0      
OFFSET_Y = 0.6073   
SCALE_W = 3.81762   
SCALE_H = 3.73187   

# Directories
INPUT_FOLDER = 'artifacts/mm-coordinates'
OUTPUT_FOLDER = 'artifacts/robot-coordinates'

# ==========================================
# 2. ROBOT CONFIGURATION TEMPLATES
# ==========================================
# Standard styling required by the robot app
DEFAULT_PAGE_INFO = {
    "leftGap": 0, "alignOffsetX": 0, "topGap": 0, "bottomGap": 0,
    "alignOffsetY": 0, "baseLine": 0, "contentAlign": "Left",
    "rotation": 0, "lineGap": 8, "alignOffsetYMax": 0, "alignOffsetXMax": 0,
    "pageHeight": 20.735, "pageWidth": 166.92, 
    "space": 1, "lineGapOffset": 0, "isDefault": False,
    "lineNum": 0, "fontSize": 100, "rightGap": 0,
    "fontPath": [ "DJ_kvenjoy_DJ.gfont","Xztianyuanti_kvenjoy_田园.gfont"]
}

DEFAULT_CONTENT_FORMAT = "{\"charset\":\"UTF-8\",\"autoGp\":false,\"gpNum\":1,\"firstLineAlign\":\"LEFT\"}"
CENTER_CONTENT_FORMAT = "{\"charset\":\"UTF-8\",\"autoGp\":false,\"gpNum\":1,\"firstLineAlign\":\"CENTER\"}"

def convert_item(item):
    """Converts a single item's MM coordinates to Robot Coordinates."""
    
    # Apply calibration math
    new_x = (item['x'] * SCALE_X) + OFFSET_X
    new_y = (item['y'] * SCALE_Y) + OFFSET_Y
    new_w = item['width'] * SCALE_W
    new_h = item['height'] * SCALE_H
    
    # Determine alignment based on item name (auto-detect captions)
    is_center = "caption" in item.get('name', '').lower()
    
    # Create the specific pageInfo for this item
    page_info = DEFAULT_PAGE_INFO.copy()
    content_format = DEFAULT_CONTENT_FORMAT
    
    if is_center:
        page_info["contentAlign"] = "Center"
        content_format = CENTER_CONTENT_FORMAT

    # Construct the robot item
    return {
        "name": item.get('name', 'Text Block'),
        "type": "text",
        "x": round(new_x, 2),
        "y": round(new_y, 2),
        "width": round(new_w, 2),
        "height": round(new_h, 2),
        "rotation": item.get('rotation', 0),
        "text": item.get('text', ''),
        "contentFormat": content_format,
        "pageInfo": page_info
    }

def find_next_layout_number():
    """Finds the highest layout_*.json number and returns the next number."""
    layout_files = glob.glob(os.path.join(OUTPUT_FOLDER, "layout_*.json"))
    if not layout_files:
        return 1

    max_number = 0
    for file_path in layout_files:
        filename = os.path.basename(file_path)
        if filename.startswith("layout_") and filename.endswith(".json"):
            try:
                # Extract number from layout_1.json, layout_2.json, etc.
                number_part = filename[7:-5]  # Remove "layout_" and ".json"
                number = int(number_part)
                max_number = max(max_number, number)
            except ValueError:
                # If the number part is not a valid integer, skip this file
                continue

    return max_number + 1

def process_file(file_path):
    """Reads a JSON file, converts items, saves to output, and deletes input."""
    filename = os.path.basename(file_path)

    # Determine the next layout number and create output filename
    next_number = find_next_layout_number()
    output_filename = f"layout_{next_number}.json"
    output_path = os.path.join(OUTPUT_FOLDER, output_filename)

    try:
        # 1. Read input file
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # 2. Handle both list of items (snippet output) or full object
        items_list = data if isinstance(data, list) else data.get('items', [])

        # 3. Convert all items
        robot_items = [convert_item(item) for item in items_list]

        # 4. Wrap in final robot document structure
        final_json = {
            "orientation": 0,
            "width": 21,    # A4 Width (cm)
            "height": 29.7, # A4 Height (cm)
            "axesPosX": 0,
            "axesPosY": 0,
            "items": robot_items
        }

        # 5. Save to output folder with new name
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(final_json, f, indent=2, ensure_ascii=False)

        print(f"✅ Converted: {filename} -> {output_filename}")

        # 6. DELETE INPUT FILE (Only reached if steps above succeed)
        os.remove(file_path)
        print(f"🗑️  Deleted input file: {filename}")

    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")
        print("   (Input file was NOT deleted due to error)")

# ==========================================
# 3. MAIN EXECUTION LOOP
# ==========================================
if __name__ == "__main__":
    # Ensure folders exist
    if not os.path.exists(INPUT_FOLDER):
        print(f"Error: Folder '{INPUT_FOLDER}' does not exist.")
        exit()
    
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)
        print(f"Created output folder: '{OUTPUT_FOLDER}'")

    # Get all JSON files
    files = glob.glob(os.path.join(INPUT_FOLDER, "*.json"))
    
    if not files:
        print(f"No JSON files found in '{INPUT_FOLDER}'.")
    else:
        print(f"Found {len(files)} files. Starting conversion...\n")
        for file in files:
            process_file(file)
        print(f"\nAll done! Check the '{OUTPUT_FOLDER}' folder.")