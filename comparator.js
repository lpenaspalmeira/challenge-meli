const API_URL = 'http://127.0.0.1:5000/api/products';
const specLabels = {
    brand: "Marca", model: "Modelo", cpu: "Procesador", ram_gb: "RAM (GB)", storage_gb: "Almacenamiento (GB)",
    gpu: "Gráficos", screen_inches: "Pantalla (\")", resolution: "Resolución", weight_kg: "Peso (kg)", battery_life_h: "Batería (hs)"
};

const formatPrice = (price, currency) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(price);
const generateStars = (rating) => { let stars = ''; for (let i = 1; i <= 5; i++) { if (i <= rating) stars += '<i class="bi bi-star-fill"></i> '; else if (i - 0.5 <= rating) stars += '<i class="bi bi-star-half"></i> '; else stars += '<i class="bi bi-star"></i> '; } return stars; };

function renderProductCards(products) {
    const container = document.getElementById('product-cards-container');
    container.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-3">
            <div class="product-card">
                <div class="product-card-img-container">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-card-body">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="card-text text-muted small mb-2">${product.description}</p>
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="rating-stars">${generateStars(product.rating)}</span>
                        <span class="text-muted small">(${product.rating})</span>
                    </div>
                    <div class="price">${formatPrice(product.price, product.currency)}</div>
                    <div class="mt-auto pt-3">
                        <button class="btn btn-primary w-100">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSpecificationsTable(products) {
    const container = document.getElementById('specs-table-container');
    const tableHeaders = products.map(p => `<th class="text-center"><div class="product-header"><img src="${p.images[0]}" alt="${p.name}" class="img-fluid rounded"><div>${p.name}</div></div></th>`).join('');
    const allSpecKeys = Object.keys(specLabels);
    const tableBody = allSpecKeys.map(key => {
        const rowData = products.map(p => `<td>${p.specs[key] || '–'}</td>`).join('');
        return `<tr><td class="spec-label">${specLabels[key]}</td>${rowData}</tr>`;
    }).join('');
    container.innerHTML = `<table class="table table-bordered table-hover text-center"><thead><tr><th>Especificación</th>${tableHeaders}</tr></thead><tbody>${tableBody}</tbody></table>`;
}

async function initComparison() {
    const params = new URLSearchParams(window.location.search);
    const idsFromUrl = params.get('ids');
    if (!idsFromUrl) {
        document.getElementById('product-cards-container').innerHTML = '<div class="alert alert-warning col-12">No se han seleccionado productos para comparar. <a href="index.html">Vuelve a la galería para elegirlos</a>.</div>';
        document.getElementById('product-count').textContent = 'Comparando 0 productos';
        return;
    }
    const selectedIds = idsFromUrl.split(',');
    try {
        const response = await fetch(API_URL);
        const allProducts = await response.json();
        const productsToCompare = allProducts.filter(product => selectedIds.includes(product.id));
        if (productsToCompare.length > 0) {
            document.getElementById('product-count').textContent = `Comparando ${productsToCompare.length} productos`;
            renderProductCards(productsToCompare);
            renderSpecificationsTable(productsToCompare);
        } else {
             document.getElementById('product-cards-container').innerHTML = '<div class="alert alert-warning col-12">No se encontraron los productos seleccionados. <a href="index.html">Intenta de nuevo</a>.</div>';
             document.getElementById('product-count').textContent = 'Comparando 0 productos';
        }
    } catch (error) {
        console.error('Error al cargar productos para comparar:', error);
    }
}

document.addEventListener('DOMContentLoaded', initComparison);