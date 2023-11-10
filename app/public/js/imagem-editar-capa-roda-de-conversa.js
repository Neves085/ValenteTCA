const fotoCapaInput = document.getElementById("foto-capa-input");
const fotoCapa = document.getElementById("foto-capa");
const imgPreview = document.getElementById("foto-capa-preview");

fotoCapaInput.addEventListener("change", (e) => {
    const files = e.target.files;

    if (e.target.files.length > 0) {
        const imgSrc = URL.createObjectURL(files[0]);

        imgPreview.src = imgSrc;
    }
})