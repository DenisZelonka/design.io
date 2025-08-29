document.addEventListener('DOMContentLoaded', () => {
    const featuresList = document.querySelector('.main.special .features');
    const prevButton = document.querySelector('.main.special .prev-button');
    const nextButton = document.querySelector('.main.special .next-button');
    const items = Array.from(featuresList.children);
    const totalItems = items.length;
    // const visibleItems = 4;
    let currentIndex = 0;
    let autoScrollInterval;
    let scrollDirection = 1;
    // const visibleItems = window.innerWidth <= 768 ? 1 : 4; 
    const getVisibleItems = () => {
        // Adjust this logic based on your CSS media queries.
        // For example, if you show 1 item on mobile, 4 on desktop
        if (window.innerWidth <= 768 )  {
            return 1
        } 
        if (window.innerWidth <= 980 )  {
            return 3
        } 
        return 4

    };
    const visibleItems = getVisibleItems();
    console.log('Visible Items:', visibleItems);
    
    // Touch event variables
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimum distance for a swipe to be registered

    const moveToSlide = (smooth = true) => {
        const itemWidth = items[0].getBoundingClientRect().width;
        featuresList.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
        featuresList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    const startAutoScroll = () => {
        stopAutoScroll(); // Always clear previous interval
        autoScrollInterval = setInterval(() => {
            if (currentIndex >= totalItems - visibleItems) {
                scrollDirection = -1;
            } else if (currentIndex <= 0) {
                scrollDirection = 1;
            }
            currentIndex += scrollDirection;
            moveToSlide();
        }, 2500);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    };

    featuresList.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        startTranslate = featuresList.style.transform.includes('translateX') 
            ? parseInt(featuresList.style.transform.replace(/[^-\d.]/g, '')) 
            : 0;
        featuresList.style.transition = 'none'; // Disable transition for user drag
        stopAutoScroll(); // Pause autoscroll when user starts touching
    }, { passive: true });

    featuresList.addEventListener('touchmove', (e) => {
        touchMoveX = e.changedTouches[0].screenX;
        const dragDistance = touchMoveX - touchStartX;
        currentTranslate = startTranslate + dragDistance;
        featuresList.style.transform = `translateX(${currentTranslate}px)`;
    });

    featuresList.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const dragDistance = touchEndX - touchStartX;
        const itemWidth = items[0].getBoundingClientRect().width;

        const threshold = 50; 

        if (dragDistance < -threshold) {
            currentIndex = Math.min(currentIndex + 1, totalItems - visibleItems);
        } else if (dragDistance > threshold) {
            // Swiped right, move to the previous slide
            currentIndex = Math.max(0, currentIndex - 1);
        }
        
        moveToSlide(true); // Snap with transition

        setTimeout(startAutoScroll, 500);
    });

    nextButton.addEventListener('click', () => {
// ...existing code...
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            moveToSlide();
        }
        stopAutoScroll(); // Stop autoscroll on manual navigation
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveToSlide();
        }
        stopAutoScroll(); // Stop autoscroll on manual navigation
    });

    // --- Desktop Hover Listeners ---
    const carouselContainer = document.querySelector('.main.special .carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);

    // Initial state
    moveToSlide(false);
    startAutoScroll();
});