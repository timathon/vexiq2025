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
        "index": 5,
        "glossary": 0,
        "ch01": 27,
        "ch02": 24,
        "ch03": 11,
        "ch04": 10,
        "ch05": 12,
        "ch06": 15,
        "ch07": 23,
        "ch08": 30,
        "ch09": 12,
        "chzz": 6
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
        "ch09": "#34495E",
        "chzz": "#F79A19",
    };

    // Calculate page ranges
    let currentPageStart = 1;

    // Add link for Introduction
    const introLink = document.createElement('a');
    introLink.href = 'index.html';
    const introStartPage = currentPageStart;
    const introEndPage = currentPageStart + (chapterPageCounts['index'] - 1);
    introLink.textContent = 'Introduction (' + introStartPage + '-' + introEndPage + ', ' + chapterPageCounts['index'] + ' pages)';
    introLink.style.backgroundColor = chapterColors['index'];
    introLink.style.color = 'white';
    linksContainer.appendChild(introLink);

    // Update current page start for next chapter
    currentPageStart = introEndPage + 1;

    // Define Chinese chapter titles to match index.html
    const chapterTitles = {
        "ch01": "第一章：梦开始的地方",
        "ch02": "第二章：2025-2026 规则分析",
        "ch03": "第三章：STEM 理念与设计概论",
        "ch04": "第四章：概念设计与方案研讨",
        "ch05": "第五章：物理搭建与软件配置",
        "ch06": "第六章：一代车实战验证与竞赛季",
        "ch07": "第七章：二代车 (Gen 2) 的进化之路",
        "ch08": "第八章：三代车 (Gen 3) 的研发与实战",
        "ch09": "第九章：四代车编程升级"
    };

    for (let i = 1; i <= 9; i++) {
        const link = document.createElement('a');
        const chapter = 'ch' + ('0' + i).slice(-2);

        const chapterStartPage = currentPageStart;
        const chapterEndPage = currentPageStart + (chapterPageCounts[chapter] - 1);

        link.href = chapter + '.html';
        // Use Chinese chapter title instead of generic 'Chapter X'
        link.textContent = chapterTitles[chapter] + ' (' + chapterStartPage + '-' + chapterEndPage + ', ' + chapterPageCounts[chapter] + ' pages)';
        link.style.backgroundColor = chapterColors[chapter];
        link.style.color = 'white';
        linksContainer.appendChild(link);

        // Update current page start for next chapter
        currentPageStart = chapterEndPage + 1;
    }

    // Add link for chzz
    const chzzLink = document.createElement('a');
    chzzLink.href = 'chzz.html';
    const chzzStartPage = currentPageStart;
    const chzzEndPage = currentPageStart + (chapterPageCounts['chzz'] - 1);
    chzzLink.textContent = '附录：感悟与成长及获奖记录 (' + chzzStartPage + '-' + chzzEndPage + ', ' + chapterPageCounts['chzz'] + ' pages)';
    chzzLink.style.backgroundColor = chapterColors['chzz'];
    chzzLink.style.color = 'white';
    linksContainer.appendChild(chzzLink);

    document.body.appendChild(menu);

    // Dynamically generate page numbers
    const path = window.location.pathname;
    const currentPage = path.split("/").pop();
    const currentChapterMatch = currentPage.match(/ch(\d+)\.html/);

    // Recalculate page ranges for consistency with navigation menu
    let calculatedPageStart = 1;

    if (currentChapterMatch) {
        const chapterNumber = parseInt(currentChapterMatch[1], 10);

        // Calculate the start page for the current chapter
        calculatedPageStart = 1;

        // Add pages from index.html
        calculatedPageStart += chapterPageCounts['index'] || 0;

        for (let i = 1; i < chapterNumber; i++) {
            const chapterKey = 'ch' + ('0' + i).slice(-2);
            calculatedPageStart += chapterPageCounts[chapterKey] || 0;
        }

        const sheets = document.querySelectorAll('.sheet');
        sheets.forEach((sheet, index) => {
            const pageNumberDiv = document.createElement('div');
            pageNumberDiv.classList.add('page-number');
            pageNumberDiv.textContent = calculatedPageStart + index;
            sheet.appendChild(pageNumberDiv);
        });
    } else if (currentPage === 'chzz.html') {
        // Handle page numbering for chzz
        calculatedPageStart = 1;

        // Add pages from index.html
        calculatedPageStart += chapterPageCounts['index'] || 0;

        // Add pages from chapters 1-9
        for (let i = 1; i <= 9; i++) {
            const chapterKey = 'ch' + ('0' + i).slice(-2);
            calculatedPageStart += chapterPageCounts[chapterKey] || 0;
        }

        const sheets = document.querySelectorAll('.sheet');
        sheets.forEach((sheet, index) => {
            const pageNumberDiv = document.createElement('div');
            pageNumberDiv.classList.add('page-number');
            pageNumberDiv.textContent = calculatedPageStart + index;
            sheet.appendChild(pageNumberDiv);
        });
    } else if (currentPage === 'index.html') {
        // Handle page numbering for index.html
        calculatedPageStart = 1;

        const sheets = document.querySelectorAll('.sheet');
        sheets.forEach((sheet, index) => {
            const pageNumberDiv = document.createElement('div');
            pageNumberDiv.classList.add('page-number');
            pageNumberDiv.textContent = calculatedPageStart + index;
            sheet.appendChild(pageNumberDiv);
        });
    }
});