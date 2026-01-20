// Scroll-based navigation buttons for chapter navigation
document.addEventListener('DOMContentLoaded', function() {
    // Determine current chapter from URL
    const path = window.location.pathname;
    const currentPage = path.split("/").pop().replace('.html', '');

    // Extract chapter number from filename (e.g., ch01 -> 1, ch02 -> 2)
    let currentChapterNum = null;
    if (currentPage.startsWith('ch')) {
        currentChapterNum = parseInt(currentPage.substring(2), 10);
    } else if (currentPage === 'index') {
        currentChapterNum = 0; // Special case for index page
    }
    
    // Create next chapter button
    const nextChapterButton = document.createElement('button');
    nextChapterButton.id = 'next-chapter-btn';
    nextChapterButton.className = 'chapter-nav-btn next-chapter-btn';
    nextChapterButton.textContent = '点击跳转到下一章';
    nextChapterButton.setAttribute('aria-label', '点击跳转到下一章');
    
    // Create previous chapter button
    const prevChapterButton = document.createElement('button');
    prevChapterButton.id = 'prev-chapter-btn';
    prevChapterButton.className = 'chapter-nav-btn prev-chapter-btn';
    prevChapterButton.textContent = '点击跳转到上一章';
    prevChapterButton.setAttribute('aria-label', '点击跳转到上一章');
    
    // Add buttons to body
    document.body.appendChild(nextChapterButton);
    document.body.appendChild(prevChapterButton);
    
    // Hide buttons initially
    nextChapterButton.style.display = 'none';
    prevChapterButton.style.display = 'none';
    
    // Function to show next chapter button
    function showNextChapterButton() {
        if (currentChapterNum !== null) {
            if (currentChapterNum === 0) { // Index page - next is ch01
                nextChapterButton.style.display = 'block';
            } else if (currentChapterNum < 8) { // Regular chapters
                nextChapterButton.style.display = 'block';
            }
        }
    }

    // Function to show previous chapter button
    function showPrevChapterButton() {
        if (currentChapterNum !== null) {
            if (currentChapterNum === 1) { // Chapter 1 - previous is index
                prevChapterButton.style.display = 'block';
            } else if (currentChapterNum > 1) { // Chapters 2-8
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
        } else {
            const nextChapterNum = currentChapterNum + 1;
            nextChapterFile = 'ch' + String(nextChapterNum).padStart(2, '0') + '.html';
        }
        window.location.href = nextChapterFile;
    });

    // Handle previous chapter button click
    prevChapterButton.addEventListener('click', function() {
        let prevChapterFile;
        if (currentChapterNum === 1) { // From chapter 1 to index
            prevChapterFile = 'index.html';
        } else {
            const prevChapterNum = currentChapterNum - 1;
            prevChapterFile = 'ch' + String(prevChapterNum).padStart(2, '0') + '.html';
        }

        // Store in sessionStorage that we want to scroll to bottom after loading
        sessionStorage.setItem('scrollToBottomOnLoad', 'true');
        window.location.href = prevChapterFile;
    });

    // Check if we need to scroll to bottom after loading
    if (sessionStorage.getItem('scrollToBottomOnLoad') === 'true') {
        // Wait for DOM to load and all resources to be ready
        window.addEventListener('load', function() {
            // Clear the flag
            sessionStorage.removeItem('scrollToBottomOnLoad');

            // Scroll to bottom of page after a short delay to ensure everything is loaded
            setTimeout(function() {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
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

    // Listen for scroll events
    window.addEventListener('scroll', requestScrollUpdate);

    // Initial check in case page loads at top or bottom
    updateScrollPosition();
});