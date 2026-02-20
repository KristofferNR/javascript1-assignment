//Aktiverar Hamburgermenyn
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
});

/*Menyn stängs vid ett menyval. (Undersida ej skapad ännu.)*/
document.querySelectorAll(".nav-link").forEach(n => n.
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
    
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

addProducts();
loadProducts();

