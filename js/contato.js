// Funcionalidades específicas da página de contato

// Máscara para telefone
function phoneMask(phone) {
    return phone.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1');
}

// Aplicar máscara ao campo telefone
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = phoneMask(e.target.value);
        });
    }
    
    // Adicionar estilos específicos da página de contato
    addContactStyles();
});

// Validação de formulário
function validateForm(formData) {
    const errors = [];
    
    // Validar nome
    if (!formData.get('name') || formData.get('name').length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    // Validar email
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('E-mail deve ter um formato válido');
    }
    
    // Validar telefone (se preenchido)
    const phone = formData.get('phone');
    if (phone && phone.replace(/\D/g, '').length < 10) {
        errors.push('Telefone deve ter pelo menos 10 dígitos');
    }
    
    // Validar assunto
    if (!formData.get('subject')) {
        errors.push('Selecione um assunto');
    }
    
    // Validar mensagem
    if (!formData.get('message') || formData.get('message').length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    // Validar privacidade
    if (!formData.get('privacy')) {
        errors.push('É necessário concordar com a Política de Privacidade');
    }
    
    return errors;
}

// Enviar formulário
async function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validar formulário
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return;
    }
    
    // Mostrar loading
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    try {
        // Simular envio do formulário
        await simulateFormSubmission(formData);
        
        // Sucesso
        showSuccessMessage();
        form.reset();
        
    } catch (error) {
        // Erro
        showErrorMessage(error.message);
    } finally {
        // Restaurar botão
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

// Simular envio do formulário
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simular sucesso na maioria das vezes
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Erro temporário. Tente novamente.'));
            }
        }, 2000);
    });
}

// Mostrar erros do formulário
function showFormErrors(errors) {
    const errorHtml = `
        <div class="form-errors">
            <h4>Por favor, corrija os seguintes erros:</h4>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    showNotification(errorHtml, 'error');
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const successHtml = `
        <div class="success-message">
            <h4>✅ Mensagem enviada com sucesso!</h4>
            <p>Nossa equipe entrará em contato em até 24 horas.</p>
        </div>
    `;
    
    showNotification(successHtml, 'success');
}

// Mostrar mensagem de erro
function showErrorMessage(message) {
    const errorHtml = `
        <div class="error-message">
            <h4>❌ Erro ao enviar mensagem</h4>
            <p>${message}</p>
        </div>
    `;
    
    showNotification(errorHtml, 'error');
}

// Toggle FAQ
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');
    
    // Fechar outras FAQs abertas
    const openFaqs = document.querySelectorAll('.faq-item.active');
    openFaqs.forEach(faq => {
        if (faq !== faqItem) {
            faq.classList.remove('active');
            faq.querySelector('.faq-answer').style.maxHeight = null;
            faq.querySelector('.faq-icon').textContent = '+';
        }
    });
    
    // Toggle FAQ atual
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = null;
        icon.textContent = '+';
    } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    }
}

// Mostrar mapa (placeholder)
function showMap() {
    const mapHtml = `
        <div class="map-modal">
            <div class="map-content">
                <div class="map-header">
                    <h3>📍 Nossa Localização</h3>
                    <button onclick="closeMap()" class="map-close">×</button>
                </div>
                <div class="map-body">
                    <div class="map-placeholder">
                        <div class="map-icon">🗺️</div>
                        <h4>RizeMax - Sede São Paulo</h4>
                        <p><strong>Endereço:</strong> Av. Paulista, 1000</p>
                        <p><strong>CEP:</strong> 01310-100</p>
                        <p><strong>Bairro:</strong> Bela Vista</p>
                        <p><strong>Cidade:</strong> São Paulo - SP</p>
                        <div class="map-actions">
                            <a href="https://www.google.com/maps/search/Av.+Paulista,+1000+São+Paulo" 
                               target="_blank" class="btn btn-primary">
                                Abrir no Google Maps
                            </a>
                            <a href="https://waze.com/ul?q=Av.+Paulista,+1000+São+Paulo" 
                               target="_blank" class="btn btn-secondary">
                                Abrir no Waze
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', mapHtml);
    document.body.style.overflow = 'hidden';
}

// Fechar mapa
function closeMap() {
    const mapModal = document.querySelector('.map-modal');
    if (mapModal) {
        mapModal.remove();
        document.body.style.overflow = '';
    }
}

