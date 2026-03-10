const cardsPerPage = 8; // Antal produktkort som visas per sida
const categoryContainer = document.getElementById("category-container");
const pagination = document.querySelectorAll(".pagination");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const pageLinks = document.querySelectorAll(".page-link");

const cards = Array.from(categoryContainer.getElementsByClassName("card")); // Gör en array av alla produktkort?

// Räknar ut hur många sidor som behövs 
const totalPages = Math.ceil(cards.length / cardsPerPage);
let currentPage = 1;

// funktion för att visa produktkort på viss sida
function displayPage(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    cards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.display = "block"; // korten visas
        } 
        else {
            card.style.display = "none"; // korten visas ej
        }
    });
}

// funktion för att uppdatera pagination nummer och knappar
function updatePagination() {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute("data-page"));
        link.classList.toggle("active", page === currentPage);
    });
}

// event listener för prev knapp 
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePagination();
    }
});

// event listener för next knapp 
nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePagination();
    }
});

// event listener för sidonummer knappar
pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute("data-page"));
        if (page !== currentPage) {
            currentPage = page;
            displayPage(currentPage);
            updatePagination();
        }
    });
});

displayPage(currentPage);
updatePagination();