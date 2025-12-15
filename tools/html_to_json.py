import os
import glob
import json
import math
import re
from bs4 import BeautifulSoup

# --- CONFIGURATION ---
INPUT_FOLDER = "."            # Where your HTML files are
OUTPUT_FOLDER = "json_output" # Where the JSON files will be saved
DEFAULT_FONT = ["33_kvenjoy_66.gfont", "Apollo_kvenjoy_Zl.gfont"]

# Coordinates (Calibrated from your example)
LOG_COORDS = {"x": 157, "y": 546, "w": 457.62, "h": 235.78}
STICKY_COORDS = {"x": 268, "y": 848, "w": 207.76, "h": 136.43}

def extract_sheet_data(sheet_soup):
    """
    Extracts handwriting items from a SINGLE sheet <div>.
    """
    items = []

    # --- 1. EXTRACT LOG ENTRY (The main text block) ---
    # We look for the div with specific margins inside THIS sheet
    log_div = sheet_soup.find('div', style=lambda v: v and 'margin: 30px 80px' in v)
    
    if log_div:
        lines = [p.get_text(" ", strip=True) for p in log_div.find_all('p')]
        full_text = "\n\n".join(lines)
        
        items.append({
            "name": "Log Entry",
            "type": "text",
            "x": LOG_COORDS['x'],
            "y": LOG_COORDS['y'],
            "width": LOG_COORDS['w'],
            "height": LOG_COORDS['h'],
            "rotation": 0,
            "text": full_text,
            "contentFormat": "{\"charset\":\"UTF-8\",\"autoGp\":false,\"gpNum\":1,\"firstLineAlign\":\"LEFT\"}",
            "pageInfo": {
                "contentAlign": "Left",
                "fontSize": 100,
                "lineGap": 8,
                "fontPath": DEFAULT_FONT,
                "pageWidth": 121.34,
                "pageHeight": 62.64
            }
        })

    # --- 2. EXTRACT STICKY NOTE ---
    sticky = sheet_soup.find('div', class_='sticky-note')
    
    if sticky:
        style = sticky.get('style', '')
        rotation_rads = 0
        
        match = re.search(r'rotate\((-?\d+(\.\d+)?)deg\)', style)
        if match:
            deg = float(match.group(1))
            rotation_rads = deg * (math.pi / 180)

        text_content = sticky.get_text("\n", strip=True)
        
        items.append({
            "name": "Sticky Note",
            "type": "text",
            "x": STICKY_COORDS['x'],
            "y": STICKY_COORDS['y'],
            "width": STICKY_COORDS['w'],
            "height": STICKY_COORDS['h'],
            "rotation": rotation_rads,
            "text": text_content,
            "contentFormat": "{\"charset\":\"UTF-8\",\"autoGp\":false,\"gpNum\":1,\"firstLineAlign\":\"LEFT\"}",
            "pageInfo": {
                "contentAlign": "Center",
                "fontSize": 100,
                "lineGap": 8,
                "fontPath": DEFAULT_FONT,
                "pageWidth": 55.23,
                "pageHeight": 36.36
            }
        })

    # --- 3. RETURN FINAL STRUCTURE IF ITEMS EXIST ---
    if not items:
        return None

    return {
        "orientation": 0,
        "width": 21,
        "height": 29.7,
        "axesPosX": 0,
        "axesPosY": 0,
        "items": items
    }

def main():
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    html_files = glob.glob(os.path.join(INPUT_FOLDER, "*.html"))
    print(f"📂 Found {len(html_files)} HTML files.")

    for file_path in html_files:
        base_name = os.path.splitext(os.path.basename(file_path))[0]
        
        with open(file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        # Find all sheets in this specific HTML file
        sheets = soup.find_all('div', class_='sheet')
        print(f"   📄 Processing '{base_name}': found {len(sheets)} sheets.")

        for index, sheet in enumerate(sheets):
            # 1. Try to find the page number for the filename
            page_num_div = sheet.find('div', class_='page-number')
            if page_num_div:
                page_suffix = page_num_div.get_text(strip=True)
            else:
                # Fallback to index if no page number found (sheet_1, sheet_2...)
                page_suffix = f"sheet_{index + 1}"

            # 2. Extract Data
            json_data = extract_sheet_data(sheet)

            # 3. Save JSON (only if handwritten items were found)
            if json_data:
                output_filename = f"{base_name}_page_{page_suffix}.json"
                output_path = os.path.join(OUTPUT_FOLDER, output_filename)

                with open(output_path, 'w', encoding='utf-8') as out_f:
                    json.dump(json_data, out_f, ensure_ascii=False, indent=2)
                
                # print(f"      ✅ Saved: {output_filename}")

    print("\n🎉 All done! Check the 'json_output' folder.")

if __name__ == "__main__":
    main()