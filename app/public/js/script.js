var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide:'true',
  fade:'true',
  grabCursor:'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets:true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
    0:{
      slidesPerView: 1,
    },
    520:{
      slidesPerView: 2,
    },
    950:{
      slidesPerView: 3,
    },
  },
});

const button = document.querySelector(".botao-fot")
const modal = document.querySelector("dialog", "modal-roda")
const buttonClose = document.querySelector("dialog button")
button.onclick = function(){
  modal.showModal()
}

buttonClose.onclick = function (){
  modal.close()
}

function toggleLike(){
  var button = document.getElementById("curtido");
  button.classList.toggle("liked");
}
