// Funcionalidades principais do site RizeMax

// Função para toggle da busca
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const isActive = searchBar.classList.contains('active');
    
    if (isActive) {
        searchBar.classList.remove('active');
    } else {
        searchBar.classList.add('active');
        setTimeout(() => {
            searchBar.querySelector('.search-input').focus();
        }, 300);
    }
}

// Função para toggle do menu mobile
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    nav.classList.toggle('mobile-active');
    mobileBtn.classList.toggle('active');
    
    // Previne scroll quando menu está aberto
    if (nav.classList.contains('mobile-active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Função para scroll suave
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Função para animação dos números das estatísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 20);
    });
}

// Intersection Observer para animações
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animar estatísticas quando visível
                if (entry.target.classList.contains('stats-card')) {
                    animateStats();
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.category-card, .feature-item, .stats-card, .hero-card');
    animateElements.forEach(el => observer.observe(el));
}

// Função para busca de produtos
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm) {
        // Aqui você pode implementar a lógica de busca
        // Por exemplo, redirecionar para página de produtos com query
        window.location.href = `produtos.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Função para scroll header
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Função para fechar dropdowns ao clicar fora
function handleOutsideClick(event) {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Fechar busca ao clicar fora
    const searchBar = document.getElementById('searchBar');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchBar.contains(event.target) && !searchBtn.contains(event.target)) {
        searchBar.classList.remove('active');
    }
}

// Função para loading das imagens
function handleImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para modal de políticas
function showPolicy(type) {
    const policies = {
        privacy: {
            title: 'Política de Privacidade',
            content: `
                <h3>Política de Privacidade - RizeMax</h3>
                <p>Na RizeMax, levamos sua privacidade a sério. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.</p>
                
                <h4>Informações que coletamos:</h4>
                <ul>
                    <li>Informações de contato (nome, email, telefone)</li>
                    <li>Informações de navegação (cookies, IP)</li>
                    <li>Preferências de produtos e serviços</li>
                </ul>
                
                <h4>Como usamos suas informações:</h4>
                <ul>
                    <li>Para processar pedidos e fornecer suporte</li>
                    <li>Para melhorar nossos produtos e serviços</li>
                    <li>Para comunicações de marketing (com seu consentimento)</li>
                </ul>
                
                <h4>Proteção de dados:</h4>
                <p>Utilizamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>
                
                <p>Para mais informações, entre em contato conosco através do email: contato@rizemax.com.br</p>
            `
        },
        terms: {
            title: 'Termos de Uso',
            content: `
                <h3>Termos de Uso - RizeMax</h3>
                <p>Ao utilizar nosso site, você concorda com os seguintes termos e condições:</p>
                
                <h4>Uso do Site:</h4>
                <ul>
                    <li>O conteúdo é fornecido apenas para fins informativos</li>
                    <li>Você não pode usar o site para fins ilegais ou não autorizados</li>
                    <li>Reservamo-nos o direito de modificar o conteúdo sem aviso prévio</li>
                </ul>
                
                <h4>Produtos e Serviços:</h4>
                <ul>
                    <li>Preços e disponibilidade estão sujeitos a alterações</li>
                    <li>Garantias aplicam-se conforme especificado em cada produto</li>
                    <li>Reservamo-nos o direito de recusar pedidos</li>
                </ul>
                
                <h4>Limitação de Responsabilidade:</h4>
                <p>A RizeMax não será responsável por danos indiretos ou consequenciais decorrentes do uso do site ou produtos.</p>
                
                <p>Estes termos são regidos pelas leis brasileiras. Para dúvidas, contate: contato@rizemax.com.br</p>
            `
        }
    };
    
    const policy = policies[type];
    if (policy) {
        // Criar modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${policy.title}</h2>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    ${policy.content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Função para fechar modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar observer para animações
    initObserver();
    
    // Inicializar loading de imagens
    handleImageLoading();
    
    // Event listener para busca
    const searchInput = document.querySelector('.search-input');
    const searchSubmit = document.querySelector('.search-submit');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (searchSubmit) {
        searchSubmit.addEventListener('click', handleSearch);
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Event listener para cliques fora
    document.addEventListener('click', handleOutsideClick);
    
    // Event listeners para políticas
    const policyLinks = document.querySelectorAll('[data-policy]');
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const policyType = this.dataset.policy;
            showPolicy(policyType);
        });
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target !== '#') {
                smoothScroll(target);
            }
        });
    });
});

// Adicionar estilos CSS para modal via JavaScript
const modalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    max-height: 80vh;
    overflow: hidden;
    margin: 2rem;
    animation: slideIn 0.3s ease;
}

.modal-header {
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    color: #333;
}

.modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: #f5f5f5;
    color: #333;
}

.modal-body {
    padding: 2rem;
    overflow-y: auto;
    max-height: 60vh;
}

.modal-body h3 {
    color: #333;
    margin-bottom: 1rem;
}

.modal-body h4 {
    color: #667eea;
    margin: 1.5rem 0 0.5rem;
}

.modal-body p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #666;
}

.modal-body ul {
    margin: 1rem 0;
    padding-left: 2rem;
}

.modal-body li {
    margin-bottom: 0.5rem;
    color: #666;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { 
        opacity: 0;
        transform: translateY(-50px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.header.scrolled {
    background: rgba(102, 126, 234, 0.95);
    backdrop-filter: blur(20px);
}

@media (max-width: 768px) {
    .nav.mobile-active {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 999;
        animation: slideDown 0.3s ease;
    }
    
    .nav.mobile-active .nav-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav.mobile-active .nav-link {
        color: #333;
        padding: 1rem;
        border-radius: 12px;
        background: #f8f9fa;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
</style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', modalStyles);