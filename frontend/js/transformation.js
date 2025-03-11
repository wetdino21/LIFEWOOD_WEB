// Add this to your existing main.js or a new script file
document.addEventListener('DOMContentLoaded', function () {
    const scrollElements = document.querySelectorAll('.scroll-element');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scroll-in');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    //picture in picture function
    const video = document.querySelector('.video-container video');

    let isDragging = false;
    let startX, startY;

    video.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        video.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            video.style.transform = `translate(${dx}px, ${dy}px) rotateY(27deg)`;
        }
    });

    document.addEventListener('mouseup', async (e) => {
        if (isDragging) {
            isDragging = false;
            video.style.cursor = 'grab';
            video.style.transform = 'rotateY(27deg)'; // Reset position

            // Enable picture-in-picture mode
            if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
                try {
                    await video.requestPictureInPicture();
                } catch (error) {
                    console.error('Failed to enter Picture-in-Picture mode:', error);
                }
            }
        }
    });
});