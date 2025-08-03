// Funcionalidades específicas da página de produtos

// Variáveis globais
let allProducts = [];
let filteredProducts = [];
let wishlist = JSON.parse(localStorage.getItem('rizemax_wishlist') || '[]');
let cart = JSON.parse(localStorage.getItem('rizemax_cart') || '[]');

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    loadWishlistStates();
    handleURLFilters();
});

// Inicializar produtos
function initializeProducts() {
    const productCards = document.querySelectorAll('.product-card');
    allProducts = Array.from(productCards).map(card => {
        const name = card.querySelector('.product-name').textContent;
        const price = parseFloat(card.querySelector('.current-price').textContent.replace(/[^\d,]/g, '').replace(',', '.'));
        const category = card.dataset.category;
        
        return {
            element: card,
            name: name,
            price: price,
            category: category,
            visible: true
        };
    });
    
    filteredProducts = [...allProducts];
}

// Filtrar produtos
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    
    filteredProducts = allProducts.filter(product => {
        let categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
        let priceMatch = true;
        
        if (priceFilter !== 'all') {
            switch(priceFilter) {
                case 'low':
                    priceMatch = product.price <= 100;
                    break;
                case 'medium':
                    priceMatch = product.price > 100 && product.price <= 500;
                    break;
                case 'high':
                    priceMatch = product.price > 500 && product.price <= 1000;
                    break;
                case 'premium':
                    priceMatch = product.price > 1000;
                    break;
            }
        }
        
        return categoryMatch && priceMatch;
    });
    
    updateProductVisibility();
    updateCategorySections();
}

// Ordenar produtos
function sortProducts() {
    const sortFilter = document.getElementById('sort-filter').value;
    
    filteredProducts.sort((a, b) => {
        switch(sortFilter) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'popularity':
                // Simular popularidade baseada em alguns critérios
                const aPopularity = getProductPopularity(a);
                const bPopularity = getProductPopularity(b);
                return bPopularity - aPopularity;
            default:
                return 0;
        }
    });
    
    updateProductVisibility();
    reorderProducts();
}

// Obter popularidade simulada do produto
function getProductPopularity(product) {
    let popularity = 0;
    
    // Produtos com desconto são mais populares
    if (product.element.querySelector('.old-price')) {
        popularity += 50;
    }
    
    // Produtos com badge são mais populares
    if (product.element.querySelector('.product-badge')) {
        popularity += 30;
    }
    
    // Produtos mais baratos tendem a ser mais populares
    if (product.price < 200) {
        popularity += 20;
    }
    
    // Adicionar aleatoriedade
    popularity += Math.random() * 100;
    
    return popularity;
}

// Atualizar visibilidade dos produtos
function updateProductVisibility() {
    allProducts.forEach(product => {
        const isVisible = filteredProducts.includes(product);
        
        if (isVisible && !product.visible) {
            product.element.classList.remove('hidden');
            product.element.classList.add('filter-in');
            product.visible = true;
        } else if (!isVisible && product.visible) {
            product.element.classList.add('filter-out');
            setTimeout(() => {
                product.element.classList.add('hidden');
                product.element.classList.remove('filter-out');
            }, 300);
            product.visible = false;
        }
    });
    
    // Remover classes de animação após um tempo
    setTimeout(() => {
        allProducts.forEach(product => {
            product.element.classList.remove('filter-in');
        });
    }, 300);
}

