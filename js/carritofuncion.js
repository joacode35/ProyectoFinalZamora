let addCarrito = (producto) => {
  Toastify({
    text: "Producto agregado",
    duration: 1500,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #26c7eb, #d92adf)",
    },
    onClick: function () {},
  }).showToast();
  let almacenar = JSON.parse(localStorage.getItem("items"));
  console.log(almacenar);
  let numeroCont = 0;
  if (!almacenar) {
    let productoNuevo = renovarAlmacenamiento(producto);
    localStorage.setItem("items", JSON.stringify([productoNuevo]));
    numeroCont = 1;
  } else {
    let cantidadProducto = almacenar.findIndex(
      (visualArt) => visualArt.id === producto.id
    );
    console.log(cantidadProducto);
    let renovarProducto = almacenar;
    if (cantidadProducto === -1) {
      renovarProducto.push(renovarAlmacenamiento(producto));
      numeroCont = 1;
    } else {
      renovarProducto[cantidadProducto].cantidad++;
      numeroCont = renovarProducto[cantidadProducto].cantidad;
    }
    localStorage.setItem("items", JSON.stringify(renovarProducto));
  }
  renovarNumeroCarrito();
  return numeroCont;
};

let delCarrito = (producto) => {
  let almacenar = JSON.parse(localStorage.getItem("items"));
  let cantidadProducto = almacenar.findIndex(
    (visualArt) => visualArt.id === producto.id
  );
  if (almacenar[cantidadProducto].cantidad === 1) {
    almacenar.splice(cantidadProducto, 1);
  } else {
    almacenar[cantidadProducto].cantidad--;
  }
  localStorage.setItem("items", JSON.stringify(almacenar));
  renovarNumeroCarrito();
};

let renovarAlmacenamiento = (producto) => {
  let productoNuevo = producto;
  productoNuevo.cantidad = 1;
  return productoNuevo;
};

let contadorCarritoElement = document.getElementById("contadorCarrito");
let renovarNumeroCarrito = () => {
  let almacenar = JSON.parse(localStorage.getItem("items"));
  let contador = almacenar.reduce(
    (acum, current) => acum + current.cantidad,
    0
  );
  contadorCarritoElement.innerText = contador;
};
renovarNumeroCarrito();
