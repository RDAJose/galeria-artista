// Efecto lupa circular para las imágenes ampliadas del lightbox

window.addEventListener("DOMContentLoaded", function () {
  const imagenesZoom = document.querySelectorAll(".zoomable");

  const lupa = document.createElement("div");
  lupa.className = "lupa";
  document.body.appendChild(lupa);

  imagenesZoom.forEach(function (imagen) {
    imagen.addEventListener("mouseenter", mostrarLupa);
    imagen.addEventListener("mousemove", moverLupa);
    imagen.addEventListener("mouseleave", ocultarLupa);

    imagen.addEventListener("touchstart", mostrarLupa, { passive: false });
    imagen.addEventListener("touchmove", moverLupa, { passive: false });
    imagen.addEventListener("touchend", ocultarLupa);
    imagen.addEventListener("touchcancel", ocultarLupa);
  });

  function mostrarLupa(evento) {
    evento.preventDefault();
    lupa.classList.add("activa");
    moverLupa(evento);
  }

  function ocultarLupa() {
    lupa.classList.remove("activa");
  }

  function moverLupa(evento) {
    evento.preventDefault();

    const imagen = evento.currentTarget;
    const rect = imagen.getBoundingClientRect();

    let clientX;
    let clientY;

    if (evento.touches && evento.touches.length > 0) {
      clientX = evento.touches[0].clientX;
      clientY = evento.touches[0].clientY;
    } else {
      clientX = evento.clientX;
      clientY = evento.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      ocultarLupa();
      return;
    }

    const lupaSize = lupa.offsetWidth || 150;
    const zoom = 2.4;

    lupa.style.left = clientX - lupaSize / 2 + "px";
    lupa.style.top = clientY - lupaSize / 2 + "px";

    lupa.style.backgroundImage = "url('" + imagen.src + "')";
    lupa.style.backgroundSize = rect.width * zoom + "px " + rect.height * zoom + "px";

    const backgroundX = x * zoom - lupaSize / 2;
    const backgroundY = y * zoom - lupaSize / 2;

    lupa.style.backgroundPosition = "-" + backgroundX + "px -" + backgroundY + "px";
  }

  window.addEventListener("hashchange", ocultarLupa);
  window.addEventListener("scroll", ocultarLupa);
});