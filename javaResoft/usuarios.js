document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Datos de usuarios hardcodeados (para prueba estática)
    const usuarios = [
      {
        email: "admin@resoftstore.com",
        password: "admin123",
        nombre: "Administrador",
        rol: "admin"
      },
      {
        email: "usuario@resoftstore.com",
        password: "123456",
        nombre: "Cliente",
        rol: "usuario"
      }
    ];

    // Buscar usuario
    const usuarioEncontrado = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
      alert("Credenciales incorrectas");
      return;
    }

    // Guardar sesión en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
    
    // Mostrar mensaje de éxito
    alert(`¡Bienvenido ${usuarioEncontrado.nombre}!`);
    
    // Redirigir al dashboard (página estática para GitHub Pages)
    window.location.href = "./dashboard.html";
  });
});

