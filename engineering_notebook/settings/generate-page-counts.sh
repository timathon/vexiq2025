#!/bin/bash

# This script updates the page counts in the navigation menu.

# Get project root, assuming the script is in `settings/`
cd "$(dirname "$0")/.." || exit

NAV_SCRIPT="assets/scripts/navigation-button.js"

# Generate the new chapterPageCounts object content
JSON_CONTENT="    const chapterPageCounts = {\n"
CHAPTER_FILES=$(find . -maxdepth 1 -name 'ch[0-9][0-9].html' | sort)
NUM_CHAPTERS=$(echo "$CHAPTER_FILES" | wc -l)
CURRENT_CHAPTER=0

for FILE in $CHAPTER_FILES; do
    CURRENT_CHAPTER=$((CURRENT_CHAPTER + 1))
    CHAPTER_ID=$(basename "$FILE" .html)
    COUNT=$(grep -o 'class="[^"]*sheet' "$FILE" | wc -l)
    
    JSON_CONTENT+="        \"$CHAPTER_ID\": $COUNT"
    if [ "$CURRENT_CHAPTER" -lt "$NUM_CHAPTERS" ]; then
        JSON_CONTENT+=',\n'
    else
        JSON_CONTENT+="\n"
    fi
done
JSON_CONTENT+="    };"

# Use perl to replace the block in the JS file.
# The -0777 flag reads the whole file as a single string.
# The s/pattern/replacement/s makes '.' match newlines.
perl -i -0777 -pe "s/const chapterPageCounts = \{.*?\};/${JSON_CONTENT}/s" "$NAV_SCRIPT"

echo "Updated page counts in $NAV_SCRIPT"
