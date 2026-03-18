document.addEventListener('DOMContentLoaded', function() {
    const sheets = document.querySelectorAll('.sheet');

    const pageDates = {
        // index.html: 1-5
        1: '2025年6月8日', 2: '2025年6月8日', 3: '2025年6月8日', 4: '2025年6月8日', 5: '2025年6月8日',
        // ch01.html: 6-32
        6: '2025年6月8日', 7: '2025年6月8日', 8: '2025年6月8日', 9: '2025年6月8日', 10: '2025年6月8日', 11: '2025年6月8日', 12: '2025年11月8日', 13: '2025年6月8日', 14: '2025年6月8日', 15: '2025年6月8日', 16: '2025年6月15日', 17: '2025年6月15日', 18: '2025年6月15日', 19: '2025年6月15日', 20: '2025年6月15日', 21: '2025年6月15日', 22: '2025年6月8日', 23: '2025年6月15日', 24: '2025年6月25日', 25: '2025年7月10日', 26: '2025年7月14日', 27: '2025年8月07日', 28: '2025年9月11日', 29: '2025年10月15日', 30: '2025年10月25日', 31: '2025年11月8日', 32: '2025年11月9日',
        // ch02.html: 33-56
        33: '2025年6月25日', 34: '2025年6月25日', 35: '2025年6月25日', 36: '2025年6月25日', 37: '2025年6月25日', 38: '2025年6月25日', 39: '2025年6月25日', 40: '2025年6月25日', 41: '2025年6月25日', 42: '2025年6月25日', 43: '2025年6月25日', 44: '2025年6月25日', 45: '2025年6月25日', 46: '2025年6月25日', 47: '2025年6月25日', 48: '2025年6月25日', 49: '2025年6月25日', 50: '2025年6月25日', 51: '2025年6月25日', 52: '2025年6月25日', 53: '2025年6月25日', 54: '2025年6月25日', 55: '2025年6月25日', 56: '2025年6月25日',
        // ch03.html: 57-67
        57: '2025年6月26日', 58: '2025年6月26日', 59: '2025年6月26日', 60: '2025年6月26日', 61: '2025年6月26日', 62: '2025年6月26日', 63: '2025年6月26日', 64: '2025年6月26日', 65: '2025年6月26日', 66: '2025年6月26日', 67: '2025年6月26日',
        // ch04.html: 68-77
        68: '2025年6月27日', 69: '2025年6月27日', 70: '2025年6月27日', 71: '2025年6月27日', 72: '2025年6月27日', 73: '2025年6月27日', 74: '2025年6月27日', 75: '2025年6月27日', 76: '2025年6月27日', 77: '2025年6月27日',
        // ch05.html: 78-89
        78: '2025年6月28日', 79: '2025年6月28日', 80: '2025年6月28日', 81: '2025年6月29日', 82: '2025年6月29日', 83: '2025年6月30日', 84: '2025年6月30日', 85: '2025年7月1日', 86: '2025年7月1日', 87: '2025年7月2日', 88: '2025年7月2日', 89: '2025年7月2日',
        // ch06.html: 90-104
        90: '2025年6月30日', 91: '2025年6月30日', 92: '2025年7月6日', 93: '2025年7月6日', 94: '2025年7月16日', 95: '2025年7月18日', 96: '2025年7月19日', 97: '2025年7月20日', 98: '2025年7月21日', 99: '2025年7月21日', 100: '2025年7月21日', 101: '2025年7月22日', 102: '2025年8月12日', 103: '2025年8月12日', 104: '2025年8月22日',
        // ch07.html: 105-127
        105: '2025年8月22日', 106: '2025年8月22日', 107: '2025年8月23日', 108: '2025年9月1日', 109: '2025年9月8日', 110: '2025年9月12日', 111: '2025年9月14日', 112: '2025年9月14日', 113: '2025年9月14日', 114: '2025年9月16日', 115: '2025年9月18日', 116: '2025年9月20日', 117: '2025年9月22日', 118: '2025年9月25日', 119: '2025年9月28日', 120: '2025年9月30日', 121: '2025年10月3日', 122: '2025年10月4日', 123: '2025年10月8日', 124: '2025年10月8日', 125: '2025年10月8日', 126: '2025年10月9日', 127: '2025年10月9日',
        // ch08.html: 128-158
        128: '2025年10月10日', 129: '2025年10月10日', 130: '2025年10月12日', 131: '2025年10月16日', 132: '2025年10月18日', 133: '2025年10月19日', 134: '2025年10月20日', 135: '2025年10月26日', 136: '2025年10月27日', 137: '2025年11月3日', 138: '2025年11月3日', 139: '2025年11月3日', 140: '2025年11月16日', 141: '2025年11月16日', 142: '2025年11月16日', 143: '2025年12月22日', 144: '2025年12月22日', 145: '2025年12月22日', 146: '2025年12月22日', 147: '2025年12月22日', 148: '2025年12月22日', 149: '2025年12月22日', 150: '2025年12月22日', 151: '2025年12月22日', 152: '2025年12月22日', 153: '2025年12月22日', 154: '2025年12月22日', 155: '2025年12月22日', 156: '2025年12月25日', 157: '2026年1月12日', 158: '2026年1月13日',
        // ch09.html: 159-171
        159: '2026年1月15日', 160: '2026年1月16日', 161: '2026年1月17日', 162: '2026年1月18日', 163: '2026年1月19日', 164: '2026年1月20日', 165: '2026年1月21日', 166: '2026年1月22日', 167: '2026年1月23日', 168: '2026年1月24日', 169: '2026年1月25日', 170: '2026年1月26日', 171: '2026年2月5日',
        // chzz.html: 172-177
        172: '2026年2月10日', 173: '2026年2月10日', 174: '2026年2月10日', 175: '2026年2月10日', 176: '2026年2月10日', 177: '2026年2月10日'
    };

    const englishPageDates = {
        // ch08.html: 157-158
        157: 'Jan 12, 2026', 158: 'Jan 13, 2026',
        // ch09.html: 159-171
        159: 'Jan 15, 2026', 160: 'Jan 16, 2026', 161: 'Jan 17, 2026', 162: 'Jan 18, 2026', 163: 'Jan 19, 2026', 164: 'Jan 20, 2026', 165: 'Jan 21, 2026', 166: 'Jan 22, 2026', 167: 'Jan 23, 2026', 168: 'Jan 24, 2026', 169: 'Jan 25, 2026', 170: 'Jan 26, 2026', 171: 'Feb 5, 2026',
        // chzz.html: 172-177
        172: 'Feb 10, 2026', 173: 'Feb 10, 2026', 174: 'Feb 10, 2026', 175: 'Feb 10, 2026', 176: 'Feb 10, 2026', 177: 'Feb 10, 2026'
    };

    const pageRecorders = {
        // ch01: 6-32
        ...Object.fromEntries(Array.from({ length: 27 }, (_, i) => [i + 6, "叶恒瑞"])),
        // ch02: 33-56
        ...Object.fromEntries(Array.from({ length: 24 }, (_, i) => [i + 33, "叶恒嘉"])),
        // ch03: 57-67
        ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i + 57, "宋书玥"])),
        // ch04: 68-77
        ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 68, "叶恒瑞"])),
        // ch05: 78-89
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 78, "叶恒嘉"])),
        // ch06: 90-104
        ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => [i + 90, "宋书玥"])),
        // ch07: 105-127
        ...Object.fromEntries(Array.from({ length: 23 }, (_, i) => [i + 105, "叶恒瑞"])),
        // ch08: 128-147
        ...Object.fromEntries(Array.from({ length: 20 }, (_, i) => [i + 128, "印涵邸"])),
        // ch08: 148-158
        ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i + 148, "宋书玥"])),
        // ch09: 159-171
        ...Object.fromEntries(Array.from({ length: 13 }, (_, i) => [i + 159, "印涵邸"])),
        // chzz: 172-177
        ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 172, "印涵邸"])),
    };



    sheets.forEach((sheet, index) => {
        // Add chapter markers and A4 height indicators to each sheet
        const chapterMarker = document.createElement('div');
        chapterMarker.classList.add('chapter-marker');
        sheet.prepend(chapterMarker);

        const indicator = document.createElement('div');
        indicator.classList.add('a4-height-indicator');
        sheet.prepend(indicator);

        // Check if it's a cover page or explicitly marked to have no footer
        const h1 = sheet.querySelector('h1');
        const isCoverPage = sheet.classList.contains('cover-page') || 
                            sheet.classList.contains('no-footer') ||
                            (h1 && (h1.style.fontSize === '56px' || h1.style.fontSize === '48px'));

        if (!isCoverPage) {
            const pageNumberEl = sheet.querySelector('.page-number');
            const pageNum = pageNumberEl ? parseInt(pageNumberEl.textContent, 10) : 0;
            
            const isEnglish = window.location.pathname.includes('/english_handwritten/');
            let date = pageDates[pageNum] || '';
            if (isEnglish && englishPageDates[pageNum]) {
                date = englishPageDates[pageNum];
            }
            
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
            const h1Text = h1 ? h1.textContent : '';
            const isAwardsPage = h1Text.startsWith('Awards') || h1Text.startsWith('曾获奖项');
            
            const recorderLabel = isEnglish ? 'Recorder: ' : '记录人：';
            recorderBox.innerHTML = '<span class="footer-label">' + recorderLabel + '</span><span class="footer-recorder">' + recorder + '</span>';
            
            if (isAwardsPage) {
                recorderBox.style.visibility = 'hidden';
            }
            
            footer.appendChild(recorderBox);
            
            if (pageNumberEl) {
                sheet.insertBefore(footer, pageNumberEl);
            } else {
                sheet.appendChild(footer);
            }
        }
    });
});
