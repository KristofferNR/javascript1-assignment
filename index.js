async function loadProducts() {

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const bentoContainer = document.getElementById('bentoContainer');

        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card')
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            `;
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

loadProducts();
addProducts();
