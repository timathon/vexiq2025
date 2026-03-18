document.addEventListener('DOMContentLoaded', function() {
    const sheets = document.querySelectorAll('.sheet');

    const pageDates = {
        // index.html: 1-7
        1: '2025年6月8日', 2: '2025年6月8日', 3: '2025年6月8日', 4: '2025年6月8日', 5: '2025年6月8日', 6: '2025年6月8日', 7: '2025年6月8日',
        // ch01.html: 8-34
        8: '2025年6月8日', 9: '2025年6月8日', 10: '2025年6月8日', 11: '2025年6月8日', 12: '2025年6月8日', 13: '2025年6月8日', 14: '2025年11月8日', 15: '2025年6月8日', 16: '2025年6月8日', 17: '2025年6月8日', 18: '2025年6月15日', 19: '2025年6月15日', 20: '2025年6月15日', 21: '2025年6月15日', 22: '2025年6月15日', 23: '2025年6月15日', 24: '2025年6月8日', 25: '2025年6月15日', 26: '2025年6月25日', 27: '2025年7月10日', 28: '2025年7月14日', 29: '2025年8月07日', 30: '2025年9月11日', 31: '2025年10月15日', 32: '2025年10月25日', 33: '2025年11月8日', 34: '2025年11月9日',
        // ch02.html: 35-58
        35: '2025年6月25日', 36: '2025年6月25日', 37: '2025年6月25日', 38: '2025年6月25日', 39: '2025年6月25日', 40: '2025年6月25日', 41: '2025年6月25日', 42: '2025年6月25日', 43: '2025年6月25日', 44: '2025年6月25日', 45: '2025年6月25日', 46: '2025年6月25日', 47: '2025年6月25日', 48: '2025年6月25日', 49: '2025年6月25日', 50: '2025年6月25日', 51: '2025年6月25日', 52: '2025年6月25日', 53: '2025年6月25日', 54: '2025年6月25日', 55: '2025年6月25日', 56: '2025年6月25日', 57: '2025年6月25日', 58: '2025年6月25日',
        // ch03.html: 59-69
        59: '2025年6月26日', 60: '2025年6月26日', 61: '2025年6月26日', 62: '2025年6月26日', 63: '2025年6月26日', 64: '2025年6月26日', 65: '2025年6月26日', 66: '2025年6月26日', 67: '2025年6月26日', 68: '2025年6月26日', 69: '2025年6月26日',
        // ch04.html: 70-79
        70: '2025年6月27日', 71: '2025年6月27日', 72: '2025年6月27日', 73: '2025年6月27日', 74: '2025年6月27日', 75: '2025年6月27日', 76: '2025年6月27日', 77: '2025年6月27日', 78: '2025年6月27日', 79: '2025年6月27日',
        // ch05.html: 80-91
        80: '2025年6月28日', 81: '2025年6月28日', 82: '2025年6月28日', 83: '2025年6月29日', 84: '2025年6月29日', 85: '2025年6月30日', 86: '2025年6月30日', 87: '2025年7月1日', 88: '2025年7月1日', 89: '2025年7月2日', 90: '2025年7月2日', 91: '2025年7月2日',
        // ch06.html: 92-106
        92: '2025年6月30日', 93: '2025年6月30日', 94: '2025年7月6日', 95: '2025年7月6日', 96: '2025年7月16日', 97: '2025年7月18日', 98: '2025年7月19日', 99: '2025年7月20日', 100: '2025年7月21日', 101: '2025年7月21日', 102: '2025年7月21日', 103: '2025年7月22日', 104: '2025年8月12日', 105: '2025年8月12日', 106: '2025年8月22日',
        // ch07.html: 107-129
        107: '2025年8月22日', 108: '2025年8月22日', 109: '2025年8月23日', 110: '2025年9月1日', 111: '2025年9月8日', 112: '2025年9月12日', 113: '2025年9月14日', 114: '2025年9月14日', 115: '2025年9月14日', 116: '2025年9月16日', 117: '2025年9月18日', 118: '2025年9月20日', 119: '2025年9月22日', 120: '2025年9月25日', 121: '2025年9月28日', 122: '2025年9月30日', 123: '2025年10月3日', 124: '2025年10月4日', 125: '2025年10月8日', 126: '2025年10月8日', 127: '2025年10月8日', 128: '2025年10月9日', 129: '2025年10月9日',
        // ch08.html: 130-160
        130: '2025年10月10日', 131: '2025年10月10日', 132: '2025年10月12日', 133: '2025年10月16日', 134: '2025年10月18日', 135: '2025年10月19日', 136: '2025年10月20日', 137: '2025年10月26日', 138: '2025年10月27日', 139: '2025年11月3日', 140: '2025年11月3日', 141: '2025年11月3日', 142: '2025年11月16日', 143: '2025年11月16日', 144: '2025年11月16日', 145: '2025年12月22日', 146: '2025年12月22日', 147: '2025年12月22日', 148: '2025年12月22日', 149: '2025年12月22日', 150: '2025年12月22日', 151: '2025年12月22日', 152: '2025年12月22日', 153: '2025年12月22日', 154: '2025年12月22日', 155: '2025年12月22日', 156: '2025年12月22日', 157: '2025年12月22日', 158: '2025年12月25日', 159: '2026年1月12日', 160: '2026年1月13日',
        // ch09.html: 161-173
        161: '2026年1月15日', 162: '2026年1月16日', 163: '2026年1月17日', 164: '2026年1月18日', 165: '2026年1月19日', 166: '2026年1月20日', 167: '2026年1月21日', 168: '2026年1月22日', 169: '2026年1月23日', 170: '2026年1月24日', 171: '2026年1月25日', 172: '2026年1月26日', 173: '2026年2月5日',
        // chzz.html: 174-179
        174: '2026年2月10日', 175: '2026年2月10日', 176: '2026年2月10日', 177: '2026年2月10日', 178: '2026年2月10日', 179: '2026年2月10日'
    };

    const englishPageDates = {
        1: 'Jun 8, 2025', 2: 'Jun 8, 2025', 3: 'Jun 8, 2025', 4: 'Jun 8, 2025', 5: 'Jun 8, 2025', 6: 'Jun 8, 2025', 7: 'Jun 8, 2025',
        8: 'Jun 8, 2025', 9: 'Jun 8, 2025', 10: 'Jun 8, 2025', 11: 'Jun 8, 2025', 12: 'Jun 8, 2025', 13: 'Jun 8, 2025', 14: 'Nov 8, 2025', 15: 'Jun 8, 2025', 16: 'Jun 8, 2025', 17: 'Jun 8, 2025', 18: 'Jun 15, 2025', 19: 'Jun 15, 2025', 20: 'Jun 15, 2025', 21: 'Jun 15, 2025', 22: 'Jun 15, 2025', 23: 'Jun 15, 2025', 24: 'Jun 8, 2025', 25: 'Jun 15, 2025', 26: 'Jun 25, 2025', 27: 'Jul 10, 2025', 28: 'Jul 14, 2025', 29: 'Aug 07, 2025', 30: 'Sep 11, 2025', 31: 'Oct 15, 2025', 32: 'Oct 25, 2025', 33: 'Nov 8, 2025', 34: 'Nov 9, 2025', 35: 'Jun 25, 2025', 36: 'Jun 25, 2025', 37: 'Jun 25, 2025', 38: 'Jun 25, 2025', 39: 'Jun 25, 2025', 40: 'Jun 25, 2025', 41: 'Jun 25, 2025', 42: 'Jun 25, 2025', 43: 'Jun 25, 2025', 44: 'Jun 25, 2025', 45: 'Jun 25, 2025', 46: 'Jun 25, 2025', 47: 'Jun 25, 2025', 48: 'Jun 25, 2025', 49: 'Jun 25, 2025', 50: 'Jun 25, 2025', 51: 'Jun 25, 2025', 52: 'Jun 25, 2025', 53: 'Jun 25, 2025', 54: 'Jun 25, 2025', 55: 'Jun 25, 2025', 56: 'Jun 25, 2025', 57: 'Jun 25, 2025', 58: 'Jun 25, 2025', 59: 'Jun 26, 2025', 60: 'Jun 26, 2025', 61: 'Jun 26, 2025', 62: 'Jun 26, 2025', 63: 'Jun 26, 2025', 64: 'Jun 26, 2025', 65: 'Jun 26, 2025', 66: 'Jun 26, 2025', 67: 'Jun 26, 2025', 68: 'Jun 26, 2025', 69: 'Jun 26, 2025', 70: 'Jun 27, 2025', 71: 'Jun 27, 2025', 72: 'Jun 27, 2025', 73: 'Jun 27, 2025', 74: 'Jun 27, 2025', 75: 'Jun 27, 2025', 76: 'Jun 27, 2025', 77: 'Jun 27, 2025', 78: 'Jun 27, 2025', 79: 'Jun 27, 2025', 80: 'Jun 28, 2025', 81: 'Jun 28, 2025', 82: 'Jun 28, 2025', 83: 'Jun 29, 2025', 84: 'Jun 29, 2025', 85: 'Jun 30, 2025', 86: 'Jun 30, 2025', 87: 'Jul 1, 2025', 88: 'Jul 1, 2025', 89: 'Jul 2, 2025', 90: 'Jul 2, 2025', 91: 'Jul 2, 2025', 92: 'Jun 30, 2025', 93: 'Jun 30, 2025', 94: 'Jul 6, 2025', 95: 'Jul 6, 2025', 96: 'Jul 16, 2025', 97: 'Jul 18, 2025', 98: 'Jul 19, 2025', 99: 'Jul 20, 2025', 100: 'Jul 21, 2025', 101: 'Jul 21, 2025', 102: 'Jul 21, 2025', 103: 'Jul 22, 2025', 104: 'Aug 12, 2025', 105: 'Aug 12, 2025', 106: 'Aug 22, 2025', 107: 'Aug 22, 2025', 108: 'Aug 22, 2025', 109: 'Aug 23, 2025', 110: 'Sep 1, 2025', 111: 'Sep 8, 2025', 112: 'Sep 12, 2025', 113: 'Sep 14, 2025', 114: 'Sep 14, 2025', 115: 'Sep 14, 2025', 116: 'Sep 16, 2025', 117: 'Sep 18, 2025', 118: 'Sep 20, 2025', 119: 'Sep 22, 2025', 120: 'Sep 25, 2025', 121: 'Sep 28, 2025', 122: 'Sep 30, 2025', 123: 'Oct 3, 2025', 124: 'Oct 4, 2025', 125: 'Oct 8, 2025', 126: 'Oct 8, 2025', 127: 'Oct 8, 2025', 128: 'Oct 9, 2025', 129: 'Oct 9, 2025', 130: 'Oct 10, 2025', 131: 'Oct 10, 2025', 132: 'Oct 12, 2025', 133: 'Oct 16, 2025', 134: 'Oct 18, 2025', 135: 'Oct 19, 2025', 136: 'Oct 20, 2025', 137: 'Oct 26, 2025', 138: 'Oct 27, 2025', 139: 'Nov 3, 2025', 140: 'Nov 3, 2025', 141: 'Nov 3, 2025', 142: 'Nov 16, 2025', 143: 'Nov 16, 2025', 144: 'Nov 16, 2025', 145: 'Dec 22, 2025', 146: 'Dec 22, 2025', 147: 'Dec 22, 2025', 148: 'Dec 22, 2025', 149: 'Dec 22, 2025', 150: 'Dec 22, 2025', 151: 'Dec 22, 2025', 152: 'Dec 22, 2025', 153: 'Dec 22, 2025', 154: 'Dec 22, 2025', 155: 'Dec 22, 2025', 156: 'Dec 22, 2025', 157: 'Dec 22, 2025', 158: 'Dec 25, 2025', 159: 'Jan 12, 2026', 160: 'Jan 13, 2026', 161: 'Jan 15, 2026', 162: 'Jan 16, 2026', 163: 'Jan 17, 2026', 164: 'Jan 18, 2026', 165: 'Jan 19, 2026', 166: 'Jan 20, 2026', 167: 'Jan 21, 2026', 168: 'Jan 22, 2026', 169: 'Jan 23, 2026', 170: 'Jan 24, 2026', 171: 'Jan 25, 2026', 172: 'Jan 26, 2026', 173: 'Feb 5, 2026', 174: 'Feb 10, 2026', 175: 'Feb 10, 2026', 176: 'Feb 10, 2026', 177: 'Feb 10, 2026', 178: 'Feb 10, 2026', 179: 'Feb 10, 2026'
    };

    const englishPageRecorders = {
        // ch01: 8-34
        ...Object.fromEntries(Array.from({ length: 27 }, (_, i) => [i + 8, "Ye Hengrui"])),
        // ch02: 35-58
        ...Object.fromEntries(Array.from({ length: 24 }, (_, i) => [i + 35, "Ye Hengjia"])),
        // ch03: 59-69
        ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i + 59, "Song Shuyue"])),
        // ch04: 70-79
        ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 70, "Ye Hengrui"])),
        // ch05: 80-91
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 80, "Ye Hengjia"])),
        // ch06: 92-106
        ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => [i + 92, "Song Shuyue"])),
        // ch07: 107-129
        ...Object.fromEntries(Array.from({ length: 23 }, (_, i) => [i + 107, "Ye Hengrui"])),
        // ch08: 130-149
        ...Object.fromEntries(Array.from({ length: 20 }, (_, i) => [i + 130, "Yin Handi"])),
        // ch08: 150-160
        ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i + 150, "Song Shuyue"])),
        // ch09: 161-173
        ...Object.fromEntries(Array.from({ length: 13 }, (_, i) => [i + 161, "Yin Handi"])),
        // chzz: 174-179
        ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 174, "Yin Handi"])),
    };

    const pageRecorders = {
        // ch01: 8-34
        ...Object.fromEntries(Array.from({ length: 27 }, (_, i) => [i + 8, "叶恒瑞"])),
        // ch02: 35-58
        ...Object.fromEntries(Array.from({ length: 24 }, (_, i) => [i + 35, "叶恒嘉"])),
        // ch03: 59-69
        ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i + 59, "宋书玥"])),
        // ch04: 70-79
        ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 70, "叶恒瑞"])),
        // ch05: 80-91
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 80, "叶恒嘉"])),
        // ch06: 92-106
        ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => [i + 92, "宋书玥"])),
        // ch07: 107-129
        ...Object.fromEntries(Array.from({ length: 23 }, (_, i) => [i + 107, "叶恒瑞"])),
        // ch08: 130-149
        ...Object.fromEntries(Array.from({ length: 20 }, (_, i) => [i + 130, "印涵邸"])),
        // ch08: 150-160
        ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i + 150, "宋书玥"])),
        // ch09: 161-173
        ...Object.fromEntries(Array.from({ length: 13 }, (_, i) => [i + 161, "印涵邸"])),
        // chzz: 174-179
        ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 174, "印涵邸"])),
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
            
            let recorder = pageRecorders[pageNum] || '';
            if (isEnglish && englishPageRecorders[pageNum]) {
                recorder = englishPageRecorders[pageNum];
            }

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
