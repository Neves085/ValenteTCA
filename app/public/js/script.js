const sobreNosButton = document.querySelector(".botao-fot")
const sobreNosModal = document.querySelector("dialog", "modal-roda")
const sobreNosCloseButton = document.querySelector("dialog button")
sobreNosButton.onclick = function(){
  sobreNosModal.showModal()
}

sobreNosCloseButton.onclick = function (){
  sobreNosModal.close()
}

const menuButton = document.querySelector("[data-menu]");
const menuContainer = document.querySelector("[data-menu-mobile-container]");

menuButton.addEventListener("click", () => {
    menuContainer.classList.toggle("ativo");
})