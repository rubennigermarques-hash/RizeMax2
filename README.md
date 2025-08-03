# RizeMax - Site Corporativo

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página inicial
├── produtos.html           # Catálogo de produtos
├── sobre.html             # Sobre a empresa
├── contato.html           # Página de contato
├── css/
│   ├── style.css          # Estilos principais
│   └── produtos.css       # Estilos específicos de produtos
├── js/
│   ├── script.js          # JavaScript principal
│   ├── produtos.js        # Funcionalidades de produtos
│   └── contato.js         # Funcionalidades de contato
├── images/
│   ├── hero/              # Imagens do banner principal
│   ├── products/          # Imagens dos produtos
│   ├── team/              # Fotos da equipe
│   ├── logos/             # Logos e certificações
│   └── backgrounds/       # Imagens de fundo
└── README.md              # Este arquivo
```

## 🖼️ Imagens Necessárias

### 📸 Tamanhos Recomendados:

#### **Hero/Banner (images/hero/)**
- `hero-bg.jpg` - 1920x1080px - Imagem de fundo do banner principal
- `hero-energy.jpg` - 800x600px - Imagem relacionada a energia/tecnologia

#### **Produtos (images/products/)**
- `ups-3000va.jpg` - 400x300px - UPS Online 3000VA
- `bateria-12v.jpg` - 400x300px - Bateria Selada 12V 7Ah
- `estabilizador-5000va.jpg` - 400x300px - Estabilizador 5000VA
- `notebook-business.jpg` - 400x300px - Notebook Business Pro
- `tablet-10-hd.jpg` - 400x300px - Tablet 10" HD
- `cabo-hdmi-4k.jpg` - 400x300px - Cabo HDMI 4K
- `cabo-rede-cat6.jpg` - 400x300px - Cabo Rede Cat6
- `impressora-multifuncional.jpg` - 400x300px - Impressora Multifuncional
- `fragmentadora-papel.jpg` - 400x300px - Fragmentadora de Papel
- `contador-cedulas.jpg` - 400x300px - Contador de Cédulas
- `pen-drive-64gb.jpg` - 400x300px - Pen Drive 64GB
- `hd-externo-1tb.jpg` - 400x300px - HD Externo 1TB

#### **Equipe (images/team/)**
- `carlos-silva.jpg` - 300x300px - CEO & Fundador
- `ana-santos.jpg` - 300x300px - Diretora Técnica
- `roberto-lima.jpg` - 300x300px - Gerente de Vendas
- `marina-costa.jpg` - 300x300px - Coordenadora de Suporte

#### **Logos/Certificações (images/logos/)**
- `rizemax-logo.png` - 200x80px - Logo principal (fundo transparente)
- `iso-9001.png` - 150x150px - Certificação ISO 9001
- `iso-14001.png` - 150x150px - Certificação ISO 14001
- `aneel.png` - 150x150px - Logo ANEEL
- `inmetro.png` - 150x150px - Logo INMETRO

## 🎨 Fontes de Imagens Gratuitas:

### **Recomendadas:**
1. **Unsplash** (https://unsplash.com/)
   - Busque por: "technology", "electronics", "energy", "office"
   
2. **Pexels** (https://pexels.com/)
   - Busque por: "computer", "battery", "cables", "office equipment"

3. **Pixabay** (https://pixabay.com/)
   - Busque por: "ups", "power supply", "electronics"

### **Termos de Busca Úteis:**
- "uninterruptible power supply"
- "computer equipment" 
- "office electronics"
- "technology background"
- "energy solutions"
- "professional team"
- "corporate office"

## 🚀 Configuração Rápida

### **Opção 1: Com Imagens Reais**
1. Baixe as imagens recomendadas
2. Coloque nas pastas correspondentes em `/images/`
3. Execute: Todos os arquivos HTML já estão preparados para as imagens

### **Opção 2: Usar Placeholders Online**
O site já vem configurado com placeholders que podem usar serviços como:
- https://via.placeholder.com/400x300/667eea/ffffff?text=Produto
- https://picsum.photos/400/300 (imagens aleatórias)

### **Opção 3: Gerar com IA**
Use ferramentas como:
- DALL-E, Midjourney, Stable Diffusion
- Prompts sugeridos no final deste arquivo

## ⚙️ Configuração do Servidor

### **Upload para Hostinger:**
1. Acesse o File Manager ou use FTP
2. Faça upload de todos os arquivos mantendo a estrutura
3. Certifique-se que o `index.html` está na raiz
4. Teste todas as páginas

### **Configurações Recomendadas:**
- Ative compressão GZIP
- Configure cache para imagens (7 dias)
- Otimize imagens para web (use JPEG para fotos, PNG para logos)

## 📝 Personalização

### **Alterar Informações da Empresa:**
1. **Dados de Contato:** Edite em todos os arquivos HTML
2. **Cores:** Modifique as variáveis CSS em `style.css`
3. **Produtos:** Adicione/remova em `produtos.html`
4. **Equipe:** Atualize informações em `sobre.html`

### **Cores Principais:**
```css
/* Primária */
--primary-color: #667eea;
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Secundária */
--secondary-color: #ff6b6b;
--accent-color: #feca57;
```

## 🔧 Funcionalidades Ativas

- ✅ Navegação responsiva
- ✅ Busca de produtos
- ✅ Filtros e ordenação
- ✅ Formulário de contato
- ✅ FAQ interativo
- ✅ Sistema de wishlist
- ✅ Notificações
- ✅ Modais informativos
- ✅ Animações suaves

## 📱 Compatibilidade

- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

## 🎯 Prompts para IA (Geração de Imagens)

### **Para Hero/Banner:**
```
"Modern technology office with computers and energy equipment, professional lighting, corporate environment, blue and purple tones, high-tech atmosphere, 16:9 aspect ratio"
```

### **Para Produtos:**
```
"Professional product photography of [PRODUTO], white background, studio lighting, commercial quality, front view, detailed, 4:3 aspect ratio"
```

### **Para Equipe:**
```
"Professional corporate headshot of [CARGO], business attire, neutral background, confident expression, professional lighting, 1:1 aspect ratio"
```

## 🆘 Suporte

Para dúvidas sobre configuração ou personalização, verifique:
1. Comentários no código HTML/CSS/JS
2. Console do navegador para erros
3. Compatibilidade com servidor compartilhado

---

**RizeMax** - Maximizando seu potencial através da tecnologia e inovação.