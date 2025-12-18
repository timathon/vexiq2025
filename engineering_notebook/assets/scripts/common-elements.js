document.addEventListener('DOMContentLoaded', function() {
    const sheets = document.querySelectorAll('.sheet');

    const pageDates = {
        // index.html
        1: '2025年6月8日', 2: '2025年6月8日', 3: '2025年6月8日', 4: '2025年6月8日',
        // ch01.html
        5: '2025年6月8日', 6: '2025年6月8日', 7: '2025年6月8日', 8: '2025年6月8日', 9: '2025年6月8日', 10: '2025年6月8日', 11: '2025年11月8日', 12: '2025年6月8日', 13: '2025年6月8日', 14: '2025年6月8日', 15: '2025年6月15日', 16: '2025年6月15日', 17: '2025年6月15日', 18: '2025年6月15日', 19: '2025年6月15日', 20: '2025年6月15日', 21: '2025年6月8日', 22: '2025年6月15日', 23: '2025年6月25日', 24: '2025年7月10日', 25: '2025年7月14日', 26: '2025年8月07日', 27: '2025年9月11日', 28: '2025年10月15日', 29: '2025年10月25日', 30: '2025年11月8日', 31: '2025年11月9日',
        // ch02.html
        32: '2025年6月25日', 33: '2025年6月25日', 34: '2025年6月25日', 35: '2025年6月25日', 36: '2025年6月25日', 37: '2025年6月25日', 38: '2025年6月25日', 39: '2025年6月25日', 40: '2025年6月25日', 41: '2025年6月25日', 42: '2025年6月25日', 43: '2025年6月25日', 44: '2025年6月25日', 45: '2025年6月25日', 46: '2025年6月25日', 47: '2025年6月25日', 48: '2025年6月25日', 49: '2025年6月25日', 50: '2025年6月25日', 51: '2025年6月25日', 52: '2025年6月25日', 53: '2025年6月25日', 54: '2025年6月25日', 55: '2025年6月25日', 56: '2025年6月25日',
        // ch03.html
        57: '2025年6月26日', 58: '2025年6月26日', 59: '2025年6月26日', 60: '2025年6月26日', 61: '2025年6月26日', 62: '2025年6月26日', 63: '2025年6月26日', 64: '2025年6月26日', 65: '2025年6月26日', 66: '2025年6月26日',
        // ch04.html
        67: '2025年6月27日', 68: '2025年6月27日', 69: '2025年6月27日', 70: '2025年6月27日', 71: '2025年6月27日', 72: '2025年6月27日', 73: '2025年6月27日', 74: '2025年6月27日', 75: '2025年6月27日', 76: '2025年6月27日',
        // ch05.html
        77: '2025年6月28日', 78: '2025年6月28日', 79: '2025年6月28日', 80: '2025年6月29日', 81: '2025年6月29日', 82: '2025年6月30日', 83: '2025年6月30日', 84: '2025年7月1日', 85: '2025年7月1日', 86: '2025年7月2日',
        // ch06.html
        87: '2025年6月30日', 88: '2025年6月30日', 89: '2025年7月6日', 90: '2025年7月6日', 91: '2025年7月16日', 92: '2025年7月18日', 93: '2025年7月19日', 94: '2025年7月20日', 95: '2025年7月21日', 96: '2025年8月12日', 97: '2025年8月12日', 98: '2025年8月19日', 99: '2025年8月21日', 100: '2025年8月22日', 101: '2025年8月23日',
        // ch07.html
        102: '2025年10月11日', 103: '2025年10月11日', 104: '2025年10月12日', 105: '2025年10月12日', 106: '2025年10月13日', 107: '2025年10月14日', 108: '2025年10月15日', 109: '2025年10月16日', 110: '2025年10月17日', 111: '2025年10月18日', 112: '2025年10月19日', 113: '2025年10月20日',
        // ch08.html
        114: '2025年10月4日', 115: '2025年10月4日', 116: '2025年10月4日', 117: '2025年10月4日', 118: '2025年10月18日', 119: '2025年10月5日', 120: '2025年10月6日', 121: '2025年10月7日', 122: '2025年10月8日', 123: '2025年10月25日', 124: '2025年10月26日', 125: '2025年10月27日', 126: '2025年11月2日', 127: '2025年11月2日', 128: '2025年11月3日', 129: '2025年11月15日', 130: '2025年11月16日', 131: '2025年11月17日', 132: '2025年11月18日',
        // glossary.html
        133: '2025年11月20日'
    };

    const pageRecorders = {
        // ch01
        ...Object.fromEntries(Array.from({ length: 27 }, (_, i) => [i + 5, "叶恒瑞"])),
        // ch02
        ...Object.fromEntries(Array.from({ length: 25 }, (_, i) => [i + 32, "叶恒嘉"])),
        // ch03
        ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 57, "宋书玥"])),
        // ch04
        ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 67, "叶恒瑞"])),
        // ch05
        ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 77, "叶恒嘉"])),
        // ch06
        ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => [i + 87, "宋书玥"])),
        // ch07
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 102, "叶恒瑞"])),
        // ch08
        ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => [i + 114, "叶恒瑞"])),
        ...Object.fromEntries(Array.from({ length: 4 }, (_, i) => [i + 129, "印涵邸"])),
    };



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
            const pageNumberEl = sheet.querySelector('.page-number');
            const pageNum = pageNumberEl ? parseInt(pageNumberEl.textContent, 10) : 0;
            const date = pageDates[pageNum] || '';
            const recorder = pageRecorders[pageNum] || '';

            // Create footer
            const footer = document.createElement('div');
            footer.classList.add('footer');

            // Create date box
            const dateBox = document.createElement('span');
            // dateBox.innerHTML = '<span class="footer-label">日期：</span><span class="footer-value">' + date + '</span>';
            dateBox.innerHTML = '<span class="footer-value">' + date + '</span>';
            footer.appendChild(dateBox);

            // Create recorder box
            const recorderBox = document.createElement('span');
            recorderBox.innerHTML = '<span class="footer-label">记录人：</span><span class="footer-recorder">' + recorder + '</span>';
            footer.appendChild(recorderBox);
            
            if (pageNumberEl) {
                sheet.insertBefore(footer, pageNumberEl);
            } else {
                sheet.appendChild(footer);
            }
        }
    });
});
