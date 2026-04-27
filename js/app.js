// Efecto lupa para galería de arte

// Espera a que el DOM esté listo
window.addEventListener('DOMContentLoaded', function () {
  const obras = document.querySelectorAll('.obra img');
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  obras.forEach(img => {
    // Crear lupa
    const zoomLens = document.createElement('div');
    zoomLens.className = 'zoom-lens';
    img.parentElement.style.position = 'relative';
    img.parentElement.appendChild(zoomLens);
    zoomLens.style.display = 'none';

    // Eventos
    if (isTouch) {
      img.addEventListener('touchstart', showLens, {passive: false});
      img.addEventListener('touchmove', moveLens, {passive: false});
      img.addEventListener('touchend', hideLens, {passive: false});
    } else {
      img.addEventListener('mouseenter', showLens);
      img.addEventListener('mousemove', moveLens);
      img.addEventListener('mouseleave', hideLens);
    }

    function showLens(e) {
      e.preventDefault();
      zoomLens.style.display = 'block';
      moveLens(e);
    }

    function hideLens(e) {
      zoomLens.style.display = 'none';
    }

    function moveLens(e) {
      e.preventDefault();
      let x, y;
      const rect = img.getBoundingClientRect();
      if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      // Limitar dentro de la imagen
      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));
      // Tamaño y zoom
      const lensSize = 120;
      const zoom = 2.2;
      zoomLens.style.width = lensSize + 'px';
      zoomLens.style.height = lensSize + 'px';
      zoomLens.style.left = (x - lensSize/2) + 'px';
      zoomLens.style.top = (y - lensSize/2) + 'px';
      zoomLens.style.backgroundImage = `url('${img.src}')`;
      zoomLens.style.backgroundSize = (img.width * zoom) + 'px ' + (img.height * zoom) + 'px';
      zoomLens.style.backgroundPosition = `-${x * zoom - lensSize/2}px -${y * zoom - lensSize/2}px`;
      zoomLens.style.backgroundRepeat = 'no-repeat';
      zoomLens.style.pointerEvents = 'none';
    }
  });
});
