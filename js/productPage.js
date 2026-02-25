const sizeBtn = document.getElementById("size-dropdown");
const infoBtn = document.getElementById("infoBtn-small");
const infopopup = document.getElementById("information");

infoBtn.addEventListener("click", () => {
  
  if (infopopup.style.display === "block"){
    infopopup.style.display = "none";
  }else{
    infopopup.style.display = "block";
  }
});
