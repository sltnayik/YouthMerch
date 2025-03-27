// Fetch and Display Books
async function fetchBooks() {
    const response = await fetch('https://openlibrary.org/subjects/fiction.json?limit=16'); // Fetch 16 books
    const data = await response.json();
    const books = data.works;

    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear existing content

    books.forEach(book => {
        const coverId = book.cover_id;
        const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : 'https://via.placeholder.com/150?text=No+Cover';

        const bookElement = `
            <div class="product">
                <img src="${coverUrl}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>IDR ${(Math.random() * 100 + 150).toFixed(0)}K</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productGrid.innerHTML += bookElement;
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            // Update cart counter
            const cartCounter = document.getElementById('cart-counter');
            let count = parseInt(cartCounter.textContent) || 0;
            cartCounter.textContent = ++count;

            // Display confirmation message
            const confirmation = document.createElement('div');
            confirmation.className = 'confirmation-message';
            confirmation.textContent = 'Book added to cart!';
            document.body.appendChild(confirmation);

            setTimeout(() => {
                confirmation.remove();
            }, 2000);
        });
    });
}

// Welcome Message Animation
function addWelcomeMessageAnimation() {
    const heroHeading = document.querySelector('.hero .heading');
    const heroSubheading = document.querySelector('.hero .subheading');

    heroHeading.style.opacity = '0';
    heroSubheading.style.opacity = '0';

    setTimeout(() => {
        heroHeading.style.transition = 'opacity 1s';
        heroHeading.style.opacity = '1';
    }, 500);

    setTimeout(() => {
        heroSubheading.style.transition = 'opacity 1s';
        heroSubheading.style.opacity = '1';
    }, 1000);
}

// Dynamic Greeting Message
function addDynamicGreeting() {
    const heroSubheading = document.querySelector('.hero .subheading');
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = 'Good Morning! Your Gateway to the World of Books';
    } else if (currentHour < 18) {
        greeting = 'Good Afternoon! Your Gateway to the World of Books';
    } else {
        greeting = 'Good Evening! Your Gateway to the World of Books';
    }

    heroSubheading.textContent = greeting;
}

// Handle Contact Form Submission
function handleContactFormSubmission() {
    document.getElementById('contact-form').addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Display confirmation message
        const confirmation = document.createElement('div');
        confirmation.className = 'confirmation-message';
        confirmation.textContent = `Thank you, ${name}! Your message has been sent.`;
        document.body.appendChild(confirmation);

        setTimeout(() => {
            confirmation.remove();
        }, 3000);

        event.target.reset();
    });
}

// Handle Menu Toggle Functionality
function handleMenuToggle() {
    const toggle = document.querySelector('.toggle');
    const menuList = document.querySelector('.menu .menu-list');

    toggle.addEventListener('click', function () {
        menuList.classList.toggle('slide');
    });
}

// Smooth Scrolling for Navigation Links
function enableSmoothScrolling() {
    document.querySelectorAll('.menu-list a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize All Functions on Page Load
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    addWelcomeMessageAnimation();
    addDynamicGreeting();
    handleContactFormSubmission();
    handleMenuToggle();
    enableSmoothScrolling();
});
