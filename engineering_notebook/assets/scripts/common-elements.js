document.addEventListener('DOMContentLoaded', function() {
    const sheets = document.querySelectorAll('.sheet');
    sheets.forEach(sheet => {
        const indicator = document.createElement('div');
        indicator.classList.add('a4-height-indicator');
        sheet.prepend(indicator);
    });
});
