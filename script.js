// //Usuarios 
let usuario = document.getElementById("usuario");
let contrasenia = document.getElementById("contrasenia");
let iniciarSesion = document.getElementById("iniciar");

// Comprobar si hay datos guardados en el almacenamiento local
if(localStorage.getItem("usuario") && localStorage.getItem("contrasenia")) {
  // Si hay datos, cargarlos en los campos de entrada correspondientes
  usuario.value = JSON.parse(localStorage.getItem("usuario"));
  contrasenia.value = JSON.parse(localStorage.getItem("contrasenia"));
}

iniciarSesion.addEventListener("click", () => {
  if (usuario.value == usuarioBD && contrasenia.value == contraseniaBD) {
    alert("bienvenido");

    // Guardar los datos del usuario en el almacenamiento local como JSON
    localStorage.setItem("usuario", JSON.stringify(usuario.value));
    localStorage.setItem("contrasenia", JSON.stringify(contrasenia.value));
  } else {
    alert("datos incorrectos");
  }
});

//Usuario ya cargado y posteriormente almacenado en la base de datos local
let usuarioBD = "juani"
let contraseniaBD = "juani123"

iniciarSesion.addEventListener("click", () => {
    if (usuario.value == usuarioBD && contrasenia.value == contraseniaBD) {
        alert("bienvenido")
    } else {
        alert("datos incorrectos")
    }
})


//productos
let productos = [
    {
        id: 1,
        nombre: "cera para autos",
        categoria: "cosmetica", 
        precio: 500,
        img: "https://www.revigal.com.ar/wp-content/uploads/2015/04/CERA-AUTOBRILLO-800X800-1.jpg",
        stock: 15

    },
    {
        id: 2, 
        nombre: "shampoo para autos", 
        categoria: "cosmetica", 
        precio: 800,
        img: "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Lava-Autos-Espuma-Actibril-Color-x-5-L.jpg",
        stock: 20

    },
    {
        id: 3, 
        nombre: "máquina de lavado de autos", 
        categoria: "maquinas", 
        precio: 150000,
        img: "https://m.media-amazon.com/images/I/71b+ag+IH9L.jpg",
        stock: 3
    },
    {
        id: 4, 
        nombre: "lanza para máquina de lavado", 
        categoria: "maquinas", 
        precio: 10000,
        img: "https://http2.mlstatic.com/D_NQ_NP_903376-MLA31022209149_062019-O.webp",
        stock: 7




    },
    {
        id: 5, 
        nombre: "máquina de espuma", 
        categoria: "maquinas", 
        precio: 50000,
        img: "https://m.media-amazon.com/images/I/81ZjC95iRHL._AC_SL1500_.jpg",
        stock: 4




    },
    {
        id: 6, 
        nombre: "escobilla", 
        categoria: "autopartes", 
        precio: 3000,
        img: "https://www.boutiqueautomovil.com.ar/wp-content/uploads/2017/01/ESCOBILLAS-BOSCH-AEROFIT.jpg",
        stock: 25

    },
    {
        id: 7, 
        nombre: "cubre volante", 
        categoria: "autopartes", 
        precio: 2500,
        img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/621/239/products/2021_tn-qkl_ao90011-17c84dd810aecbeaa316170478342304-640-0.jpg",
        stock: 4


    },
];

let contenedorProductos = document.getElementById("contenedorProductos")
renderizarTarjetas(productos)

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrarPorNombre)

let inputs = document.getElementsByClassName("input")
for (const input of inputs) {
  input.addEventListener("click", filtrarPorCategoria)
}

//Filtrar por categoria
function filtrarPorCategoria (e) {
  let filtros = []
  for (const input of inputs) {
    if (input.checked) {
      filtros.push(input.id)
    }
  }
  let arrayFiltrado = productos.filter(producto => {
    if (filtros.includes(producto.categoria)) {
      return producto
    }
  })
  renderizarTarjetas(arrayFiltrado.length > 0 ? arrayFiltrado : productos)
}

//Filtro por nombre
function filtrarPorNombre() {
  let arrayFiltrado = productos.filter(producto => producto.nombre.includes(buscador.value))
  renderizarTarjetas(arrayFiltrado)
}


function renderizarTarjetas(arrayDeProductos) {
    contenedorProductos.innerHTML = ""
    arrayDeProductos.forEach(({ categoria, nombre, precio, img, stock}) => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjetaProducto";
        tarjeta.innerHTML = `
        <h1>${nombre}</h1>
        <p>Categoría: ${categoria}</p>
        <p>Precio: ${precio}</p>
        <p>Stock: ${stock}</p>
        <div class="imagen" style="background-image: url(${img})"></div>
        <button id="comprar">COMPRAR</button>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
}

let carrito = [];
let total = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
  if (producto.stock > 0) { // Agregar el producto solo si hay stock disponible
    carrito.push(producto);
    total += producto.precio;
    producto.stock--;
    alert(`El producto ${producto.nombre} ha sido agregado al carrito.`);
  } else {
    alert(`Lo siento, el producto ${producto.nombre} está agotado.`);
  }
}

// Función para renderizar el carrito de compras
function renderizarCarrito() {
  let carritoHTML = document.getElementById("carrito");
  carritoHTML.innerHTML = "";
  carrito.forEach(({ nombre, precio }) => {
    let itemCarrito = document.createElement("div");
    itemCarrito.innerHTML = `${nombre} - $${precio}`;
    carritoHTML.appendChild(itemCarrito);
  });
  let totalHTML = document.getElementById("total");
  totalHTML.innerHTML = `${total}`;
}



// Agregar evento de click a los botones de comprar
let botonesComprar = document.getElementById("comprar");
for (let i = 0; i < botonesComprar; i++) {
  botonesComprar[i].addEventListener("click", () => {
    agregarAlCarrito(productos[i]);
    renderizarCarrito();
  });
}

// Renderizar las tarjetas de productos
function renderizarTarjetas(arrayDeProductos) {
  contenedorProductos.innerHTML = "";
  arrayDeProductos.forEach(({ categoria, nombre, precio, img, stock }, i) => {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaProducto";
    tarjeta.innerHTML = `
        <h1>${nombre}</h1>
        <p>Categoría: ${categoria}</p>
        <p>Precio: ${precio}</p>
        <p>Stock: ${stock}</p>
        <div class="imagen" style="background-image: url(${img})"></div>
        <button class="comprar">COMPRAR</button>
        `;
    if (stock === 0) {
      tarjeta.classList.add("sinStock");
    } else {
      tarjeta.addEventListener("click", () => {
        agregarAlCarrito(productos[i]);
        renderizarCarrito();
      });
    }
    contenedorProductos.appendChild(tarjeta);
  });
}

//finalizar compra
let pagarAhora = document.getElementById("finalizarCompra")
pagarAhora.addEventListener("click", vaciarCarrito)

function vaciarCarrito(e){
  //vaciar el carrito
  carrito = []
  // Actualizar el número de elementos en el carrito
  // Mostrar una alerta
  alert("¡Gracias por su compra!");
}
document.getElementById("finalizar-compra").addEventListener("click", function() {
  vaciarCarrito();
});
