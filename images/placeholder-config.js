// Configuração de Placeholders para Imagens
// Use este arquivo como referência para substituir por imagens reais

window.PlaceholderImages = {
    // Configuração base
    baseUrl: 'https://via.placeholder.com/',
    fallbackUrl: 'https://picsum.photos/',
    
    // Hero/Banner
    hero: {
        background: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=entropy&cs=tinysrgb',
        energy: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb'
    },
    
    // Produtos
    products: {
        'ups-3000va': 'https://via.placeholder.com/400x300/667eea/ffffff?text=UPS+3000VA',
        'bateria-12v': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Bateria+12V',
        'estabilizador-5000va': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Estabilizador',
        'notebook-business': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Notebook',
        'tablet-10-hd': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Tablet+HD',
        'cabo-hdmi-4k': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Cabo+HDMI',
        'cabo-rede-cat6': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Cabo+Rede',
        'impressora-multifuncional': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Impressora',
        'fragmentadora-papel': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Fragmentadora',
        'contador-cedulas': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Contador',
        'pen-drive-64gb': 'https://via.placeholder.com/400x300/667eea/ffffff?text=Pen+Drive',
        'hd-externo-1tb': 'https://via.placeholder.com/400x300/667eea/ffffff?text=HD+Externo'
    },
    
    // Equipe
    team: {
        'carlos-silva': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&cs=tinysrgb',
        'ana-santos': 'https://images.unsplash.com/photo-1494790108755-2616b612b02c?w=300&h=300&fit=crop&crop=face&cs=tinysrgb',
        'roberto-lima': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&cs=tinysrgb',
        'marina-costa': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face&cs=tinysrgb'
    },
    
    // Logos e Certificações
    logos: {
        'rizemax-logo': 'https://via.placeholder.com/200x80/667eea/ffffff?text=RizeMax',
        'iso-9001': 'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=ISO+9001',
        'iso-14001': 'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=ISO+14001',
        'aneel': 'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=ANEEL',
        'inmetro': 'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=INMETRO'
    },
    
    // URLs de Produtos Reais da Unsplash (opção alternativa)
    realProducts: {
        'ups-3000va': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
        'bateria-12v': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
        'estabilizador-5000va': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'notebook-business': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        'tablet-10-hd': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
        'cabo-hdmi-4k': 'https://images.unsplash.com/photo-1558618666-fccc54c84052?w=400&h=300&fit=crop',
        'cabo-rede-cat6': 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop',
        'impressora-multifuncional': 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
        'fragmentadora-papel': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
        'contador-cedulas': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
        'pen-drive-64gb': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
        'hd-externo-1tb': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop'
    }
};

// Função para aplicar placeholders automaticamente
function applyPlaceholders() {
    // Aplicar imagens de produtos
    const productImages = document.querySelectorAll('.placeholder-image');
    productImages.forEach((img, index) => {
        const productKeys = Object.keys(window.PlaceholderImages.realProducts);
        if (productKeys[index]) {
            img.style.backgroundImage = `url('${window.PlaceholderImages.realProducts[productKeys[index]]}')`;
            img.style.backgroundSize = 'cover';
            img.style.backgroundPosition = 'center';
            img.textContent = '';
        }
    });
    
    // Aplicar imagens da equipe
    const teamPhotos = document.querySelectorAll('.member-photo');
    teamPhotos.forEach((photo, index) => {
        const teamKeys = Object.keys(window.PlaceholderImages.team);
        if (teamKeys[index]) {
            photo.style.backgroundImage = `url('${window.PlaceholderImages.team[teamKeys[index]]}')`;
            photo.style.backgroundSize = 'cover';
            photo.style.backgroundPosition = 'center';
            photo.style.borderRadius = '50%';
            photo.textContent = '';
        }
    });
    
    // Aplicar background do hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundImage = `linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%), url('${window.PlaceholderImages.hero.background}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundAttachment = 'fixed';
    }
}

// Aplicar quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPlaceholders);
} else {
    applyPlaceholders();
}