const productos = "https://dtony-404.github.io/API-s/MarketPlace/API.JSON"
const main = document.getElementById('main');
const mainDos = document.getElementById('mainDos')
const carrito = []
let table = document.getElementById('table');
let pie = document.getElementById('pie');
const items = document.getElementById('items');
const fragment = document.createDocumentFragment();

async function electro(direccion) {
    try {
        let pc = await fetch(direccion);
        let portatil = await pc.json();
        exportPro(portatil.Mac);
    } catch (error) {
        console.log(error);
    }
}
electro(productos)

function exportPro(cont) {
    cont.map((contenido) => {
        const { id, product, image, price, Description } = contenido;
        let plantilla = document.createElement('div');
        plantilla.classList.add('newProduct');
        plantilla.innerHTML = `<div class="card m-5 bg-light text-dark" style="width: 17rem;">
                                <div class="card-body  text-alig-center ">
                                <img src="${image}" class="card-img-top" height="250px" alt="...">
                                <h5 class="card-title">${product}</h5>
                                <p class="card-text">${price}</p>
                                <div style="display:none;">
                                <h2>${Description}</h2>
                                </div>
                                <a  class="btn btn-primary" data-id="${id}">Añadir</a>
                                <a  class="btn btn-success" data-id="${id}">Descripcion</a>
                                </div>
                                </div>`
        main.appendChild(plantilla);
    });
}


async function samsung(otros) {
    try {
        let phone = await fetch(otros);
        let port = await phone.json();
        exportSams(port.Sansung);
    } catch (error) {
        console.log(error);
    }
}
samsung(productos)

let telefonosSam = []

function exportSams(otros) {
    otros.map((telefonos) => {
        const { id, product, image, price, Description } = telefonos;
        let adicional = document.createElement('div');
        adicional.classList.add('newProduct');
        adicional.innerHTML = `<div class="card m-5 bg-light text-dark" style="width: 17rem;">
                                <div class="card-body  text-alig-center ">
                                <img src="${image}" class="card-img-top" height="250px"  alt="...">
                                <h5 class="card-title">${product}</h5>
                                <p class="card-text">${price}</p>
                                <div style="display:none;">
                                <h2>${Description}</h2>
                                </div>
                                <a  class="btn btn-primary" data-id="${id}">Añadir</a>
                                <a  class="btn btn-success" data-id="${id}"  >Descripcion</a>
                                </div>
                                </div>`
        mainDos.appendChild(adicional);
        telefonosSam.push(telefonos)

    });
}

document.addEventListener('click', e => {

    if (e.target.classList.contains('btn-primary')) {
        sacarProduct(e.target.parentElement)
    } e.stopPropagation();
})

const sacarProduct = object => {

    carrito.push({
        id: object.querySelector('.btn-primary').dataset.id,
        product: object.querySelector('h5').textContent,
        price: object.querySelector('p').textContent,
        description: object.querySelector('h2').textContent,
        cantidad: 1
    })

    // if (carrito.hasOwnProperty(carrito.id)) {
    //     carrito.cantidad = carrito[carrito.id].cantidad + 1;
    // }
    // carrito[carrito.id] = { ...carrito }

    localStorage.setItem("producto", JSON.stringify(carrito));
    listarCarrito();
}

const listarCarrito = () => {

    let sacarLocal = JSON.parse(localStorage.getItem("producto"));
    document.getElementById("table").innerHTML = ''

    sacarLocal.forEach(perfilUno => {

        const { id, product, price, cantidad } = perfilUno;

        document.getElementById("table").innerHTML += ' <td scope="row">' + id + '</td><td>' + product + '</td><td>' + price + '</td><td>' + cantidad + '</td>';


        let pesos = Object.values(sacarLocal).reduce((acc, { cantidad }) => acc + cantidad, 0)
        let pagar = Object.values(sacarLocal).reduce((acc, { cantidad, price }) => acc + cantidad * Number(price), 0)


        document.getElementById("pie").innerHTML = ' <td scope="row" class="m-4 fs-3"> <a  class="btn btn-warning" onclick="pagar(pagar)">Pagar</a> <a  class="btn btn-danger" onclick="limpiar()">Limpiar Carrito</a></td><td>' + "Total a Pagar:" + '</td><td>' + pagar + '</td><td>' + pesos + '</td>';

        document.getElementById('numCar').innerHTML = pesos;

        //   document.getElementById("pie").innerHTML = ' <td scope="row" class="m-4 fs-3"> </td><td>' + "Relleno los campos" + '</td>'


    })
}

function limpiar(){
    document.getElementById('table').innerHTML = "";
    document.getElementById('pie').innerHTML = "";

}

function pagar(pagar) {
    swal.fire({
        title: 'Informacion de pago',
        text: pagar,
        icon: 'question',
        background: `rgba(255, 87, 51 )`,
        grow: `column`,
        confirmButtonText: `Pagar`,
        html:
            '<input id="swal-input2" class="swal2-input" placeholder="Nombre Completo" required >' + '<input id="swal-input1" class="swal2-input" placeholder="Email@email.com" type="email" >' + '<input id="swal-input3" class="swal2-input" type="number" placeholder="Numero De Tarjeta" required >' +
            '<input id="swal-input4" class="swal2-input" type="number" placeholder="MM/AA" required >' + '<input id="swal-input5" class="swal2-input" type="number" placeholder="CVV" required >',
        focusConfirm: false,
        showCloseButton: true,
        preConfirm: () => {
            swal.fire({
                title: 'GRACIAS POR SU COMPRA',
                background: `rgba(255, 87, 51 )`,
            })

        }
    })

}

let desc = {}

document.addEventListener('click', e => {

    if (e.target.classList.contains('btn-success')) {
        pidiendoD(e.target.parentElement)
    } e.stopPropagation();
})

const pidiendoD = object => {

    let pulmon = {
        id: object.querySelector('.btn-success').dataset.id,
        product: object.querySelector('h5').textContent,
        price: object.querySelector('p').textContent,
        description: object.querySelector('h2').textContent,
        image: object.querySelector('img').getAttribute('src'),
        cantidad: 1
    }
    console.log(pulmon.image);

    localStorage.setItem("Descripcion", JSON.stringify(desc));
    llamarDescrip()
    hacerSwal(pulmon)
}

function hacerSwal(pulmon) {

    swal.fire({
        title: pulmon.product,
        showCloseButton: true,
        text: pulmon.description,
        imageUrl: pulmon.image,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showConfirmButton: false,
        html: ' <p>' + pulmon.description + '</p><h6>' + pulmon.price + '</h6> <br> <a class="btn btn-primary" data-id="${id}">Añadir</a>'

    })

}

function llamarDescrip() {
    let espejo = JSON.parse(localStorage.getItem("Descipcion"))
}
