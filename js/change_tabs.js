// Funcionalidad de Tabs (Producto / Imágenes)
document.addEventListener('DOMContentLoaded', function() {
    const productTab = document.getElementById('product-tab');
    const imagesTab = document.getElementById('images-tab');
    const informationSection = document.getElementById('information-section');
    const imagesSection = document.getElementById('images-section');

    if (productTab && imagesTab && informationSection && imagesSection) {
        // Cambiar a la pestaña de Producto
        productTab.addEventListener('click', function() {
            informationSection.classList.remove('hidden');
            imagesSection.classList.add('hidden');
            
            productTab.classList.remove('bg-gray-100', 'text-gray-700');
            productTab.classList.add('bg-blue-600', 'text-white');
            
            imagesTab.classList.remove('bg-blue-600', 'text-white');
            imagesTab.classList.add('bg-gray-100', 'text-gray-700');
        });

        // Cambiar a la pestaña de Imágenes
        imagesTab.addEventListener('click', function() {
            informationSection.classList.add('hidden');
            imagesSection.classList.remove('hidden');
            
            imagesTab.classList.remove('bg-gray-100', 'text-gray-700');
            imagesTab.classList.add('bg-blue-600', 'text-white');
            
            productTab.classList.remove('bg-blue-600', 'text-white');
            productTab.classList.add('bg-gray-100', 'text-gray-700');
        });
    }
});

// Funcionalidad de Cambio de Imagen Principal
function toExchangeImage(thumbnail) {
    const mainImage = document.getElementById('img_main');
    if (mainImage && thumbnail) {
        // Añadir animación de fade
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = thumbnail.src;
            mainImage.style.opacity = '1';
        }, 200);
        
        // Actualizar thumbnails activos
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnail.parentElement.classList.add('active');
    }
}

// Funcionalidad de Modal de Imagen
function viewImage(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Añadir animación
        modal.style.animation = 'fadeIn 0.3s ease-in-out';
    }
}

// Cerrar Modal de Imagen
function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Cerrar modal al hacer click fuera de la imagen
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading de imágenes mejorado
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Animación al hacer scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in-scroll');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            element.classList.add('fade-in');
        }
    });
});

// Copiar al portapapeles (útil para códigos de producto)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar notificación de éxito
        showNotification('Copiado al portapapeles', 'success');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    notification.style.animation = 'slideInLeft 0.3s ease-out';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mejora de accesibilidad para el teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Funcionalidad de búsqueda en la lista de precios
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchPriceList');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const priceListItems = document.querySelectorAll('.price-list-item');
            
            priceListItems.forEach(item => {
                const brandName = item.getAttribute('data-brand');
                const brandText = item.querySelector('.fw-semibold, .fw-bold').textContent.toLowerCase();
                
                if (brandName.includes(searchTerm) || brandText.includes(searchTerm) || searchTerm === '') {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                    item.style.display = 'flex';
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('visible');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 200);
                }
            });
            
            // Mostrar mensaje si no hay resultados
            const visibleItems = document.querySelectorAll('.price-list-item.visible');
            const container = document.querySelector('.price-list-container');
            let noResultsMsg = document.getElementById('no-results-message');
            
            if (visibleItems.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'no-results-message';
                    noResultsMsg.className = 'text-center p-3 text-muted';
                    noResultsMsg.innerHTML = '<i class="fas fa-search mb-2"></i><br><small>No se encontraron marcas</small>';
                    container.appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
        
        // Limpiar búsqueda con tecla ESC
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });
    }
});

console.log('✅ Tabs y funcionalidades de imagen cargadas correctamente');