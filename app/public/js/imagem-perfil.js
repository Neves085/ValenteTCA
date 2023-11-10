const fotoPerfilInput = document.getElementById("foto-perfil-input");
const fotoPerfil = document.getElementById("foto-perfil");
const imgPreview = document.getElementById("foto-perfil-preview");

fotoPerfilInput.addEventListener("change", (e) => {
    const files = e.target.files;

    if (e.target.files.length > 0) {
        const imgSrc = URL.createObjectURL(files[0]);

        imgPreview.src = imgSrc;
    }
})