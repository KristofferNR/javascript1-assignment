import { getDataFromApi } from "./api.js";

/*Hämtar alla produkter från api:et, går igenom varje product och ger varje del av produkten element för att printa ut på sidan*/
export async function loadProducts() {

    try {
        const data = await getDataFromApi('https://fakestoreapi.com/products')

        const carouselGallery = document.querySelector(".carousel-gallery")

        //går igenom alla products och printar ut dom till carousel div
        data.forEach((product) => {
            const productCard = document.createElement('div');
            const productDiv = document.createElement('div');


            const productImg = document.createElement("img")
            

            productImg.src = product.image
            productImg.alt = product.title
            
            
            productCard.classList.add("carousel-item")

            productDiv.append(productImg)
            productCard.append(productDiv)
            carouselGallery.appendChild(productCard); 
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }}