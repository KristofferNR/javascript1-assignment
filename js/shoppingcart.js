import { startCart } from "./cart.js";
import { updateCart } from "./CartFunctions.js";



const checkboxOne = document.getElementById("delivery-select-1")
const deliveryTimeOne = document.getElementById("delivery-time-1")

const checkboxTwo = document.getElementById("delivery-select-2")
const deliveryTimeTwo = document.getElementById("delivery-time-2")

const paymentBtns = document.querySelectorAll(".payment-btn")
const paymentImg = document.querySelectorAll(".payment-img")

const orderBtn = document.getElementById("order-btn")
const orderComplete = document.getElementById("order-complete")



//simpel funktion för att visa leverans tid för leverans med tiden bara hårdkodad i html
function check() {

    if (checkboxOne.checked) {
        deliveryTimeOne.style.display = "block"
        deliveryTimeTwo.style.display = "none"
    } else if (checkboxTwo.checked) {
        deliveryTimeTwo.style.display = "block"
        deliveryTimeOne.style.display = "none"
    } else {
        deliveryTimeOne.style.display = "none"
        deliveryTimeTwo.style.display = "none"
    }

}

paymentBtns.forEach(btn =>  {
    btn.addEventListener("click", (event) => {

        paymentImg.forEach(b => b.classList.remove("payment-btn-clicked"))

        event.target.classList.add("payment-btn-clicked")
    })
})

function showModal () {
    orderComplete.classList.toggle("show-order")
}

orderBtn.addEventListener("click", () => {
    orderAllSelect()
})

const myCart = startCart(document.querySelector("#cart-content"))

const cartArray = localStorage.getItem("cart")
const cartParse = JSON.parse(cartArray)
let totalSum = 0

/*Går igenom alla produkter som vi sparar i localstorage(cart) och tar bort $ och ändrar price från string
 till nummer och sedan summerar dom för att få ett total pris */
cartParse.forEach(product => {
    const price = product.price.replace("$", "")
    const numberPrice = Number(price)
    totalSum += numberPrice
})

document.getElementById("price-total").textContent = "Total: " + totalSum + "$"

/* Kollar så att allt finns med för att dom ska kunna göra en beställning. Den kollar om man
har produkter i sin varukorg, om man har valt ett leverans alternativ och ett betalnings alternativ.
Om allt det stämmer så kommer ordern gå igenom och man får en pop up i 3s och sen försvinner den
och produkterna töms ur varukorgen */
function orderAllSelect() {

    if(!checkboxOne.checked && !checkboxTwo.checked) {
        alert("You need to select a delivery option to proceed")
        return
    } 

    const hasSelectedPayment = Array.from(paymentImg).some(img => 
        img.classList.contains("payment-btn-clicked")
    );

    if (!hasSelectedPayment) {
        alert("You need to select a payment option to proceed");
        return;
    }
    
    if (myCart.length === 0) {
        alert("You need to have products in your shoppingcart to proceed")
        return;
    }


    showModal()

    setTimeout(() => {
        orderComplete.classList.remove("show-order")

        myCart.length = 0
        totalSum = 0

        document.getElementById("price-total").textContent = "Total: " + totalSum + "$"

        localStorage.setItem("cart", JSON.stringify([]))

        console.log("LocalStorage efter rensning:", localStorage.getItem("cart"));

        updateCart(document.querySelector("#cart-content"), myCart)

        location.reload();

        
    }, 3000);

}

paymentImg.forEach(img => {
    img.addEventListener("click", (event) => {
        paymentImg.forEach(i => i.classList.remove("payment-btn-clicked"));
        event.target.classList.add("payment-btn-clicked");
    });
});

checkboxOne.addEventListener("change", check)

checkboxTwo.addEventListener("change", check)