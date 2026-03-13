import { updateCart, item } from "./CartFunctions.js";

//Funktion som startar carten när användaren är i product sidan. Uppdaterar även cart så att den stämmer.
export function startCart(continer) {
  let arrayString = localStorage.getItem("cart");
  let updatedArry = JSON.parse(arrayString);
  let activeArray = [];
  if (updatedArry === null) {
    const cartArray = [
      new item("/imges/Group-1.png", "$130", "45", "red", "Sweater"),
      new item("/imges/Group-2.png", "$85", "38", "blue", "T-shirt"),
      new item("/imges/Group-3.png", "$210", "52", "black", "Hoodie"),
      new item("/imges/Group-4.png", "$60", "41", "white", "Hoodie"),
      new item("/imges/Group-5.png", "$175", "47", "green", "Sweater"),
    ];
    localStorage.setItem("cart", JSON.stringify(cartArray));
    arrayString = localStorage.getItem("cart");
    updatedArry = JSON.parse(arrayString);
    console.log(updatedArry);
    console.log("we are here");
    for (let i = 0; i < updatedArry.length; i++) {
      activeArray.push(updatedArry[i]);
    }
    console.log(activeArray);
    updateCart(continer, activeArray);
  } else {
    for (let i = 0; i < updatedArry.length; i++) {
      activeArray.push(updatedArry[i]);
    }

    updateCart(continer, activeArray);
  }

  return activeArray;
}

document.getElementById("cart-content").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    let deleteIndex = e.target.id;
    activeArray.splice(deleteIndex, 1);
  }
  updateCart(document.getElementById("cart-content"), activeArray);
});

document.getElementById("exit-cart").addEventListener("click", () => {
  document.getElementById("cart-continer").style.display = "none";
});

document.getElementById("cart").addEventListener("click", (e) => {
  document.getElementById("cart-continer").style.display = "flex";
  document.getElementById("cart-continer").focus();
  if (document.getElementById("navMenu").classList.contains("active")) {
    document.getElementById("navMenu").classList.remove("active");
  }
});
document.getElementById("desktop-cart").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("cart-continer").focus();
  document.getElementById("cart-continer").style.display = "flex";
});
