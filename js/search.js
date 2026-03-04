const searchBtn = document.getElementById("search-btn")
const searchBtnMenu = document.getElementById("search-btn-menu")

const searchbar = document.getElementById("searchbar")
const searchModal = document.getElementById("search-modal")

const closeBtn = document.getElementById("close-btn")


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

        //parsar response till json och lägger till i products
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



async function searchHTML (searchbar) {

    const searchInput = document.getElementById(searchbar)
    const searchValue = searchInput.value.toUpperCase()

    const ul = document.getElementById("categorie-ul")
    const li = ul.getElementsByTagName("li")

    const apiResultContainer = document.getElementById("categorie-ul");
 
    const data = await getDataFromApi('https://fakestoreapi.com/products');

    apiResultContainer.innerHTML = "";

    data.forEach(product => {
        if (product.title.toUpperCase().includes(searchValue)) {
            const li = document.createElement("li");
            const productTitle = document.createElement("a")

            productTitle.textContent = product.title;
                
            li.append(productTitle)
            apiResultContainer.appendChild(li);
        }
    });
    

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]
        txtValue = a.textContent
        if(searchValue.length > 0 && txtValue.toUpperCase().indexOf(searchValue) > -1) {
            li[i].style.display = "block"

        } else {
            li[i].style.display = "none"
        }
    }
}

searchbar.addEventListener("input", () => {
    searchHTML("searchbar")
})


loadProducts();
