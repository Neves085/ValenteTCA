const fotoPerfilInput = document.getElementById("foto-perfil-input");
const fotoPerfil = document.getElementById("foto-perfil");

fotoPerfilInput.addEventListener("change", (e) => {
    const files = e.target.files;

    if (e.target.files.length > 0) {
        fotoPerfil.innerHTML = "";
        const imgSrc = URL.createObjectURL(files[0]);
        const imgPreview = document.createElement('img');

        imgPreview.src = imgSrc;
        fotoPerfil.appendChild(imgPreview);
    }
})