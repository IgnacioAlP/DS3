// Funcionalidad para cambiar entre tabs de Producto e Imágenes
document.addEventListener('DOMContentLoaded', function() {
  const productTab = document.getElementById('product-tab');
  const imagesTab = document.getElementById('images-tab');
  const productContent = document.getElementById('product-content');
  const imagesSection = document.getElementById('images-section');

  // Función para cambiar a la pestaña de Producto
  function showProductTab() {
    // Mostrar contenido de producto
    productContent.classList.remove('hidden');
    imagesSection.classList.add('hidden');
    
    // Actualizar estilos de los botones
    productTab.classList.remove('bg-white', 'text-gray-700');
    productTab.classList.add('bg-blue-600', 'text-white');
    
    imagesTab.classList.remove('bg-blue-600', 'text-white');
    imagesTab.classList.add('bg-white', 'text-gray-700');
  }

  // Función para cambiar a la pestaña de Imágenes
  function showImagesTab() {
    // Mostrar sección de imágenes
    productContent.classList.add('hidden');
    imagesSection.classList.remove('hidden');
    
    // Actualizar estilos de los botones
    imagesTab.classList.remove('bg-white', 'text-gray-700');
    imagesTab.classList.add('bg-blue-600', 'text-white');
    
    productTab.classList.remove('bg-blue-600', 'text-white');
    productTab.classList.add('bg-white', 'text-gray-700');
  }

  // Event listeners
  if (productTab) {
    productTab.addEventListener('click', showProductTab);
  }

  if (imagesTab) {
    imagesTab.addEventListener('click', showImagesTab);
  }

  // Asegurar que la pestaña de Producto esté activa al cargar
  showProductTab();
});

// Función para cambiar imagen principal (desde miniaturas)
function toExchangeImage(thumbnail) {
  const mainImage = document.getElementById('img_main');
  if (mainImage && thumbnail) {
    mainImage.src = thumbnail.src;
  }
}

// Función para ver imagen en modal/nueva ventana
function viewImage(imageSrc) {
  // Abrir imagen en nueva ventana
  window.open(imageSrc, '_blank');
}
