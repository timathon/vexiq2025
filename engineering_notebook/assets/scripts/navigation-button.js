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

    for (let i = 1; i <= 8; i++) {
        const link = document.createElement('a');
        const chapter = 'ch' + ('0' + i).slice(-2);
        link.href = chapter + '.html';
        link.textContent = 'Chapter ' + i;
        linksContainer.appendChild(link);
    }

    document.body.appendChild(menu);
});
