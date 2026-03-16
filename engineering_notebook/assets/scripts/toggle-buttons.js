document.addEventListener('DOMContentLoaded', function() {
    const darkTextBtn = document.createElement('button');
    darkTextBtn.id = 'toggle-dark-text-btn';
    darkTextBtn.onclick = toggleDarkText;
    darkTextBtn.textContent = '📝 深色文字：显示';
    
    const otherElementsBtn = document.createElement('button');
    otherElementsBtn.id = 'toggle-other-elements-btn';
    otherElementsBtn.onclick = toggleOtherElements;
    otherElementsBtn.textContent = '🎨 装饰元素：显示';

    const backgroundPaperPrintBtn = document.createElement('button');
    backgroundPaperPrintBtn.id = 'toggle-background-paper-print-btn';
    backgroundPaperPrintBtn.classList.add('toggle-background-paper-print-btn');
    backgroundPaperPrintBtn.onclick = toggleBackgroundPaperPrint;
    backgroundPaperPrintBtn.textContent = '📄 打印背景：隐藏';

    document.body.prepend(backgroundPaperPrintBtn);
    document.body.prepend(otherElementsBtn);
    document.body.prepend(darkTextBtn);
});

let darkTextVisible = true;
let otherElementsVisible = true;
let backgroundPaperPrintVisible = false;

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

function toggleBackgroundPaperPrint() {
    backgroundPaperPrintVisible = !backgroundPaperPrintVisible;
    const btn = document.getElementById('toggle-background-paper-print-btn');

    if (backgroundPaperPrintVisible) {
        document.body.classList.add('print-background');
        btn.textContent = '📄 打印背景：显示';
        btn.style.backgroundColor = '#27AE60';
    } else {
        document.body.classList.remove('print-background');
        btn.textContent = '📄 打印背景：隐藏';
        btn.style.backgroundColor = '#95A5A6';
    }
}