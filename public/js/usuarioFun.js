function troca() {
    document.getElementById("login").style.display = "none";
    document.getElementById("reset").style.display = "block";
}


var loadFile = function(event) {

    var receberArquivo = document.getElementById('file').files;

    if (receberArquivo.length > 0) {
        var carregarImage = receberArquivo[0];

        var lerArquivo = new FileReader();

        lerArquivo.onload = (arquivoCarregado) => {
            var imagemBase64 = arquivoCarregado.target.result;
            console.log(imagemBase64)
            var nomediv = document.getElementById('nomediv');
            nomediv.value = imagemBase64
            document.getElementById('nomediv').innerHTML = nomediv
        }

        lerArquivo.readAsDataURL(carregarImage);
    }

    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }

};