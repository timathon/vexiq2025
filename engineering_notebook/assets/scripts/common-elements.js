document.addEventListener('DOMContentLoaded', function() {
    // Add chapter markers and A4 height indicators to each sheet
    const sheets = document.querySelectorAll('.sheet');
    sheets.forEach(sheet => {
        const chapterMarker = document.createElement('div');
        chapterMarker.classList.add('chapter-marker');
        sheet.prepend(chapterMarker);

        const indicator = document.createElement('div');
        indicator.classList.add('a4-height-indicator');
        sheet.prepend(indicator);
    });

    // Dynamically create footers
    const footers = document.querySelectorAll('.footer');
    footers.forEach(footer => {
        // Clear existing content
        footer.innerHTML = '';

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
    });
});
