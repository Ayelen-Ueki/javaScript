const antojos = 
[
    {id: 1, nombre: "alfajorcitos", precio: 500},
    {id: 2, nombre: "cookies", precio: 300},
]
let carrito = [];

let botones =  document.getElementsByClassName ("botonCompra")

for (let boton of botones)
{
    boton.addEventListener ("click", agregarCarrito)
}

function agregarCarrito ()
{
    let botonId = this.id
    let prodEncontrado = antojos.find ( p => botonId === p.nombre)
    carrito.push (prodEncontrado)
    console.log(this.id)
    console.log(carrito)
}

let carritoStorage = (key, value) => {localStorage.setItem(key, value)}

carritoStorage ("Productos en el carrito", JSON.stringify(carrito))

// for (const producto of carrito)
// {
//     carritoStorage(producto.nombre, JSON.stringify(producto) )
// }

const productosGuardados = JSON.parse(localStorage.getItem ("Productos en el carrito"))

console.log(productosGuardados)

// let carritoRecuperado = []

// for (const objeto of productosGuardados)
// {
//     carritoRecuperado.push(new Compra (objeto))
// }


// class Compra
// {
//     constructor (obj)
//     {
//         this.id = obj.id();
//         this.nombre = obj.nombre();
//         this.precio = parseFloat(obj.precio);
//     }
// }









