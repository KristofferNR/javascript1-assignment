//Hämta element
const infoBtn = document.getElementById("infoBtn-small");
const infoBtnBig = document.getElementById("infoBtn");
const infopopup = document.getElementById("information-small");
const infopopupBig = document.getElementById("information");
const sizeCmboBox = document.getElementById("size-dropdown");
const sizeList = document.getElementById("size-dropdown-content");
const addBotton = document.getElementById("addBtn");
const colors = document.getElementById("color-list-big");
const colorsSmall = document.getElementById("color-list");

let size;

//Arry för att spara i localstorage
const cartArray = [];

//Class
class item {
  constructor(img, price, size, color, name) {
    this.img = img;
    this.price = price;
    this.size = size;
    this.color = color;
    this.name = name;
    this.amount = 1;
  }
}

// Info
infoBtn.addEventListener("click", () => {
  if (infopopup.style.display === "block") {
    infopopup.style.display = "none";
  } else {
    infopopup.style.display = "block";
  }
});
infoBtnBig.addEventListener("click", () => {
  if (infopopupBig.style.display === "block") {
    infopopupBig.style.display = "none";
  } else {
    infopopupBig.style.display = "block";
  }
});

//For size
sizeCmboBox.addEventListener("click", () => {
  if (sizeList.style.display === "block") {
    sizeList.style.display = "none";
  } else {
    sizeList.style.display = "block";
  }
});
sizeList.addEventListener("click", (event) => {
  event.stopPropagation();
});
const sizeUl = document.getElementById("size-list");

sizeUl.addEventListener("click", (event) => {
  if (event.target.classList.contains("size")) {
    sizeCmboBox.textContent = event.target.textContent;
    sizeCmboBox.classList.add("ready");
    size = sizeCmboBox.textContent;
    sizeCmboBox.appendChild(sizeList);
    sizeList.style.display = "none";
  }
});

//For adding to cart
addBotton.addEventListener("click", () => {
  let color;
  if (!sizeCmboBox.classList.contains("ready")) {
    console.log("size not valid");
    return;
  }

  if (window.getComputedStyle(colors).display === "flex") {
    if ((color = testColor(colors)) === "") {
      console.log("color not valid");
      return;
    }
  }

  if (window.getComputedStyle(colorsSmall).display === "flex") {
    if ((color = testColor(colorsSmall)) === "") {
      console.log("color not valid small");
      return;
    }
  }
  const img = document.getElementById("mainImg");

  let newItem = new item(
    img.getAttribute("src"),
    document.getElementById("money").textContent,
    size,
    color,
    document.getElementById("product-title").textContent,
  );
  console.log(newItem);
});
//Retunerar om användare har gjort ett val med färg eller inte samt att den kollar vilken färg.
function testColor(continer) {
  const allLi = continer.querySelectorAll("li");
  let selectedColor = "";

  allLi.forEach((li) => {
    if (li.classList.contains("ready")) {
      if (li.classList.contains("red")) {
        selectedColor = "red";
      } else if (li.classList.contains("green")) {
        selectedColor = "green";
      } else if (li.classList.contains("blue")) {
        selectedColor = "blue";
      } else {
        selectedColor = "beige";
      }
    }
  });
  return selectedColor;
}
addBotton.addEventListener("mousedown", () => {
  addBotton.style.backgroundColor = "rgb(68, 255, 0)";
  addBotton.style.boxShadow = "2px 2px 10px white, -2px -2px 10px white";
});
addBotton.addEventListener("mouseup", () => {
  addBotton.style.backgroundColor = "rgb(68, 255, 0, 0.90)";
  addBotton.style.boxShadow = "none";
});

//För färger select
colors.addEventListener("click", (event) => {
  if (event.target.classList.contains("color-Choice")) {
    const allLi = colors.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("selected", "ready");
    });
    event.target.classList.add("selected", "ready");
  }
});
colorsSmall.addEventListener("click", (event) => {
  if (event.target.classList.contains("color-Choice")) {
    const allLi = colorsSmall.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("selected", "ready");
    });
    event.target.classList.add("selected", "ready");
  }
});

//bilder

 addImg(
   document.getElementById("mainProductImg"),
  "/imges/Group-13.png",
  "Description of image",
 );

// addInfo(
//   document.getElementById("mainProductImg"),
//   "/imges/Group-13.png",
//   "Description of image",
//   "Cargo Pants",
//   "$400",
//   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
// );
// addImg(
//   document.getElementById("small-productImg"),
//   "/imges/Group-13.png",
//   "Description of image",
// );

//En åternvändbar funktion för att lägga till bilder i divarna som jag skapat som placeholders
function addImg(continer, imgSrc, imgAlt) {
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = imgAlt;
  img.id = "mainImg";
  continer.style.position = "relative";

  img.style.width = "100%";
  img.style.height = "100%";
  img.style.display = "block";

  img.style.objectFit = "cover";

  continer.appendChild(img);
}
function addInfo(continer, imgSrc, imgAlt, title, price, description) {
  addImg(continer, imgSrc, imgAlt);
  document.getElementById("money").textContent = price;
  document.getElementById("money-big").textContent = price;
  document.getElementById("product-title").textContent = title;
  document.getElementById("product-description").textContent = description;

}

addMoreLike(document.getElementById("more-like-continer"));
//First prototype for adding the right imges in more like.
function addMoreLike(continer) {
  const allDiv = continer.querySelectorAll("div");
  allDiv.forEach((div) => {
    addImg(div, "/imges/Group-9.png", "Description of image");
  });
}
