// document.addEventListener('DOMContentLoaded', () => {
//     const featuresList = document.querySelector('.main.special .features');
//     const prevButton = document.querySelector('.main.special .prev-button');
//     const nextButton = document.querySelector('.main.special .next-button');
//     const items = Array.from(featuresList.children);
//     const dotsContainer = document.querySelector('.main.special .dots-container');
//     const totalItems = items.length;

//     let currentIndex = 0;
//     const visibleItems = 4; // Number of items visible on desktop

//     // --- Create Dots for Mobile ---
//     items.forEach((_, index) => {
//         const dot = document.createElement('button');
//         dot.classList.add('dot');
//         if (index === 0) dot.classList.add('active'); // Set first dot active initially
//         dotsContainer.appendChild(dot);
//     });
//     const dots = Array.from(dotsContainer.children);

//     const updateButtonState = () => {
//         // Hide prev button on first slide, hide next button on last slide
//         prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
//         nextButton.style.display = currentIndex >= totalItems - visibleItems ? 'none' : 'flex';
//     };

//     const moveToSlide = () => {
//         const itemWidth = items[0].offsetWidth;
//         featuresList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
//         updateButtonState();
//     };

//     // --- Event Listeners for Buttons ---
//     nextButton.addEventListener('click', () => {
//         if (currentIndex < totalItems - visibleItems) {
//             currentIndex++;
//             moveToSlide();
//         }
//     });

//     prevButton.addEventListener('click', () => {
//         if (currentIndex > 0) {
//             currentIndex--;
//             moveToSlide();
//         }
//     });

//     // --- Logic for Mobile Dot Indicators ---
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const index = items.indexOf(entry.target);
//                 dots.forEach(dot => dot.classList.remove('active'));
//                 dots[index].classList.add('active');
//             }
//         });
//     }, {
//         root: featuresList, // The scroll container
//         threshold: 0.51 // Trigger when more than 51% of the item is visible
//     });

//     // Observe each list item for intersection
//     items.forEach(item => observer.observe(item));

//     // Initial state
//     updateButtonState();
// });



// document.addEventListener('DOMContentLoaded', () => {
//     // --- Verify Element Existence ---
//     const featuresList = document.querySelector('.main.special .features');
//     const prevButton = document.querySelector('.main.special .prev-button');
//     const nextButton = document.querySelector('.main.special .next-button');
//     const dotsContainer = document.querySelector('.main.special .dots-container');
//     const carouselContainer = document.querySelector('.main.special .carousel-container');

//     // Exit if essential elements are not found
//     if (!featuresList || !prevButton || !nextButton || !carouselContainer) {
//         console.error('One or more essential carousel elements not found. Please check your HTML class names.');
//         return;
//     }

//     const items = Array.from(featuresList.children);
//     const totalItems = items.length;

//     if (totalItems === 0) {
//         console.warn('No items found inside the features list. Autoscroll will not start.');
//         return;
//     }
    
//     // --- Autoscroll and Navigation Logic ---
//     let currentIndex = 0;
//     const visibleItems = 4;
//     let autoScrollInterval;
//     let scrollDirection = 1;

//     const moveToSlide = () => {
//         const itemWidth = items[0].getBoundingClientRect().width;
//         featuresList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
//         // Your updateButtonState() function call should be here
//     };

//     const startAutoScroll = () => {
//         stopAutoScroll();
//         autoScrollInterval = setInterval(() => {
//             if (currentIndex >= totalItems - visibleItems) {
//                 scrollDirection = -1;
//             } else if (currentIndex <= 0) {
//                 scrollDirection = 1;
//             }
//             currentIndex += scrollDirection;
//             moveToSlide();
//         }, 2000);
//     };

//     const stopAutoScroll = () => {
//         clearInterval(autoScrollInterval);
//     };

//     // --- Event Listeners and Initial State ---
//     nextButton.addEventListener('click', () => {
//         if (currentIndex < totalItems - visibleItems) {
//             currentIndex++;
//             moveToSlide();
//         }
//         stopAutoScroll();
//     });

//     prevButton.addEventListener('click', () => {
//         if (currentIndex > 0) {
//             currentIndex--;
//             moveToSlide();
//         }
//         stopAutoScroll();
//     });

//     carouselContainer.addEventListener('mouseenter', stopAutoScroll);
//     carouselContainer.addEventListener('mouseleave', startAutoScroll);

//     // Initial state
//     // Your updateButtonState() function call should be here
//     startAutoScroll();
// });

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
        const itemWidth = items[0].getBoundingClientRect().width;
        
        // Calculate the closest slide index based on the final position
        let newIndex = Math.round(Math.abs(currentTranslate) / itemWidth);
        
        // Clamp the new index to valid bounds
        // const visibleItems = getVisibleItems();
        newIndex = Math.max(0, Math.min(newIndex, totalItems - visibleItems));
        
        // Update the global currentIndex and perform the snap
        currentIndex = newIndex;
        moveToSlide(true); // Snap with transition

        // Restart autoscroll after a brief delay to allow the snap animation to finish
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