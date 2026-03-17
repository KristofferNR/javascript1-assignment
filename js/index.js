import { startCart } from "./cart.js";
import { updateCart } from "./CartFunctions.js";
let activeArray = startCart(document.getElementById("cart-content"));
//När man klickar på delete så tar vi bort det "item som inte ska var med längre i våran array eller cart"
document.getElementById("cart-content").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    let deleteIndex = e.target.id;
    activeArray.splice(deleteIndex, 1);
  }
  updateCart(document.getElementById("cart-content"), activeArray);
});
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
    


