// Script específico para la página inicial
document.addEventListener("DOMContentLoaded", () => {
  console.log("🌐 Página inicial de Resoft Store cargada");

  // Cargar productos destacados
  cargarProductosDestacados();

  // Configurar filtros
  configurarFiltros();

  // Configurar navegación por categorías
  configurarNavegacionCategorias();
});

function cargarProductosDestacados() {
  const container = document.getElementById("productosContainer");
  if (!container) return;

  // Tomar 8 productos como destacados
  const destacados = productos.slice(0, 8);

  container.innerHTML = destacados
    .map(
      (producto) => `
                <div class="producto-card" data-categoria="${
                  producto.categoria
                }">
                    <div class="producto-imagen">
                        <img src="${producto.imagen}" alt="${producto.nombre}" 
                             onerror="this.src='../img/placeholder-shoe.jpg'">
                        <div class="producto-badges">
                            <span class="badge-categoria">${
                              producto.categoria
                            }</span>
                        </div>
                    </div>
                    <div class="producto-info">
                        <h3 class="producto-nombre">${producto.nombre}</h3>
                        <div class="producto-precio">
                            $${producto.precio.toLocaleString("es-CO")}
                        </div>
                        <div class="producto-actions">
                            <button class="btn btn-outline btn-small" onclick="verDetalle(${
                              producto.id
                            })">
                                <i class="fas fa-eye"></i> Ver
                            </button>
                            <button class="btn btn-primary btn-small" onclick="solicitarLogin(${
                              producto.id
                            })">
                                <i class="fas fa-shopping-cart"></i> Comprar
                            </button>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");
}

function configurarFiltros() {
  const filtros = document.querySelectorAll(".btn-filter");
  const productos = document.querySelectorAll(".producto-card");

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      // Remover clase activa de todos los filtros
      filtros.forEach((f) => f.classList.remove("active"));
      // Agregar clase activa al filtro clickeado
      filtro.classList.add("active");

      const categoria = filtro.dataset.filter;

      // Mostrar/ocultar productos según el filtro
      productos.forEach((producto) => {
        if (categoria === "todos" || producto.dataset.categoria === categoria) {
          producto.style.display = "block";
        } else {
          producto.style.display = "none";
        }
      });
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {

  const btnAccesibilidad = document.getElementById("btn-accesibilidad");
  const menu = document.getElementById("opciones-accesibilidad");
  const btnContraste = document.getElementById("contraste");
  const btnAumentar = document.getElementById("aumentar");
  const btnRestablecer = document.getElementById("restablecer");

  // Mostrar / ocultar menú
  btnAccesibilidad.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("oculto");
  });

  // Alto contraste
  btnContraste.addEventListener("click", () => {
    document.body.classList.toggle("contraste");
    localStorage.setItem(
      "contraste",
      document.body.classList.contains("contraste")
    );
  });

  // Aumentar texto
  btnAumentar.addEventListener("click", () => {
    document.body.classList.toggle("texto-grande");
    localStorage.setItem(
      "texto",
      document.body.classList.contains("texto-grande")
    );
  });

  // Restablecer accesibilidad
  btnRestablecer.addEventListener("click", () => {
    document.body.classList.remove("contraste", "texto-grande");
    localStorage.removeItem("contraste");
    localStorage.removeItem("texto");
  });

  // Restaurar preferencias al cargar
  if (localStorage.getItem("contraste") === "true") {
    document.body.classList.add("contraste");
  }

  if (localStorage.getItem("texto") === "true") {
    document.body.classList.add("texto-grande");
  }

});




function configurarNavegacionCategorias() {
  // Enlaces de categorías en el menú
  const linksCategorias = document.querySelectorAll("[data-categoria]");
  const filtros = document.querySelectorAll(".btn-filter");

  linksCategorias.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const categoria = link.dataset.categoria;

      // Activar el filtro correspondiente
      filtros.forEach((filtro) => {
        if (filtro.dataset.filter === categoria) {
          filtro.click();
        }
      });

      // Desplazar a la sección de productos
      document.getElementById("destacados").scrollIntoView({
        behavior: "smooth",
      });

      // Cerrar menú si está abierto
      const menu = document.getElementById("menuLateral");
      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar");
        menu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
      }
    });
  });
}

function verDetalle(id) {
  alert(`Para ver los detalles del producto #${id}, por favor inicia sesión.`);
  window.location.href = "usuarios.html";
}

function solicitarLogin(id) {
  alert(
    `Para agregar el producto #${id} al carrito, necesitas iniciar sesión.`
  );
  window.location.href = "usuarios.html";
}

// Función para buscar productos
function buscarProducto() {
  const input = document.getElementById("inputBusqueda");
  if (input && input.value.trim()) {
    const termino = input.value.toLowerCase();
    const productosEncontrados = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino)
    );

    if (productosEncontrados.length > 0) {
      // Mostrar resultados en la sección de productos
      document
        .getElementById("destacados")
        .scrollIntoView({ behavior: "smooth" });

      // Filtrar productos mostrados
      const todosProductos = document.querySelectorAll(".producto-card");
      todosProductos.forEach((producto) => {
        const nombre = producto
          .querySelector(".producto-nombre")
          .textContent.toLowerCase();
        if (nombre.includes(termino)) {
          producto.style.display = "block";
        } else {
          producto.style.display = "none";
        }
      });

      // Activar filtro "todos"
      document.querySelector('[data-filter="todos"]').click();
    } else {
      alert(`No se encontraron productos para "${input.value}"`);
    }

    cerrarModal();
  }
}

function filtrarCategoria(categorias) {
    categoriaActual = categorias;
    paginaActual = 1;
    actualizarFiltros(categorias);
    renderizarProductos();
}
