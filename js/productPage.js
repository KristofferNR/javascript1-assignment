const sizeBtn = document.getElementById("size-dropdown");
const infoBtn = document.getElementById("infoBtn-small");
const infoBtnBig = document.getElementById("infoBtn")
const infopopup = document.getElementById("information-small");
const infopopupBig = document.getElementById("information");

infoBtn.addEventListener("click", () => {
  
  if (infopopup.style.display === "block"){
    infopopup.style.display = "none";
  }else{
    infopopup.style.display = "block";
  }
});
infoBtnBig.addEventListener("click", () => {
  
  if (infopopupBig.style.display === "block"){
    infopopupBig.style.display = "none";
  }else{
    infopopupBig.style.display = "block";
  }
});


