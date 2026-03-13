

//Updaterar cart inehållet efter en ändring som att läga till eller ta bort. 
//Den rendrar in nya "updateringar" till carten.
export function updateCart(continer, activeArray) {
  continer.textContent = "";

  for (let i = 0; i < activeArray.length; i++) {
    const divItem = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemTitle = document.createElement("span");
    const itemPrice = document.createElement("span");
    const deleteItem = document.createElement("button");

    divItem.style.display = "flex";
    deleteItem.id = i;
    divItem.classList.add("item-continer");
    itemImg.classList.add("item-img");
    itemTitle.classList.add("item-title");
    itemPrice.classList.add("item-price");
    deleteItem.classList.add("delete-item");

    deleteItem.textContent = "X";
    itemImg.src = activeArray[i].img;
    itemTitle.textContent = activeArray[i].name;
    itemPrice.textContent = activeArray[i].price;
    divItem.append(itemImg, itemTitle, itemPrice, deleteItem);
    continer.appendChild(divItem);
  }
  localStorage.setItem("cart", JSON.stringify(activeArray));
}

//class
export class item {
  constructor(img, price, size, color, name) {
    this.img = img;
    this.price = price;
    this.size = size;
    this.color = color;
    this.name = name;
    this.amount = 1;
  }
}
