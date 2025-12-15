document.addEventListener('DOMContentLoaded', function() {
    const darkTextBtn = document.createElement('button');
    darkTextBtn.id = 'toggle-dark-text-btn';
    darkTextBtn.onclick = toggleDarkText;
    darkTextBtn.textContent = '📝 深色文字：显示';
    
    const otherElementsBtn = document.createElement('button');
    otherElementsBtn.id = 'toggle-other-elements-btn';
    otherElementsBtn.onclick = toggleOtherElements;
    otherElementsBtn.textContent = '🎨 装饰元素：显示';

    document.body.prepend(otherElementsBtn);
    document.body.prepend(darkTextBtn);
});

let darkTextVisible = true;
let otherElementsVisible = true;

function toggleDarkText() {
    darkTextVisible = !darkTextVisible;
    const btn = document.getElementById('toggle-dark-text-btn');

    if (darkTextVisible) {
        document.body.classList.remove('hide-dark-text');
        btn.textContent = '📝 深色文字：显示';
        btn.style.backgroundColor = 'var(--secondary-color)';
    } else {
        document.body.classList.add('hide-dark-text');
        btn.textContent = '📝 深色文字：隐藏';
        btn.style.backgroundColor = '#95A5A6';
    }
}

function toggleOtherElements() {
    otherElementsVisible = !otherElementsVisible;
    const btn = document.getElementById('toggle-other-elements-btn');

    if (otherElementsVisible) {
        document.body.classList.remove('hide-other-elements');
        btn.textContent = '🎨 装饰元素：显示';
        btn.style.backgroundColor = '#2E86C1';
    } else {
        document.body.classList.add('hide-other-elements');
        btn.textContent = '🎨 装饰元素：隐藏';
        btn.style.backgroundColor = '#95A5A6';
    }
}