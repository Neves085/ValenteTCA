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

function agendar() {
  const datePicker = document.getElementById("datePicker");
  const timeSlot = document.getElementById("timeSlot");
  const confirmation = document.getElementById("confirmation");

  const selectedDate = datePicker.value;
  const selectedTime = timeSlot.value;

  confirmation.innerHTML = `Agendamento confirmado para ${selectedDate} às ${selectedTime}.`;
}

const userList = document.getElementById('userList');

// Função para listar os usuários
async function getUsers() {
  userList.innerHTML = ''; // Limpa a lista
  const response = await fetch('/users');
  const users = await response.json();
  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      Nome: ${user.name}, Email: ${user.email}
      <button onclick="editUser(${user.id})">Editar</button>
      <button onclick="deleteUser(${user.id})">Excluir</button>
    `;
    userList.appendChild(listItem);
  });
}

// Função para deletar um usuário
async function deleteUser(userId) {
  await fetch(`/users/${userId}`, { method: 'DELETE' });
  getUsers(); // Atualiza a lista após a exclusão
}

// Função para editar um usuário
async function editUser(userId) {
  const newName = prompt('Novo nome:');
  const newEmail = prompt('Novo email:');
  if (newName && newEmail) {
    await fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, email: newEmail })
    });
    getUsers(); // Atualiza a lista após a edição
  }
}

// Chama a função para listar os usuários ao carregar a página
getUsers();

