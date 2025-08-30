document.addEventListener('DOMContentLoaded', () => {
    const featuresList = document.querySelector('.main.special .features');
    const prevButton = document.querySelector('.main.special .prev-button');
    const nextButton = document.querySelector('.main.special .next-button');
    let items = Array.from(featuresList.children);
    let totalItems = items.length;
    let autoScrollInterval;
    const getVisibleItems = () => {
        if (window.innerWidth <= 768) {
            return 1
        }
        if (window.innerWidth <= 980) {
            return 3
        }
        return 4
    };
    const visibleItems = getVisibleItems();
    console.log('Visible Items:', visibleItems);

    // Touch event variables
    let touchStartX = 0;
    let isTransitioning = false;
    let globalDirection = 'next';

    const shiftItems = (direction) => {
        if (isTransitioning) return;
        isTransitioning = true;
        const itemWidth = items[0].getBoundingClientRect().width;
        featuresList.style.transition = 'transform 0.5s ease-in-out';
        if (direction === 'next') {
            globalDirection = 'next';
            featuresList.style.transform = `translateX(-${itemWidth}px)`;
            setTimeout(() => {
                const firstItem = featuresList.firstElementChild;
                featuresList.appendChild(firstItem);
                featuresList.style.transition = 'none';
                featuresList.style.transform = 'translateX(0)';
                items = Array.from(featuresList.children);
                isTransitioning = false;
            }, 500); // Wait for the transition to finish
        } else if (direction === 'prev') {
            globalDirection = 'prev';
            const lastItem = featuresList.lastElementChild;
            featuresList.prepend(lastItem);
            featuresList.style.transition = 'none';
            featuresList.style.transform = `translateX(-${itemWidth}px)`;
            setTimeout(() => {
                featuresList.style.transition = 'transform 0.5s ease-in-out';
                featuresList.style.transform = 'translateX(0)';
                items = Array.from(featuresList.children);
                isTransitioning = false;
            }, 10); // Small delay to allow the new position to render
        }
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            shiftItems(globalDirection);
        }, 2500);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    };

    featuresList.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    }, { passive: true });

    featuresList.addEventListener('touchmove', (e) => {
        if (isTransitioning) return;
        const touchMoveX = e.changedTouches[0].screenX;
        const dragDistance = touchMoveX - touchStartX;
        featuresList.style.transition = 'none';
        featuresList.style.transform = `translateX(${dragDistance}px)`;
    });

    featuresList.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const dragDistance = touchEndX - touchStartX;
        const itemWidth = items[0].getBoundingClientRect().width;
        const threshold = 50;

        if (Math.abs(dragDistance) > threshold) {
            if (dragDistance < 0) {
                shiftItems('next');
            } else {
                shiftItems('prev');
            }
        } else {
            featuresList.style.transition = 'transform 0.5s ease-in-out';
            featuresList.style.transform = 'translateX(0)';
        }

        setTimeout(startAutoScroll, 500);
    });

    nextButton.addEventListener('click', () => {
        stopAutoScroll();
        shiftItems('next');
        setTimeout(startAutoScroll, 500);
    });

    prevButton.addEventListener('click', () => {
        stopAutoScroll();
        shiftItems('prev');
        setTimeout(startAutoScroll, 500);
    });

    const carouselContainer = document.querySelector('.main.special .carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
});