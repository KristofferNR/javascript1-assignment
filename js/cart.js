import { updateCart,item } from "./productPage.js";

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
    console.log(activeArray);
    updateCart(continer, activeArray);
  }

  return activeArray;
}
