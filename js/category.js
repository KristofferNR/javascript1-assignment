// Hämtar alla element som behövs
const cards = document.querySelectorAll(".card");
const filterButtons = document.querySelectorAll(".filter-btn");
const pageLinks = document.querySelectorAll(".page-link");
const prevButton = document.getElementById("prev-btn")
const nextButton = document.getElementById("next-btn");

let filteredCards = [...cards];    // alla produkter 
let currentPage = 1;               // första sidan är alltid nummer 1
const cardsPerPage = 8;            // 8 produkter per sida

/* Här skapar vi en funktion som bestämmer vilka produkter som ska visas
Första och sista sidan räknas ut. Vi gömmer alla produkter först, sedan används slice som bara tar en del av filteredCards arrayen som loopar igenom alla produkter och ändrar till display=block på de produkter som ska visas. Allra sist i funktionen lägger vi till/tar bort .active på sidan som visas för css styling */
function showPage(page) {
    currentPage = page;

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach(card => card.style.display = "none");
    filteredCards.slice(start, end).forEach(card => {
        card.style.display = "block";
    });

    prevButton.disabled = page === 1;
    nextButton.disabled = page === Math.ceil(filteredCards.length / cardsPerPage);

    pageLinks.forEach(link => {
        link.classList.remove("active");
        if (Number(link.dataset.page) === page) {
            link.classList.add("active");
        }
    })
}

/* Filtreringsknappar
vi gör en loop för att loopa igenom alla knappar,
vi skapar ett klick-event som läser filtervärdet från HTML, 
när man trycker på knappen "show all" visas alla produkter, annars filtreras produkterna beroende på klass */
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        if (filter === "all") {
            filteredCards = [...cards];
        } else {
            filteredCards = [...cards].filter(card =>
                card.classList.contains(filter)
            );
        }
        currentPage = 1;
        showPage(currentPage);
    });
});

/* Pagination klick
Först loopar vi igenom alla sidnummer och skapar ett klick-event där koden körs när ett sidnummer klickas på. Vi stoppar defaulten att sidan laddas om. Vi hämtar sidnummer från HTML och sidan visas*/
pageLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const page = parseInt(link.dataset.page);
        showPage(page);
    });
});

/* Här räknar vi ut max antal sidor*/
function getTotalpages() {
    return Math.ceil(filteredCards.length / cardsPerPage);  // Math.ceil avrundar upp
}

/* klick-event för prev-knappen*/ 
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

/* klick-event för next-knapp */
nextButton.addEventListener("click", () => {
    if (currentPage < getTotalpages()) {
        currentPage++;
        showPage(currentPage);
    }
});

showPage(currentPage);

import {item } from "./CartFunctions.js";

document.getElementById("category-container").addEventListener("click", (e) => {
    
});