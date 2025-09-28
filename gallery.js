// URL de la API desde donde se obtienen los productos.
const API_URL = 'http://127.0.0.1:5000/api/products';

// Límite máximo de productos que se pueden seleccionar para comparar.
const MAX_PRODUCTS = 4;

// Almacena los IDs de los productos que el usuario ha seleccionado.
let productosSeleccionados = new Set();

// Dibuja todas las tarjetas de productos en la galería a partir de los datos recibidos.
function renderProductGallery(products) {
    const container = document.getElementById('product-gallery-container');
    container.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-3">
            <div class="product-card product-card-selectable position-relative" data-id="${product.id}" onclick="toggleSelection(this, '${product.id}')">
                <input type="checkbox" class="form-check-input position-absolute top-0 end-0 m-2" style="transform: scale(1.5);">
                <div class="product-card-img-container">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-card-body">
                    <h3 class="product-name">${product.name}</h3>
                </div>
            </div>
        </div>
    `).join('');
}

// Gestiona la selección y deselección de un producto al hacer clic en su tarjeta.
function toggleSelection(cardElement, productId) {
    const checkbox = cardElement.querySelector('input[type="checkbox"]');
    if (!checkbox.checked && productosSeleccionados.size >= MAX_PRODUCTS) {
        alert(`Puedes seleccionar un máximo de ${MAX_PRODUCTS} productos.`);
        return;
    }
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        productosSeleccionados.add(productId);
        cardElement.classList.add('selected');
    } else {
        productosSeleccionados.delete(productId);
        cardElement.classList.remove('selected');
    }
    updateComparisonBar();
}

// Habilita o deshabilita las tarjetas de los productos no seleccionados si se alcanza el límite.
function updateCheckboxStates() {
    const limitReached = productosSeleccionados.size >= MAX_PRODUCTS;
    const allCards = document.querySelectorAll('.product-card-selectable');
    allCards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (!checkbox.checked && limitReached) {
            card.classList.add('disabled');
        } else {
            card.classList.remove('disabled');
        }
    });
}

// Actualiza la barra inferior mostrando el conteo de productos y el estado del botón 'Comparar'.
function updateComparisonBar() {
    const bar = document.getElementById('comparison-bar');
    const countSpan = document.getElementById('comparison-count');
    const button = document.getElementById('compare-button');
    const count = productosSeleccionados.size;
    if (count > 0) {
        bar.classList.add('visible');
        countSpan.textContent = `${count} de ${MAX_PRODUCTS} productos seleccionados.`;
        button.disabled = count < 2;
    } else {
        bar.classList.remove('visible');
        button.disabled = true;
    }
    updateCheckboxStates();
}

// Redirige a la página de comparación con los IDs de los productos seleccionados en la URL.
document.getElementById('compare-button').addEventListener('click', () => {
    if (productosSeleccionados.size > 1) {
        const ids = Array.from(productosSeleccionados).join(',');
        window.location.href = `comparador.html?ids=${ids}`;
    }
});

// Inicia la galería, obteniendo los datos de la API y llamando a la función para dibujarlos.
async function initGallery() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        renderProductGallery(products);
    } catch (error) {
        console.error('Error al cargar la galería de productos:', error);
    }
}

// Ejecuta la función principal 'initGallery' una vez que todo el HTML de la página ha cargado.
document.addEventListener('DOMContentLoaded', initGallery);