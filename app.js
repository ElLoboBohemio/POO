class Producto {
  constructor(nombre, precio, año){
    this.nombre = nombre;
    this.precio = precio;
    this.año = año;
  }
}

//Injecta HTML

class UI {
  anadirProducto(producto){
    const listaProductos = document.getElementById('product-list');
    const productoNuevo = document.createElement('div');

    productoNuevo.innerHTML = `
    <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Producto</strong>: ${producto.nombre} -
                    <strong>Precio</strong>: ${producto.precio} - 
                    <strong>Año</strong>: ${producto.año}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
    
    `

    listaProductos.appendChild(productoNuevo);
  }

  borrarProducto(elemento){
    if (elemento.name === "delete") {
      elemento.parentElement.parentElement.remove();
      this.mostrarMensaje("Producto Borrado", "success");
    }
  }

  mostrarMensaje(mensaje, claseCss){
    const div = document.createElement("div");
    div.className = `alert alert-${claseCss} mt-2`;
    div.appendChild(document.createTextNode(mensaje));

    // Show in The DOM
    const container = document.querySelector(".container");
    const app = document.getElementById("app");

    // Insert Message in the UI
    container.insertBefore(div, app);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);

  }

  reiniciarFormulario() {
    document.getElementById("product-form").reset();
  }
}


//Al darle submit al form ejecuta
document.getElementById('product-form').addEventListener('submit', (e)=> {
  e.preventDefault();



  const nombre = document.getElementById("name").value;
  const precio = document.getElementById("price").value;
  const año = document.getElementById("year").value;
  
  const ui = new UI();
  
  if (nombre === "" || precio === "" || año === ""){
    ui.mostrarMensaje(`Por favor llene todo el formulario`, `danger`)
  } else {
    const producto = new Producto(nombre, precio, año);



    ui.anadirProducto(producto);
    ui.mostrarMensaje(`Producto añadido correctamente`, `success`)
    ui.reiniciarFormulario();
  
  }

});

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.borrarProducto(e.target);
  e.preventDefault();
});

