const searchBtn = document.getElementById("search-btn")
const searchBtnMenu = document.getElementById("search-btn-menu")

const searchbar = document.getElementById("searchbar")
const searchModal = document.getElementById("search-modal")

const closeBtn = document.getElementById("close-btn")

document.getElementById("search-result").addEventListener("click", () =>{
    const activeProduct = {
      imgSrc: "/imges/Group-13.png",
      title: "Cargo pants",
      description: "Statement cargos with a functional edge. Easy to wear, hard to ignore — made for late nights, long days, and standout fits.",
      price: "130$",
    };
   
    localStorage.setItem("activeItem", JSON.stringify(activeProduct));
});

function showModal () {
    searchModal.classList.toggle("show")
}

function closeModal () {
    searchModal.classList.remove("show")
}

searchBtn.addEventListener("click", () => {
    showModal()
    searchbar.focus()
})

searchBtnMenu.addEventListener("click", () => {
    showModal()
    searchbar.focus()
})

closeBtn.addEventListener("click", () => {
    closeModal()
})


window.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.key === "Escape") {
        if(closeModal()) {
            showModal()
        }
    }
})
//function till att hämta ett api där vi specificerar vilket api vi
//vill hämta i paramsen på functionen
//Detta gör functionen återanvändiningsbar
async function getDataFromApi(url) {
        
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Server didnt start properly")
        }
        const data = await response.json();

        return data;
}

async function loadProducts() {

    try {
        const data = await getDataFromApi('https://fakestoreapi.com/products')

        const carouselGallery = document.querySelector(".carousel-gallery")

        //går igenom alla products och printar ut dom till carousel div
        data.forEach((product) => {
            //skapar en div som är kopplad till productCard
            const productCard = document.createElement('div');
            const productDiv = document.createElement('div');


            const productImg = document.createElement("img")
            //const productTitle = document.createElement("h3")
            //const productDescription = document.createElement("p")
            //const productPrice = document.createElement("p")

            productImg.src = product.image
            productImg.alt = product.title
            //productTitle.textContent = product.title
            //productDescription.textContent = product.description
            //productPrice.textContent = `$ ${product.price}`
            
            productCard.classList.add("carousel-item")

            productDiv.append(productImg)
            productCard.append(productDiv)
            carouselGallery.appendChild(productCard); 
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }}


//sökfunktion som går igenom alla product titlar som vi hämtar från api:et, om titeln på producten matchar det vi har skrivit i inputfältet så skapar den en ny li för den titeln
async function apiSearchFunction(searchValue) {

    const apiResultContainer = document.getElementById("api-search-results");

    apiResultContainer.innerHTML = ""

    if(searchValue.length === 0) return;
 
    const data = await getDataFromApi('https://fakestoreapi.com/products');

    data.forEach(product => {
        if (product.title.toUpperCase().includes(searchValue)) {

            const li = document.createElement("li");
            const productTitle = document.createElement("a")

            productTitle.textContent = product.title;
                
            li.append(productTitle)
            apiResultContainer.appendChild(li);
        }
    });
}

//sök funktion som går igenom alla hårdkodade li och visar dom på skärmen om dom matchar det du har skrivit i inputfältet annars syns dom inte
function htmlSearchFunction(searchValue) {
    
    const li = document.querySelectorAll("#categorie-ul li")

    li.forEach(item => {
        const text = item.textContent.toUpperCase()
        if (searchValue.length === 0) {
            item.style.display  = "none"
        } else if (text.includes(searchValue)) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
        
    })
}

//en funktion som hämtar båda sökfunktionerna för kategorie och api
async function searchHandler (searchbar) {

    const searchValue = document.getElementById(searchbar)
    const searchResult = searchValue.value.toUpperCase()

    htmlSearchFunction(searchResult)
    await apiSearchFunction(searchResult)
}

//funktion för att inte ladda alla sökresultat direkt när du skriver, den väntar 300ms innan den ger dig sökresultat på det du har skrivit, för varje gång du skriver något så börjar timern om
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay)
    }
}

let debounceSearch = debounce(searchHandler, 300)

searchbar.addEventListener("input", () => {
    debounceSearch("searchbar")
})


loadProducts();
