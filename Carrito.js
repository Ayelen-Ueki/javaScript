$(`#finCompra`).on("click", calculototal);

$(`#finCompra`).on("click", compraFinalizada);


function guardarLocal(nombre, array) {
    localStorage.setItem(nombre, JSON.stringify(array))
}
mostrarCarrito()
mostrar()

// Para agregar los productos al carrito con DOM
function mostrarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        let elementosCarrito = document.createElement("ul")
        elementosCarrito.id = "listaCarrito"
        for (let producto of carritoGuardado) {
            let li = document.createElement("li")
            li.innerHTML = `<h3 id=${producto.id}> Producto: ${producto.nombre}</h3>
        <b> Precio: $${producto.precio * producto.cantidad} </b>
        <b> Cantidad: ${producto.cantidad} </b>
        <button id= ${producto.id} class="eliminar">🗑️</button>`
            elementosCarrito.appendChild(li)
        }
        let productosAgregados = document.getElementById('productosEnCarrito')
        productosAgregados.innerHTML = ""
        productosAgregados.appendChild(elementosCarrito)
        $(`.eliminar`).on("click", eliminarProducto);
    }
}

// Para eliminar productos del carrito
function eliminarProducto(e) {
    let button = e.target
    let carrito = JSON.parse(localStorage.getItem("Carrito"))
    let eliminado = carrito.find(producto => producto.id == button.id)
    if (eliminado.cantidad == 1) {
        carrito = carrito.filter(producto => producto.id != button.id)
    }
    else {
        eliminado.cantidad = eliminado.cantidad - 1
    }
    guardarLocal("Carrito", carrito)
    Swal.fire({
        icon: 'success',
        title: 'Eliminado!',
        text: 'Tu producto ha sido eliminado con éxito',
        footer: '<a href="">Ver carrito</a>',
    })
    mostrarCarrito()
}

// Para calular el total de la compra (Sin envío)
function calculototal() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        if (carritoGuardado.length >= 1) {
            let suma = 0;
            for (let producto of carritoGuardado) {
                suma = suma + (producto.precio * producto.cantidad)
            }
            return (suma)
        }
    }
}

// Para finalizar la compra y hacer el cálculo del total (con envío)
function compraFinalizada(e) {
    e.preventDefault()
    if (!calculototal()) {
        Swal.fire({
            icon: 'error',
            title: 'Ojo!!',
            text: `Todavía no hay nada en el carrito`,
        })
    }
    else {
        $("#listaCarrito").remove();
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: `Compra en proceso!`,
            input: 'number',
            inputLabel: 'Ingresa tu código postal para saber el precio final',
        })
        $(".swal2-confirm").click(mostrarPrecioEnvio)
    }
}

$("#envio").on("click", calculoEnvio);

// Para pedir el código postal para el cálculo del envío
function calculoEnvio() {
    Swal.fire({
        title: 'Envío',
        input: 'number',
        inputLabel: 'Código Postal',
        focusConfirm: false,
    })
    $(".swal2-confirm").click(mostrarEnvio);
}

// Para calcular el envío
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

// Para mostrar el total + el envío
function mostrarPrecioEnvio() {
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
        text: 'El total de tu compra con envío es de: $ ' + (calculototal() + envio),
        focusConfirm: false,
    })
    localStorage.clear()
}

// Para ocultar y mostrar el carrito
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
