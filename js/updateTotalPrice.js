/*Går igenom alla produkter som vi sparar i localstorage(cart) och tar bort $ och ändrar price från string
 till nummer och sedan summerar dom för att få ett total pris */
export function updateTotal() {
  const cartParse = JSON.parse(localStorage.getItem("cart")) || [];
  let currentTotal = 0;
  let totalSum = 0;

  cartParse.forEach((product) => {
    const price = product.price.replace("$", "");
    currentTotal += Number(price);
  });

  totalSum = currentTotal;

  document.getElementById("price-total").textContent =
    "Total: " + totalSum + "$";
}
