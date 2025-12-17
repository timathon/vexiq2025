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

    // Add link for ch00
    const ch00Link = document.createElement('a');
    ch00Link.href = 'index.html';
    ch00Link.textContent = 'Introduction';
    linksContainer.appendChild(ch00Link);

        const chapterPageCounts = {
        "ch01": 22,
        "ch02": 25,
        "ch03": 10,
        "ch04": 7,
        "ch05": 9,
        "ch06": 8,
        "ch07": 9,
        "ch08": 6
    };

    for (let i = 1; i <= 8; i++) {
        const link = document.createElement('a');
        const chapter = 'ch' + ('0' + i).slice(-2);
        link.href = chapter + '.html';
        // Example: Display chapter and its page count. Modify as needed.
        link.textContent = 'Chapter ' + i + ' (' + chapterPageCounts[chapter] + ' pages)';
        linksContainer.appendChild(link);
    }

    document.body.appendChild(menu);
});
