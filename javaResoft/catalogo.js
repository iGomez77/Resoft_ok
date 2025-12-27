// catalogo.js - VERSIÓN MEJORADA
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("catalogoProductos");
  if (!contenedor) return;

  // Obtener parámetros URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get('categoria');
  const busqueda = urlParams.get('busqueda');

  // Filtrar productos
  let productosFiltrados = productos;
  
  if (categoria) {
    productosFiltrados = productos.filter(p => p.categoria === categoria);
    document.title = `${categoria} - Resoft Store`;
  }
  
  if (busqueda) {
    productosFiltrados = productosFiltrados.filter(p => 
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // Mostrar productos
  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>No se encontraron productos</h3>
        <a href="catalogo.html" class="btn btn-primary mt-3">Ver todos</a>
      </div>
    `;
  } else {
    contenedor.innerHTML = productosFiltrados.map(producto => `
      <div class="col-md-4 col-lg-3 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${producto.imagen}" 
               class="card-img-top" 
               alt="${producto.nombre}"
               style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fs-6">${producto.nombre}</h5>
            <div class="mt-auto">
              <p class="card-text fw-bold text-primary mb-2">$${producto.precio.toLocaleString()}</p>
              <small class="text-muted d-block mb-2">${producto.categoria}</small>
              <button class="btn btn-primary w-100 btn-agregar-carrito" 
                      data-id="${producto.id}">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Agregar eventos a los botones
  document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
    button.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      agregarAlCarrito(id);
    });
  });
});

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen || "../img/default.png",
      categoria: producto.categoria,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  console.log("Carrito guardado:", carrito);

  notificar(`🛒 ${producto.nombre} agregado al carrito`);
}


function notificar(mensaje) {
  const toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #0d6efd;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    z-index: 9999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}
