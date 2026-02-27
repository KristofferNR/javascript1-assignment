// Hämta produkter kopplade till en kategori
async function fetchCategory() {

    try {
        const response = await fetch ('https://fakestoreapi.com/products/category/jewelery');

        const product = await response.json();
        const categoryContainer = document.getElementById("category-container");

        product.forEach((product) => {

            // skapar produktkort med de produkter som ska visas
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            // väljer vad som ska visas, titel, bild och pris
            const productImg = document.createElement("img");
            const productTitle = document.createElement("h3");
            const productPrice = document.createElement("p");

            productImg.classList.add("category-img");

            productImg.src = product.image;
            productImg.alt = product.productTitle;

            productTitle.textContent = product.title;
            productPrice.textContent = `$ ${product.price}`

            productCard.append(productImg, productTitle, productPrice)
            categoryContainer.appendChild(productCard);
        });
    }
        catch (error) {
            console.error("Error fetching products", error);
        }
};


// POST - skapa nya produkter
async function createProduct(title, price, description, category, image) {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, price, description, category, image })
    });

    if (!response.ok) {
        throw new Error("Could not create new product");
    }
   
    const product = await response.json();
    console.log("product created:", product);
    }

    catch (error) {
        console.error("Error creating product");
    }
}

createProduct("Matrix Wash Tee", 39.99, "description", "Tshirts");
createProduct("Spiraling Wash Tee", 46.99, "", "Tshirts");


fetchCategory();




