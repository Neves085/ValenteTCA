const fotoCapaInput = document.getElementById("foto-capa-input");
const fotoCapa = document.getElementById("foto-capa");

fotoCapaInput.addEventListener("change", (e) => {
    const files = e.target.files;

    if (e.target.files.length > 0) {
        fotoCapa.innerHTML = "";
        const imgSrc = URL.createObjectURL(files[0]);
        const imgPreview = document.createElement('img');

        imgPreview.src = imgSrc;
        fotoCapa.appendChild(imgPreview);
    }
})