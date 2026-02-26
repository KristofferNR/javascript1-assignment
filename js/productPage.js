const sizeBtn = document.getElementById("size-dropdown");
const infoBtn = document.getElementById("infoBtn-small");
const infoBtnBig = document.getElementById("infoBtn");
const infopopup = document.getElementById("information-small");
const infopopupBig = document.getElementById("information");
const sizeCmboBox = document.getElementById("size-dropdown");
const sizeList = document.getElementById("size-dropdown-content");
const addBotton = document.getElementById("addBtn");
const colors = document.getElementById("color-list-big");
const colorsSmall = document.getElementById("color-list");

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

addBotton.addEventListener("mousedown", () => {
  addBotton.style.backgroundColor = "rgb(68, 255, 0)";
  addBotton.style.boxShadow = "2px 2px 10px white, -2px -2px 10px white";
});
addBotton.addEventListener("mouseup", () => {
  addBotton.style.backgroundColor = "rgb(68, 255, 0, 0.90)";
  addBotton.style.boxShadow = "none";
});

colors.addEventListener("click", (event) => {
  if (event.target.classList.contains("color-Choice")) {
    const allLi = colors.querySelectorAll('li');
        allLi.forEach(li => {
            li.classList.remove('selected');
        });
    event.target.classList.add('selected');
  }
});
colorsSmall.addEventListener("click", (event) => {
  if (event.target.classList.contains("color-Choice")) {
    const allLi = colorsSmall.querySelectorAll('li');
        allLi.forEach(li => {
            li.classList.remove('selected');
        });
    event.target.classList.add('selected');
  }
});
