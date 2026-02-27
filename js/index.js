// Hämtar ikonen och navigering från HTML
const hamburgerIcon = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

/*Växlar mellan att öppna/stänga hamburgermenyn genom att växla (toggla) 
active-klassen vid klick på ikonen.*/
hamburgerIcon.addEventListener('click', () => {
  hamburgerIcon.classList.toggle('active');
  navMenu.classList.toggle('active');
});

//Stänger hamburgermeny genom att man klickar på en nav-länk.
document.querySelectorAll('.nav-link').forEach(link =>
  link.addEventListener('click', () => {
    hamburgerIcon.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

//Objekt som kopplar varje länkID med sin panelID. (nyckel-värde-par)
//JavaScripten hantera båda länkarna på samma sätt enligt nedstående funktioner.
const dropdownLink = {
  womanLink: 'womanDropdown',
  manLink:   'manDropdown'
};

//Loopa igenom varje länk- och panelpar. 
//Object.entries skapar en lista av värde-paren från objektet
Object.entries(dropdownLink).forEach(pair => {
  const [navLinkElementId, panelLinkElementId] = pair;
  const navLinkElement  = document.getElementById(navLinkElementId);
  const panelLinkElement = document.getElementById(panelLinkElementId);

//Klickhändelse när desktop BARA är >=667px
navLinkElement.addEventListener('click', (event) => {
  if (window.innerWidth >= 667) {
    event.preventDefault();
    
    //Kollar om panelen är öppen
    const isOpen = panelLinkElement.classList.contains('open');
    closeAll();
    
    //Om panelen inte är öppna kan de öppnas vid klick.
    if (!isOpen) {
      panelLinkElement.classList.add('open');
      navLinkElement.classList.add('woman-active');
      }
    }
  });
});

//Klick på Stäng-knappen("krysset som syns i dropdown-panel")
document.querySelectorAll('.dropdown-close').forEach(xBtn => {
  xBtn.addEventListener('click', closeAll);
});

/*Vid klick på länkar i hamburgermeny och klick utanför panel stängs den menyn som är 
närmast klicket (dvs den som är öppen)*/ 
document.addEventListener('click', (event) => {
  const clickedLink  = event.target.closest('[id$="Link"]');
  const clickedPanel = event.target.closest('.dropdown-panel');
  if (!clickedLink && !clickedPanel) 
    closeAll();
});

//Funktion för att kunna stänga hamburgermeny och panel
function closeAll() {
  document.querySelectorAll('.dropdown-panel').forEach(panelLinkElement => 
    panelLinkElement.classList.remove('open'));
  document.querySelectorAll('.woman-active').forEach(navLinkElement => 
    navLinkElement.classList.remove('woman-active'));
}
    
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

