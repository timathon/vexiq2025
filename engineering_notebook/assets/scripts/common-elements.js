document.addEventListener('DOMContentLoaded', function() {
    const sheets = document.querySelectorAll('.sheet');

    sheets.forEach((sheet, index) => {
        // Add chapter markers and A4 height indicators to each sheet
        const chapterMarker = document.createElement('div');
        chapterMarker.classList.add('chapter-marker');
        sheet.prepend(chapterMarker);

        const indicator = document.createElement('div');
        indicator.classList.add('a4-height-indicator');
        sheet.prepend(indicator);

        // Check if it's a cover page (heuristic: h1 has a very large font size)
        const h1 = sheet.querySelector('h1');
        const isCoverPage = h1 && (h1.style.fontSize === '56px' || h1.style.fontSize === '48px');

        if (!isCoverPage) {
            // Create footer
            const footer = document.createElement('div');
            footer.classList.add('footer');

            // Create date box
            const dateBox = document.createElement('span');
            dateBox.classList.add('handwriting-box');
            dateBox.textContent = '日期：';
            footer.appendChild(dateBox);

            // Create recorder box
            const recorderBox = document.createElement('span');
            recorderBox.classList.add('handwriting-box');
            recorderBox.textContent = '记录人：';
            footer.appendChild(recorderBox);
            
            const pageNumber = sheet.querySelector('.page-number');
            if (pageNumber) {
                sheet.insertBefore(footer, pageNumber);
            } else {
                sheet.appendChild(footer);
            }
        }
    });
});
