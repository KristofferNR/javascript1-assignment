const searchBtn = document.getElementById("search-btn")
const closeBtn = document.getElementById("close-btn")
const searchbar = document.getElementById("searchbar")
const searchModal = document.getElementById("search-modal")

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

async function loadProducts() {

    try {
        //hämtar api till variablen response
        const response = await fetch('https://fakestoreapi.com/products');
        //parsar response till json och lägger till i products
        const products = await response.json();
        //hämtar bento diven med id
        const bentoContainer = document.getElementById('bentoContainer');

        //går igenom alla products och printar ut dom till bentoContainer div
        products.forEach((product) => {
            //skapar en div som är kopplad till productCard
            const productCard = document.createElement('div');
            //ger alla nya div class="product-card"
            productCard.classList.add('product-card')
            //detta pushas in i product-card diven
            //ÄNDRA innerHTML till textContent
            //productCard.innerHTML = `
                //<img src="${product.image}" alt="${product.title}">
                //<h3>${product.title}</h3>
                //<p>${product.description}</p>
                //<p>Price: $${product.price}</p>
            //`;


            const productImg = document.createElement("img")
            const productTitle = document.createElement("h3")
            //const productDescription = document.createElement("p")
            const productPrice = document.createElement("p")

            productImg.classList.add("bentoImg")

            productImg.src = product.image
            productImg.alt = product.title

            productTitle.textContent = product.title
            //productDescription.textContent = product.description
            productPrice.textContent = `$ ${product.price}`

            //kopplar productCard till bentoContainern och gör productCard till ett child av bentoContainer
            // <div id="bentoContainer">
            //      <div class="product-card"></div>
            // </div>
            productCard.append(productImg, productTitle, productPrice)
            bentoContainer.appendChild(productCard);
            
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }}

async function addProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
        });

        const product = {
            "id": 21,
            "title": "string",
            "price": 0.1,
            "description": "string",
            "category": "string",
            "image": "http://example.com"
        }
    } catch(error) {

    }
}


async function search (searchbar) {
    const searchInput = document.getElementById(searchbar)
    const searchValue = searchInput.value.toUpperCase()
    const ul = document.getElementById("categorie-ul")
    const li = ul.getElementsByTagName("li")
    
    
    if(searchInput) {
        console.log(searchValue)

    } else {
        console.log("No searches found...")
    }

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]
        txtValue = a.textContent
        if(txtValue.toUpperCase().indexOf(searchValue) > -1) {
            li[i].style.display = ""

        } else {
            li[i].style.display = "none"
        }
    }
}

searchbar.addEventListener("input", () => {
    search("searchbar")
})


addProducts();
loadProducts();

