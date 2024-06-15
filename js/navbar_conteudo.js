function activateTab(element) {
    var items = document.getElementsByClassName('nav-item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }

    element.classList.add('active');

    var bounding = element.getBoundingClientRect();

    if (bounding.left < 0 || bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function handleNavLinkClick(event, link) {
    event.preventDefault();
    var item = link.querySelector('.nav-item');
    activateTab(item);

    var activeItemId = item.id;
    var url = new URL(link.href);
    url.searchParams.set('activeTab', activeItemId);
    var newUrl = url.toString();

    setTimeout(function() {
        window.location.href = newUrl;
    }, 0);
}

function buttonScrollLeft() {
    var navBar = document.getElementById('nav-bar');
    if (navBar) {
        navBar.scrollBy({
            top: 0,
            left: -200,
            behavior: 'smooth'
        });
    } else {
        console.error('navBar element not found');
    }
}

function buttonScrollRight() {
    var navBar = document.getElementById('nav-bar');
    if (navBar) {
        navBar.scrollBy({
            top: 0,
            left: 200,
            behavior: 'smooth'
        });
    } else {
        console.error('navBar element not found');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.scrollLeft = buttonScrollLeft;
    window.scrollRight = buttonScrollRight;
    window.activateTab = activateTab;

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function(event) {
            handleNavLinkClick(event, this);
        });

        var urlParams = new URLSearchParams(window.location.search);
        var activeTabId = urlParams.get('activeTab');
        if (activeTabId && navLinks[i].querySelector('.nav-item').id === activeTabId) {
            activateTab(navLinks[i].querySelector('.nav-item'));
        }
    }

    var activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        activateTab(activeItem);
    }
});
