const menuItems = [
    // Hot Drinks
    {
        id: 1,
        title: "Tea",
        category: "hot-drinks",
        img: "Tea.png",
        variants: [
            { name: "Small", price: "₹20" },
            { name: "Medium", price: "₹30" },
            { name: "Large", price: "₹50" }
        ]
    },
    {
        id: 4,
        title: "Kesar Milk",
        category: "hot-drinks",
        price: "₹50",
        img: "Milk.png"
    },

    // Snacks
    {
        id: 6,
        title: "Samosa",
        category: "snacks",
        img: "Samosa.png",
        variants: [
            { name: "Plain", price: "₹15" },
            { name: "Chana Samosa", price: "₹50" }
        ]
    },
    {
        id: 8,
        title: "Kachori",
        category: "snacks",
        img: "Kachori.png",
        variants: [
            { name: "Plain", price: "₹25" },
            { name: "Chaat", price: "₹50" }
        ]
    },

    // Meals
    {
        id: 10,
        title: "Parantha",
        category: "meals",
        img: "Parantha.png",
        variants: [
            { name: "Plain", price: "₹25" },
            { name: "Aloo/Onion", price: "₹35" },
            { name: "Paneer", price: "₹50" }
        ]
    },
    {
        id: 14,
        title: "Poha Plate",
        category: "meals",
        price: "₹40",
        img: "Poha.png"
    }
];

const menuGrid = document.querySelector('.menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load items
window.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
});

// Filter items
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        e.currentTarget.classList.add('active');

        const category = e.currentTarget.dataset.category;
        const menuCategory = menuItems.filter(menuItem => {
            if (menuItem.category === category) {
                return menuItem;
            }
        });

        if (category === 'all') {
            displayMenuItems(menuItems);
        } else {
            displayMenuItems(menuCategory);
        }
    });
});

function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map((item, index) => {
        let delay = index * 0.1;

        let priceHtml = '';
        if (item.variants) {
            priceHtml = `<ul class="variants">
                ${item.variants.map(v => `<li><span>${v.name}</span> <span>${v.price}</span></li>`).join('')}
            </ul>`;
        } else {
            priceHtml = `<p class="price">${item.price}</p>`;
        }

        return `
            <article class="menu-card" style="animation-delay: ${delay}s">
                <img src="${item.img}" alt="${item.title}" class="photo">
                <div class="item-info">
                    <header>
                        <h3>${item.title}</h3>
                    </header>
                    ${priceHtml}
                </div>
            </article>
        `;
    });
    displayMenu = displayMenu.join('');
    menuGrid.innerHTML = displayMenu;
}

// Scroll Reveal Animation
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active'); // Optional: removes class when scrolled out
        }
    }
}

// Dark Theme Toggler
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const icon = themeToggle.querySelector('i');

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('toggle');
    });
});

// Check local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});
