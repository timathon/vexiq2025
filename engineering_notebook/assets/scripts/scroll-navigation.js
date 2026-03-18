// Scroll-based navigation buttons for chapter navigation
document.addEventListener('DOMContentLoaded', function() {
    // Determine current chapter from URL
    const path = window.location.pathname;
    const isEnglish = path.includes('/english_handwritten/');
    const currentPage = path.split("/").pop().replace('.html', '');

    // Extract chapter number from filename (e.g., ch01 -> 1, ch02 -> 2)
    let currentChapterNum = null;
    if (currentPage.startsWith('ch')) {
        if (currentPage === 'chzz') {
            currentChapterNum = 'zz'; // Special case for chzz
        } else {
            currentChapterNum = parseInt(currentPage.substring(2), 10);
        }
    } else if (currentPage === 'index') {
        currentChapterNum = 0; // Special case for index page
    }
    
    // Labels based on language
    const nextLabel = isEnglish ? 'Go to Next Chapter' : '转到下一章';
    const prevLabel = isEnglish ? 'Go to Previous Chapter' : '转到上一章';

    // Create next chapter button
    const nextChapterButton = document.createElement('button');
    nextChapterButton.id = 'next-chapter-btn';
    nextChapterButton.className = 'chapter-nav-btn next-chapter-btn';
    nextChapterButton.textContent = nextLabel;
    nextChapterButton.setAttribute('aria-label', nextLabel);

    // Create previous chapter button
    const prevChapterButton = document.createElement('button');
    prevChapterButton.id = 'prev-chapter-btn';
    prevChapterButton.className = 'chapter-nav-btn prev-chapter-btn';
    prevChapterButton.textContent = prevLabel;
    prevChapterButton.setAttribute('aria-label', prevLabel);

    // Add buttons to body - add prev button first so it appears above the scroll buttons
    document.body.appendChild(prevChapterButton);
    document.body.appendChild(nextChapterButton);
    
    // Hide buttons initially
    nextChapterButton.style.display = 'none';
    prevChapterButton.style.display = 'none';
    
    // Function to show next chapter button
    function showNextChapterButton() {
        if (currentChapterNum !== null) {
            if (currentChapterNum === 0) { // Index page - next is ch01
                nextChapterButton.style.display = 'block';
            } else if (currentChapterNum < 9) { // Regular chapters 1-8
                nextChapterButton.style.display = 'block';
            } else if (currentChapterNum === 9) { // Chapter 9 - next is chzz
                nextChapterButton.style.display = 'block';
            }
        }
    }

    // Function to show previous chapter button
    function showPrevChapterButton() {
        if (currentChapterNum !== null) {
            if (currentChapterNum === 1) { // Chapter 1 - previous is index
                prevChapterButton.style.display = 'block';
            } else if (currentChapterNum > 1 && currentChapterNum <= 9) { // Chapters 2-9
                prevChapterButton.style.display = 'block';
            } else if (currentChapterNum === 'zz') { // chzz - previous is ch09
                prevChapterButton.style.display = 'block';
            }
        }
    }
    
    // Function to hide both buttons
    function hideButtons() {
        nextChapterButton.style.display = 'none';
        prevChapterButton.style.display = 'none';
    }
    
    // Handle next chapter button click
    nextChapterButton.addEventListener('click', function() {
        let nextChapterFile;
        if (currentChapterNum === 0) { // From index page
            nextChapterFile = 'ch01.html';
        } else if (currentChapterNum < 9) { // Regular chapters 1-8
            const nextChapterNum = currentChapterNum + 1;
            nextChapterFile = 'ch' + String(nextChapterNum).padStart(2, '0') + '.html';
        } else if (currentChapterNum === 9) { // From ch09 to chzz
            nextChapterFile = 'chzz.html';
        }
        if (nextChapterFile) window.location.href = nextChapterFile;
    });

    // Handle previous chapter button click
    prevChapterButton.addEventListener('click', function() {
        let prevChapterFile;
        if (currentChapterNum === 1) { // From chapter 1 to index
            prevChapterFile = 'index.html';
        } else if (currentChapterNum > 1 && currentChapterNum <= 9) { // From chapters 2-9 to previous
            const prevChapterNum = currentChapterNum - 1;
            prevChapterFile = 'ch' + String(prevChapterNum).padStart(2, '0') + '.html';
        } else if (currentChapterNum === 'zz') { // From chzz to ch09
            prevChapterFile = 'ch09.html';
        }

        if (prevChapterFile) {
            // Store in sessionStorage that we want to scroll to bottom after loading
            // This applies to all previous chapter navigations to maintain consistency
            sessionStorage.setItem('scrollToBottomOnLoad', 'true');
            window.location.href = prevChapterFile;
        }
    });

    // Check if we need to scroll to bottom after loading
    if (sessionStorage.getItem('scrollToBottomOnLoad') === 'true') {
        // Clear the flag immediately
        sessionStorage.removeItem('scrollToBottomOnLoad');

        // For immediate scroll without flicker, we'll scroll right away
        // but we need to ensure the page is loaded enough to get the full height
        window.addEventListener('DOMContentLoaded', function() {
            // Scroll to bottom of page immediately to avoid flicker
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'instant'  // Use instant scroll to avoid animation
            });
        });

        // Also listen to load event as backup in case DOMContentLoaded fires too early
        window.addEventListener('load', function() {
            // Ensure we're scrolled to bottom even if content loads after DOM
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'instant'
            });
        });
    }
    
    // Track scroll position to determine if user is at top or bottom
    let ticking = false;

    function updateScrollPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 50; // 50px buffer (near bottom)
        const atTop = scrollTop < 50; // 50px buffer (near top)

        // Hide both buttons initially
        hideButtons();

        // Show appropriate button based on position
        if (atBottom) {
            showNextChapterButton();
        } else if (atTop) {
            showPrevChapterButton();
        }

        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Scroll to bottom function
    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Create scroll buttons if they don't exist
    if (!document.getElementById('scrollToTopBtn') && !document.getElementById('scrollToBottomBtn')) {
        // Create the scroll buttons container
        const scrollButtonsDiv = document.createElement('div');
        scrollButtonsDiv.className = 'scroll-buttons';
        
        const topTitle = isEnglish ? 'Back to Top' : '回到顶部';
        const bottomTitle = isEnglish ? 'Go to Bottom' : '跳转底部';
        
        scrollButtonsDiv.innerHTML = `
            <button id="scrollToTopBtn" class="scroll-btn" title="${topTitle}">↑</button>
            <button id="scrollToBottomBtn" class="scroll-btn" title="${bottomTitle}">↓</button>
        `;
        document.body.appendChild(scrollButtonsDiv);

        // Add event listeners to the newly created buttons
        const topBtn = document.getElementById('scrollToTopBtn');
        const bottomBtn = document.getElementById('scrollToBottomBtn');

        if (topBtn) {
            topBtn.addEventListener('click', scrollToTop);
        }

        if (bottomBtn) {
            bottomBtn.addEventListener('click', scrollToBottom);
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', requestScrollUpdate);

    // Initial check in case page loads at top or bottom
    updateScrollPosition();
});