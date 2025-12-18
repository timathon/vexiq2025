document.addEventListener('DOMContentLoaded', function() {
    const menu = document.createElement('div');
    menu.id = 'navigation-menu';
    menu.classList.add('navigation-menu');

    const menuButton = document.createElement('div');
    menuButton.id = 'navigation-menu-button';
    menuButton.classList.add('navigation-menu-button');
    menuButton.textContent = '☰';
    menu.appendChild(menuButton);

    const linksContainer = document.createElement('div');
    linksContainer.id = 'navigation-links';
    linksContainer.classList.add('navigation-links');
    menu.appendChild(linksContainer);

                                                                                    const chapterPageCounts = {
        "index": 4,
        "glossary": 0,
        "ch01": 27,
        "ch02": 25,
        "ch03": 10,
        "ch04": 10,
        "ch05": 11,
        "ch06": 15,
        "ch07": 13,
        "ch08": 28,
        "chzz": 4
    };

    const chapterColors = {
        "index": "#F79A19",
        "ch01": "#005f9e",
        "ch02": "#D35400",
        "ch03": "#27AE60",
        "ch04": "#8E44AD",
        "ch05": "#E74C3C",
        "ch06": "#00ACC1",
        "ch07": "#450693", // Updated color
        "ch08": "#008080",
        "chzz": "#F79A19",
    };

    // Add link for Introduction
    const introLink = document.createElement('a');
    introLink.href = 'index.html';
    introLink.textContent = 'Introduction (' + chapterPageCounts['index'] + ' pages)';
    introLink.style.backgroundColor = chapterColors['index'];
    introLink.style.color = 'white';
    linksContainer.appendChild(introLink);


    for (let i = 1; i <= 8; i++) {
        const link = document.createElement('a');
        const chapter = 'ch' + ('0' + i).slice(-2);
        link.href = chapter + '.html';
        // Example: Display chapter and its page count. Modify as needed.
        link.textContent = 'Chapter ' + i + ' (' + chapterPageCounts[chapter] + ' pages)';
        link.style.backgroundColor = chapterColors[chapter];
        link.style.color = 'white';
        linksContainer.appendChild(link);
    }

    // Add link for chzz
    const chzzLink = document.createElement('a');
    chzzLink.href = 'chzz.html';
    chzzLink.textContent = 'Chapter ZZ (' + chapterPageCounts['chzz'] + ' pages)';
    chzzLink.style.backgroundColor = chapterColors['chzz'];
    chzzLink.style.color = 'white';
    linksContainer.appendChild(chzzLink);

    document.body.appendChild(menu);

    // Dynamically generate page numbers
    const path = window.location.pathname;
    const currentPage = path.split("/").pop();
    const currentChapterMatch = currentPage.match(/ch(\d+)\.html/);

    if (currentChapterMatch) {
        const chapterNumber = parseInt(currentChapterMatch[1], 10);
        let startPage = 1;

        // Add pages from index.html
        startPage += chapterPageCounts['index'] || 0;

        for (let i = 1; i < chapterNumber; i++) {
            const chapterKey = 'ch' + ('0' + i).slice(-2);
            startPage += chapterPageCounts[chapterKey] || 0;
        }

        const sheets = document.querySelectorAll('.sheet');
        sheets.forEach((sheet, index) => {
            const pageNumberDiv = document.createElement('div');
            pageNumberDiv.classList.add('page-number');
            pageNumberDiv.textContent = startPage + index;
            sheet.appendChild(pageNumberDiv);
        });
    } else if (currentPage === 'chzz.html') {
        // Handle page numbering for chzz
        let startPage = 1;

        // Add pages from index.html
        startPage += chapterPageCounts['index'] || 0;

        // Add pages from chapters 1-8
        for (let i = 1; i <= 8; i++) {
            const chapterKey = 'ch' + ('0' + i).slice(-2);
            startPage += chapterPageCounts[chapterKey] || 0;
        }

        const sheets = document.querySelectorAll('.sheet');
        sheets.forEach((sheet, index) => {
            const pageNumberDiv = document.createElement('div');
            pageNumberDiv.classList.add('page-number');
            pageNumberDiv.textContent = startPage + index;
            sheet.appendChild(pageNumberDiv);
        });
    }
});