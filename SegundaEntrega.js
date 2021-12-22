const antojos = [];

$.getJSON(`../antojos.json`, function (antojate) {
    antojate.forEach(productos => antojos.push(productos))
})

$(`.botonCompra`).on("click", agregarCarrito);

$(`.botonCompra`).on("click", calculototal);

$("#finCompra").on("click", compraFinalizada);

function guardarLocal(nombre, array) {
    localStorage.setItem(nombre, JSON.stringify(array))
}

function agregarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado && carritoGuardado.length) {
        let botonId = this.id
        let prodEncontrado = carritoGuardado.find(p => botonId === p.nombre)
        if (prodEncontrado) {
            prodEncontrado.cantidad += 1
            guardarLocal("Carrito", carritoGuardado)
            Swal.fire({
                icon: 'success',
                title: 'Gracias!',
                text: 'Has agregado un nuevo item al carrrito',
                footer: '<a href="">Ver carrito</a>',
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Gracias!',
                text: 'Has agregado un nuevo item al carrrito',
                footer: '<a href="">Ver carrito</a>',

            })
            let prodEncontrado = antojos.find(p => botonId === p.nombre)
            let nuevo = prodEncontrado
            nuevo.cantidad = 1
            carritoGuardado.push(nuevo)
            guardarLocal("Carrito", carritoGuardado)
        }
    }
    else {
        let carrito = []
        let botonId = this.id
        let prodEncontrado = antojos.find(p => botonId === p.nombre)
        let nuevo = prodEncontrado
        nuevo.cantidad = 1
        carrito.push(nuevo)
        guardarLocal("Carrito", carrito)
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: 'Has agregado un nuevo item al carrrito',
            footer: '<a href="">Ver carrito</a>',
        })
    }
    mostrarCarrito()
    mostrar()
}
mostrarCarrito()
mostrar()

function mostrarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        let elementosCarrito = document.createElement("ul")
        elementosCarrito.id = "listaCarrito"
        for (let producto of carritoGuardado) {
            let li = document.createElement("li")
            li.innerHTML = `<h3 id=${producto.id}> Producto: ${producto.nombre}</h3>
        <b> Precio: $${producto.precio} </b>
        <b> Cantidad: ${producto.cantidad} </b>
        <button id= ${producto.id} class="eliminar">🗑️</button>`
            elementosCarrito.appendChild(li)
        }
        let productosAgregados = document.getElementById('productosEnCarrito')
        productosAgregados.innerHTML = ""
        productosAgregados.appendChild(elementosCarrito)
        $(`.eliminar`).click(eliminarProducto)
    }
}

$(`.eliminar`).on("click", eliminarProducto);

function eliminarProducto(e) {
    let button = e.target
    let carrito = JSON.parse(localStorage.getItem("Carrito"))
    let eliminado = carrito.find(producto => producto.id = button.id)
    if (eliminado.cantidad <= 1) {
        carrito = carrito.filter(producto => producto.id != button.id)
    }
    else {
        eliminado.cantidad -= 1
    }
    carrito.push(eliminado)
    guardarLocal("Carrito", carrito)
    Swal.fire({
        icon: 'success',
        title: 'Eliminado!',
        text: 'Tu producto ha sido eliminado con éxito',
        footer: '<a href="">Ver carrito</a>',
    })
    mostrarCarrito()
}

function calculototal() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        if (carritoGuardado.length >= 1) {
            let compra = carritoGuardado.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);
            return compra
        }
    }
}



function compraFinalizada(e) {
    e.preventDefault()
    if (!calculototal()) {
        Swal.fire({
            icon: 'error',
            title: 'Ojo!!',
            text: `Todavía no hay nada en el carrito`,
            footer: '<a href="">Ver carrito</a>',
        })
    }
    else {
        $("#listaCarrito").remove();
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: `Compra finalizada, el precio total es de: ${calculototal()}`,
            footer: '<a href="">Ver carrito</a>',
        })
        localStorage.clear()
    }
}


$("#envio").on("click", calculoEnvio);


function calculoEnvio() {
    Swal.fire({
        title: 'Envío',
        input: 'number',
        inputLabel: 'Código Postal',
        focusConfirm: false,
    })
    $(".swal2-confirm").click(mostrarEnvio);
}

function mostrarEnvio() {
    let cp = Swal.getInput().value

    let codigoPostal = parseInt(Swal.getInput().value);

    if (codigoPostal === 1625) {
        envio = 0;
    }

    else if ((codigoPostal >= 1000) && (codigoPostal <= 1499)) {
        envio = 500;
    }

    else if ((codigoPostal >= 1500) || (codigoPostal <= 999)) {
        envio = 600;
    }

    else {
        envio = "Inválido";
    }

    Swal.fire({
        title: 'Envío',
        text: 'Tu código postal es: ' + cp + ' Y tu costo estimado de envío es de $ ' + envio,
        focusConfirm: false,
    })
}


function mostrar() {
    let flag = true;
    $("#mostrar").click(() => {
        if (flag) {
            $("#listaCarrito").slideUp("slow")
            $("#mostrar").html("Mostrar")
        }
        else {
            $("#listaCarrito").slideDown("slow")
            $("#mostrar").html("Ocultar")
        }
        flag = !flag;
    })
}




