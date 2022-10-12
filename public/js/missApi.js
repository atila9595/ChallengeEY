AOS.init();
var url = 'http://127.0.0.1:8081/user/json_miss'

//var missoes = []

var missoeslist = async() => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        show(data)
    } catch (error) {
        console.error(error)
    }

}


function show(missoes) {

    var rota = 'user/'
    var div = document.getElementById('cont'); // The parent <div>.
    div.innerHTML = '';

    for (i = 0; i <= missoes.length - 1; i++) {

        // Create two <div> elements, one for the name and the other to show the image.
        rota = rota + missoes[i].id

        var divRight = document.createElement('a');
        divRight.href = rota
        rota = 'user/'

        var img = document.createElement('div'); // Create an <img> element.
        img.src = produtos[i].imagem; // The image source from JSON array.
        img.className = "col-xl-12 col-md-12"
        img.da
        img.name = produtos[i].id








        var img = document.createElement('img'); // Create an <img> element.
        img.src = produtos[i].imagem; // The image source from JSON array.
        img.className = "imgProdutoHome"
        img.name = produtos[i].id


        var divRight = document.createElement('a');
        divRight.href = rota
        rota = 'home/'
        divRight.className = 'aproduto'

        divRight.appendChild(img);
        // Add the child DIVs to parent DIV.

        div.appendChild(divRight);

        // Note: Instead of <div>, you can also create a dynamic <table> to show the images. 
        // Here's an example ... https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm 
    }

}

console.log(miss)