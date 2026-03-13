import { startCart } from "./cart.js";

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

function orderAllSelect() {

    if(!checkboxOne.checked || !checkboxTwo.checked) {
        alert("You need to select a delivery option")
        return
    } else if (!paymentImg.contains("payment-btn-clicked")) {
        alert("You need to select a payment option")
        return
    }


}

function showModal () {
    orderComplete.classList.toggle("show-order")
}

orderBtn.addEventListener("click", () => {
    showModal()

    setTimeout(() => {
        orderComplete.classList.remove("show-order")
    }, 3000);
})


checkboxOne.addEventListener("change", check)

checkboxTwo.addEventListener("change", check)