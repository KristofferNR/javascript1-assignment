const searchBtn = document.getElementById("search-btn")
const closeBtn = document.getElementById("close-btn")
const searchbar = document.getElementById("searchbar")
const searchModal = document.getElementById("search-modal")

function showModal () {
    searchModal.classList.toggle("show")
}

function closeModal () {
    searchModal.classList.remove("show")
}

searchBtn.addEventListener("click", () => {
    showModal()
    searchbar.focus()
})

closeBtn.addEventListener("click", () => {
    closeModal()
})


window.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.key === "Escape") {
        if(closeModal()) {
            showModal()
        }
    }
})