// Atualizar seções de categoria
function updateCategorySections() {
    const categorySections = document.querySelectorAll('.category-section');
    
    categorySections.forEach(section => {
        const visibleProducts = section.querySelectorAll('.product-card:not(.hidden)');
        
        if (visibleProducts.length === 0) {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    });
    
    // Mostrar mensagem se nenhum produto for encontrado
    const totalVisible = document.querySelectorAll('.product-card:not(.hidden)').length;
    showNoProductsMessage(totalVisible === 0);
}

// Reordenar produtos após sorting
function reorderProducts() {
    const categorySections = document.querySelectorAll('.category-section');
    
    categorySections.forEach(section => {
        const grid = section.querySelector('.products-grid');
        const categoryProducts = filteredProducts.filter(product => 
            product.element.closest('.category-section') === section && product.visible
        );
        
        // Reordenar elementos no DOM
        categoryProducts.forEach(product => {
            grid.appendChild(product.element);
        });
    });
}

// Mostrar mensagem quando não há produtos
function showNoProductsMessage(show) {
    let messageElement = document.querySelector('.no-products');
    
    if (show && !messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'no-products';
        messageElement.innerHTML = `
            <h3>Nenhum produto encontrado</h3>
            <p>Tente ajustar os filtros ou explorar outras categorias.</p>
            <button class="btn btn-primary" onclick="clearFilters()">Limpar Filtros</button>
        `;
        
        const productsSection = document.querySelector('.products .container');
        productsSection.appendChild(messageElement);
    } else if (!show && messageElement) {
        messageElement.remove();
    }
}

// Limpar filtros
function clearFilters() {
    document.getElementById('category-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('sort-filter').value = 'name';
    
    filterProducts();
    
    // Scroll para o topo da seção de produtos
    document.querySelector('.products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Adicionar ao carrinho
function addToCart(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;
    
    // Simular adição ao carrinho
    showNotification(`${productName} foi adicionado à sua lista de orçamentos!`, 'success');
    
    // Adicionar animação ao botão
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Aqui você pode implementar a lógica real do carrinho
    const cartItem = {
        name: productName,
        price: productPrice,
        timestamp: Date.now()
    };
    
    cart.push(cartItem);
    localStorage.setItem('rizemax_cart', JSON.stringify(cart));
}

// Toggle wishlist
function toggleWishlist(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const isInWishlist = button.classList.contains('active');
    
    if (isInWishlist) {
        // Remover da wishlist
        const index = wishlist.findIndex(item => item.name === productName);
        if (index > -1) {
            wishlist.splice(index, 1);
        }
        button.classList.remove('active');
        showNotification(`${productName} foi removido da sua lista de desejos!`, 'info');
    } else {
        // Adicionar à wishlist
        const wishlistItem = {
            name: productName,
            price: productCard.querySelector('.current-price').textContent,
            timestamp: Date.now()
        };
        
        wishlist.push(wishlistItem);
        button.classList.add('active');
        showNotification(`${productName} foi adicionado à sua lista de desejos!`, 'success');
    }
    
    localStorage.setItem('rizemax_wishlist', JSON.stringify(wishlist));
    
    // Animação
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Carregar estados da wishlist
function loadWishlistStates() {
    const wishlistButtons = document.querySelectorAll('.btn-icon');
    
    wishlistButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        if (wishlist.some(item => item.name === productName)) {
            button.classList.add('active');
        }
    });
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remover após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Lidar com filtros na URL
function handleURLFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const category = urlParams.get('category');
    
    if (search) {
        // Implementar busca por texto
        searchProducts(search);
    }
    
    if (category) {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = category;
            filterProducts();
        }
    }
}

// Buscar produtos por texto
function searchProducts(searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    filteredProducts = allProducts.filter(product => {
        const name = product.name.toLowerCase();
        const description = product.element.querySelector('.product-description').textContent.toLowerCase();
        
        return name.includes(lowerSearchTerm) || description.includes(lowerSearchTerm);
    });
    
    updateProductVisibility();
    updateCategorySections();
    
    // Mostrar termo de busca
    const pageHeader = document.querySelector('.page-header h1');
    if (pageHeader) {
        pageHeader.textContent = `Resultados para: "${searchTerm}"`;
    }
}

// Adicionar estilos para notificações
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 10001;
    max-width: 400px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: slideInRight 0.3s ease;
}

.notification-success {
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    color: white;
}

.notification-info {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
}

.notification-content {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.notification-message {
    flex: 1;
    font-weight: 500;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    opacity: 1;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@media (max-width: 768px) {
    .notification {
        left: 20px;
        right: 20px;
        max-width: none;
    }
}
</style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', notificationStyles);