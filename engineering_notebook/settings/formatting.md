# Formatting Changes Record

This document records significant formatting changes applied to the engineering notebook HTML files.

## 1. Font Change in `ch02.html`
- **Description:** Changed the primary font for Chinese text from a handwriting-like font (`ZCOOL KuaiLe`, cursive) to a standard, more readable sans-serif font.
- **File(s) Affected:** `engineering_notebook/ch02.html`
- **Details:**
    - Removed Google Fonts import for `ZCOOL KuaiLe`.
    - Updated `body`'s `font-family` from `'ZCOOL KuaiLe', cursive` to `'Noto Sans SC', sans-serif`.
    - Ensured `Noto Sans SC` is imported via Google Fonts.

## 2. Footer Positioning in `ch02.html`
- **Description:** Modified the footer positioning within each `.sheet` to ensure it remains consistently at the bottom.
- **File(s) Affected:** `engineering_notebook/ch02.html`
- **Details:**
    - Updated `.footer` CSS rule to include `position: absolute; bottom: 20mm; left: 25mm; right: 20mm;`.
    - This change places the footer absolutely relative to its parent `.sheet` element, which has `position: relative`.

## 3. Math Paper Background in `ch02.html`
- **Description:** Commented out the `background-image` for the `.math-paper` class to remove the grid background.
- **File(s) Affected:** `engineering_notebook/ch02.html`
- **Details:**
    - Changed `background-image: linear-gradient(#cfcfcf 1px, transparent 1px), linear-gradient(90deg, #cfcfcf 1px, transparent 1px);` to `/* background-image: linear-gradient(#cfcfcf 1px, transparent 1px), linear-gradient(90deg, #cfcfcf 1px, transparent 1px); */`.

## 4. Math Paper Padding in `ch02.html`
- **Description:** Changed the padding of the `.math-paper` class to `0 20px`.
- **File(s) Affected:** `engineering_notebook/ch02.html`
- **Details:**
    - Updated `.math-paper` CSS rule `padding` from `20px` to `0 20px`.

## 5. Centralized Stylesheet
- **Description:** Extracted all CSS rules from `ch02.html` into a single, centralized stylesheet to be used by all notebook chapters.
- **File(s) Affected:** 
    - `engineering_notebook/ch02.html` (and eventually all other chapters)
    - `engineering_notebook/settings/style.css` (new file)
- **Details:**
    - Created `engineering_notebook/settings/style.css` and moved all styles from `ch02.html` into it.
    - Replaced the `<style>` block in `ch02.html` with a `<link rel="stylesheet" href="settings/style.css">`.
    - This allows for consistent styling across all pages and easier maintenance.

## 6. A4 Height Indicator
- **Description:** Added a visual indicator to help debug page height for printing.
- **File(s) Affected:** `engineering_notebook/ch02.html`, `engineering_notebook/ch03.html`
- **Details:**
    - Added `<div class="a4-height-indicator"></div>` as the first child of every `.sheet` element.
    - The style for this class is defined in `settings/style.css`. It draws a dashed red line at the 297mm mark, which is the bottom of an A4 page.
    - This should be applied to all new chapters to ensure content fits within the printable area.

## 7. Footer Structure
- **Description:** Standardized the HTML structure for the page footer.
- **File(s) Affected:** `engineering_notebook/ch03.html` (and all future chapters)
- **Details:**
    - The footer should consist of two main elements placed at the end of a `.sheet` div: the footer content and the page number.
    - **Footer Content:**
        ```html
        <div class="footer">
            <span class="handwriting-box">日期：</span>
            <span class="handwriting-box">记录人：</span>
        </div>
        ```
        This provides standardized fields for the date and recorder, with spacing provided by the `.handwriting-box` class.
    - **Page Number:**
        ```html
        <div class="page-number">XX</div>
        ```
        This element should be placed immediately after the `.footer` div and should contain the correct page number. Its styling is handled by the centralized stylesheet.