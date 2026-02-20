const searchBtn = document.getElementById("saerch-btn")
const closeBtn = document.getElementById("close-btn")
const searchbar = document.getElementById("searchbar")
const searchModal = document.getElementById("search-modal")

function showModal () {
    searchModal.classList.add("show")
}

function closeModal () {
    searchModal.classList.remove("show")
}

searchBtn.addEventListener("click", () => {
    showModal()
})

closeBtn.addEventListener("click", () => {
    closeModal()
})