// Função de notificação (reutiliza a do produtos.js se existir)
function showNotification(content, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.contact-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `contact-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            ${content}
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remover após 8 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

// Adicionar estilos específicos da página de contato
function addContactStyles() {
    const contactStyles = `
        <style>
        /* Estilos específicos da página de contato */
        .logo a {
            color: inherit;
            text-decoration: none;
        }

        .contact-methods {
            padding: 80px 0;
            background: #f8f9fa;
        }

        .methods-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .method-card {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .method-card:hover {
            transform: translateY(-10px);
        }

        .method-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .method-card h3 {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }

        .method-card p {
            color: #666;
            margin-bottom: 1rem;
        }

        .method-info {
            margin-bottom: 1.5rem;
        }

        .method-info strong {
            display: block;
            color: #667eea;
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
        }

        .method-info span {
            color: #666;
            font-size: 0.9rem;
        }

        .contact-form-section {
            padding: 80px 0;
            background: white;
        }

        .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: flex-start;
        }

        .form-text h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #333;
        }

        .form-text p {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .form-benefits {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .benefit-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .benefit-icon {
            font-size: 1.2rem;
        }

        .contact-form {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 20px;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e1e5e9;
            border-radius: 12px;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }

        .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            cursor: pointer;
            line-height: 1.5;
            font-weight: normal;
        }

        .checkbox-label input[type="checkbox"] {
            display: none;
        }

        .checkmark {
            width: 20px;
            height: 20px;
            border: 2px solid #e1e5e9;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
            background: #667eea;
            border-color: #667eea;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
            content: '✓';
            color: white;
            font-size: 12px;
            font-weight: bold;
        }

        .checkbox-label a {
            color: #667eea;
            text-decoration: none;
        }

        .checkbox-label a:hover {
            text-decoration: underline;
        }

        .btn-submit {
            width: 100%;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
        }

        .faq {
            padding: 80px 0;
            background: #f8f9fa;
        }

        .faq-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .faq-item {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .faq-question {
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .faq-question:hover {
            background: #f8f9fa;
        }

        .faq-question span {
            font-weight: 600;
            color: #333;
        }

        .faq-icon {
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
            transition: transform 0.3s ease;
        }

        .faq-item.active .faq-icon {
            transform: rotate(45deg);
        }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .faq-answer p {
            padding: 0 1.5rem 1.5rem;
            color: #666;
            line-height: 1.6;
            margin: 0;
        }

        /* Notificação */
        .contact-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            left: 20px;
            max-width: 500px;
            margin: 0 auto;
            z-index: 10001;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideInDown 0.3s ease;
        }

        .notification-success {
            background: linear-gradient(135deg, #4ecdc4, #44a08d);
            color: white;
        }

        .notification-error {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
        }

        .contact-notification .notification-content {
            padding: 1.5rem;
            position: relative;
        }

        .contact-notification h4 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
        }

        .contact-notification p,
        .contact-notification ul {
            margin: 0;
            opacity: 0.95;
        }

        .contact-notification ul {
            padding-left: 1.5rem;
            margin-top: 0.5rem;
        }

        .contact-notification .notification-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }

        .contact-notification .notification-close:hover {
            opacity: 1;
        }

        /* Modal do Mapa */
        .map-modal {
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
            padding: 2rem;
        }

        .map-content {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            overflow: hidden;
        }

        .map-header {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .map-header h3 {
            margin: 0;
            color: #333;
        }

        .map-close {
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

        .map-close:hover {
            background: #f5f5f5;
            color: #333;
        }

        .map-body {
            padding: 2rem;
        }

        .map-placeholder {
            text-align: center;
        }

        .map-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }

        .map-placeholder h4 {
            font-size: 1.3rem;
            margin-bottom: 1rem;
            color: #333;
        }

        .map-placeholder p {
            margin-bottom: 0.5rem;
            color: #666;
        }

        .map-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
            flex-wrap: wrap;
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .contact-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .form-text h2 {
                font-size: 2rem;
            }

            .form-row {
                grid-template-columns: 1fr;
                gap: 0;
            }

            .methods-grid {
                grid-template-columns: 1fr;
            }

            .contact-notification {
                left: 10px;
                right: 10px;
            }

            .map-modal {
                padding: 1rem;
            }

            .map-actions {
                flex-direction: column;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', contactStyles);
}