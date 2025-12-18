import os
import sys

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("BeautifulSoup4 is not installed. Please install it using 'pip install beautifulsoup4'", file=sys.stderr)
    sys.exit(1)

def split_html_files():
    """
    Splits HTML files from the intact-pages directory into multiple files,
    each containing a single '.sheet' div. The split files are saved in
    the split-pages directory.
    """
    # Get the absolute path of the script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    input_dir = os.path.join(project_root, 'tools', 'artifects', 'intact-pages')
    output_dir = os.path.join(project_root, 'tools', 'artifects', 'split-pages')

    # Ensure input directory exists
    if not os.path.isdir(input_dir):
        print(f"Input directory not found: {input_dir}", file=sys.stderr)
        sys.exit(1)
        
    # Ensure output directory exists, create if not
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Process each HTML file in the input directory
    for filename in os.listdir(input_dir):
        if not filename.endswith('.html'):
            continue

        input_filepath = os.path.join(input_dir, filename)
        
        print(f"Processing {input_filepath}...")

        with open(input_filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        soup = BeautifulSoup(content, 'html.parser')
        
        # Find all sheet divs
        sheets = soup.find_all('div', class_='sheet')
        
        if not sheets:
            print(f"No '.sheet' divs found in {filename}. Skipping.")
            continue

        base_filename = os.path.splitext(filename)[0]

        # Generate a new file for each sheet
        for i, _ in enumerate(sheets):
            # We re-parse the original content for each split to have a clean slate
            page_soup = BeautifulSoup(content, 'html.parser')
            
            # Find all sheets in the new soup object
            all_sheets_in_page = page_soup.find_all('div', class_='sheet')
            
            # Decompose (remove) all sheets except the one we want to keep for this file
            for j, sheet_element in enumerate(all_sheets_in_page):
                if i != j:
                    sheet_element.decompose()

            # Construct output filename, e.g., 'my-file-part-1.html'
            output_filename = f"{base_filename}-part-{i+1}.html"
            output_filepath = os.path.join(output_dir, output_filename)

            with open(output_filepath, 'w', encoding='utf-8') as f_out:
                f_out.write(str(page_soup.prettify()))
            
            print(f"  -> Saved sheet {i+1} to {output_filepath}")

if __name__ == '__main__':
    split_html_files()
    print("\nHTML splitting process completed.")
