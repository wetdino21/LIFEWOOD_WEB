window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('toggled');
    });

    const servicesCarousel = document.querySelector('.service-carousel .owl-carousel');
    const projectsList = document.querySelector('.slider .list');
    const thumbnailsList = document.querySelector('.thumbnail');

    // Dynamically generate HTML content for services
    data.services.forEach(service => {
        const serviceHTML = `
            <div class="item" style="background-image: url(${service.image});">
                <div class="item-desc">
                    <h3>${service.title}</h3>
                    <p>${service.desc}</p>
                </div>
            </div>
        `;
        servicesCarousel.innerHTML += serviceHTML;
    });

    // Dynamically generate HTML content for projects and thumbnails
    data.projects.forEach((project, index) => {
        const projectHTML = `
            <div class="item ${index === 0 ? 'active' : ''}">
                <img src="${project.image}" alt="${project.title}">
                <div class="content">
                    <p2>${project.category}</p2>
                    <h1>${project.title}</h1>
                    <p>${project.desc}</p>
                    <button class="read-more-btn" data-index="${index}">READ MORE <span class="next-icon">➔</span></button>
                </div>
            </div>
        `;
        projectsList.innerHTML += projectHTML;

        const thumbnailHTML = `
            <div class="item ${index === 0 ? 'active' : ''}">
                <img src="${project.image}" alt="${project.title}">
                <div class="content">
                    ${project.title}
                </div>
            </div>
        `;
        thumbnailsList.innerHTML += thumbnailHTML;
    });

    // Add event listeners to "READ MORE" buttons
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function () {
            console.log('click');
            const projectIndex = this.getAttribute('data-index');
            showProjectDetails(projectIndex);
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        const modal = document.getElementById("project-details-modal");
        if (event.target === modal) {
            closeProjectDetails();
        }
    });

    var owl = $(".custom-carousel").owlCarousel({
        autoWidth: true,
        loop: true,
        items: 3,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000, // 3 seconds per slide
        autoplayHoverPause: true, // Pause on hover
        smartSpeed: 1000, // Smoother but not too slow
        slideBy: 1 // Move one item per transition
    });

    // Pause autoplay on hover
    $(".custom-carousel").on('mouseenter', function () {
        owl.trigger('stop.owl.autoplay');
    });

    // Resume autoplay when not hovered
    $(".custom-carousel").on('mouseleave', function () {
        owl.trigger('play.owl.autoplay', [3000]); // Use same timeout as autoplayTimeout
    });

    $(".custom-carousel .item").hover(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    });

    // projects
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let thumbnails = document.querySelectorAll('.thumbnail .item');

    // config param
    let countItem = items.length;
    let itemActive = 0;

    // event next click
    next.onclick = function (e) {
        e.preventDefault(); // Prevent default behavior
        itemActive = itemActive + 1;
        if (itemActive >= countItem) {
            itemActive = 0;
        }
        showSlider();
    }

    // event prev click
    prev.onclick = function (e) {
        e.preventDefault(); // Prevent default behavior
        itemActive = itemActive - 1;
        if (itemActive < 0) {
            itemActive = countItem - 1;
        }
        showSlider();
    }

    // auto run slider
    let refreshInterval = setInterval(() => {
        next.click();
    }, 5000);

    function showSlider() {
        // remove item active old
        let itemActiveOld = document.querySelector('.slider .list .item.active');
        let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
        if (itemActiveOld) itemActiveOld.classList.remove('active');
        if (thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');

        // active new item
        items[itemActive].classList.add('active');
        thumbnails[itemActive].classList.add('active');
        setPositionThumbnail();

        // clear auto time run slider
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next.click();
        }, 5000);
    }

    function setPositionThumbnail() {
        let thumbnailActive = document.querySelector('.thumbnail .item.active');
        let rect = thumbnailActive.getBoundingClientRect();
        if (rect.left < 0 || rect.right > window.innerWidth) {
            thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
        }
    }

    // click thumbnail
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('mouseover', () => {
            itemActive = index;
            showSlider();
        });
    });

    // Real-time validation
    const form = document.getElementById('applyForm');
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (input.id !== 'country_code') {
            input.addEventListener('input', function () {
                if (input.checkValidity()) {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                } else {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                }
            });
        }
    });


    // Prevent default drag behavior on images within thumbnails
    document.querySelectorAll('.thumbnail .item img').forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });


    // Initialize Owl Carousel for thumbnails
    $(thumbnailsList).owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    // Prevent default drag behavior on images within thumbnails
    document.querySelectorAll('.thumbnail .item img').forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });

    // Handle hover effect
    document.querySelectorAll('.thumbnail .item').forEach(item => {
        item.addEventListener('mouseover', () => {
            document.querySelectorAll('.thumbnail .item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Stop any auto-scroll
    window.onscroll = function () {
        clearInterval(refreshInterval);
    };
});

function showProjectDetails(index) {
    // Show project details modal
    const modal = document.getElementById("project-details-modal");
    modal.style.display = "flex";
    document.body.classList.add('modal-active');

    // Load project details
    const project = data.projects[index];
    const projectDetailsContainer = document.getElementById('project-details-content');

    const projectDetailsHTML = `
        <div class="project-details-header">
            <img src="${project.image}" alt="${project.title}">
            <h1>${project.title}</h1>
        </div>
        <div class="project-details-content">
            <p>${project.desc}</p>
            ${project.image2 ? `<img src="${project.image2}" alt="${project.title2}">` : project.video ? `<video src="${project.video}" controls></video>` : ''}
            ${project.title2 ? `<h2>${project.title2}</h2>` : ''}
            ${project.desc2 ? `<p>${project.desc2}</p>` : ''}
            ${project.desc3 ? `<p>${project.desc3}</p>` : ''}
            ${project.subjecttitle1 ? `<h3>${project.subjecttitle1}</h3><p>${project.subjectdesc1}</p><img src="${project.subjectimage1}" alt="${project.subjecttitle1}">` : ''}
            ${project.subjecttitle2 ? `<h3>${project.subjecttitle2}</h3><p>${project.subjectdesc2}</p><img src="${project.subjectimage2}" alt="${project.subjecttitle2}">` : ''}
            ${project.subjecttitle3 ? `<h3>${project.subjecttitle3}</h3><p>${project.subjectdesc3}</p><img src="${project.subjectimage3}" alt="${project.subjecttitle3}">` : ''}
            ${project.list ? `<ul>${project.list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
        </div>
    `;

    projectDetailsContainer.innerHTML = projectDetailsHTML;
}

function closeProjectDetails() {
    // Hide project details modal
    const modal = document.getElementById("project-details-modal");
    modal.style.display = "none";
    document.body.classList.remove('modal-active');
}

function closeProjectDetails() {
    // Hide project details modal
    const modal = document.getElementById("project-details-modal");
    modal.style.display = "none";
    document.body.classList.remove('modal-active');
}

document.getElementById('language').addEventListener('change', function () {
    const lang = this.value;
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        } else {
            console.warn(`Element not found: ${this.getAttribute('href')}`);
        }
    });
});

// Dynamically generate HTML content for services and projects
document.addEventListener('DOMContentLoaded', function () {

});