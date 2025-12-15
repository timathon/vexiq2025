import pdfplumber

# Open the specific file
file_path = "test22.pdf"

print(f"{'Text':<20} | {'X (Left)':<10} | {'Y (Top)':<10}")
print("-" * 50)

with pdfplumber.open(file_path) as pdf:
    # Iterate through all pages (likely just 1 page based on your file)
    for page in pdf.pages:
        # Extract words with their detailed position info
        words = page.extract_words()
        
        for word in words:
            text = word['text']
            # x0 is the distance from the left of the page
            x = word['x0'] 
            # top is the distance from the top of the page
            y = word['top']
            
            # Print in the format you requested
            print(f"text: {text}, x: {x:.2f}, y: {y:.2f}")