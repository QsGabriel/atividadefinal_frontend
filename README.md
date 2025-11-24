# 🚀 Portfólio Gabriel Queiroz de Souza

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

> Landing Page / Portfólio moderno, futurista e acessível desenvolvido com foco em UX/UI, performance e boas práticas web.

---

## 📋 Sobre o Projeto

Este é um **portfólio profissional one-page** desenvolvido para Gabriel Queiroz de Souza, Desenvolvedor Front-End e especialista em UX/UI Design. O projeto foi construído do zero utilizando apenas **HTML5 semântico**, **CSS moderno** (incluindo Grid, Flexbox e Glassmorphism) e **JavaScript vanilla**, sem dependências de frameworks.

### 🎯 Identidade Visual

- **Cores Base**: Grey (#808080), White (#FFFFFF), Dark Blue (#0A1F44)
- **Estilo**: Moderno, futurista, minimalista
- **Efeitos**: Glassmorphism, gradientes elegantes, efeitos neon/glow, blur suaves

---

## ✨ Funcionalidades Principais

### 🔧 JavaScript Implementado (5 funcionalidades principais)

1. **✅ Smooth Scroll Interativo**
   - Navegação suave entre seções
   - Offset personalizado para header fixo
   - Suporte a acessibilidade via teclado

2. **✅ Sistema de Favoritos (LocalStorage)**
   - Marcar projetos favoritos na galeria
   - Persistência de dados entre sessões
   - Feedback visual instantâneo

3. **✅ Carregamento de Portfólio via JSON**
   - Projetos carregados dinamicamente
   - Filtragem por categoria
   - Botão "Carregar Mais" para paginação

4. **✅ Validação de Formulário Completa**
   - Validação em tempo real
   - Feedback visual acessível
   - Mensagens de erro/sucesso com ARIA

5. **✅ Tema Claro/Escuro com Persistência**
   - Alternância entre temas
   - Salvamento em LocalStorage
   - Detecção de preferência do sistema

### 🎨 Recursos Adicionais

- **Scroll Progress Indicator**: Barra de progresso visual
- **Intersection Observer**: Animações ativadas por scroll
- **Back to Top Button**: Botão de retorno ao topo
- **PWA Básico**: Progressive Web App com Service Worker
- **Animação de Partículas**: Canvas interativo com WebGL
- **Demo Interativo**: Elemento de demonstração animado
- **Mobile Menu**: Hamburger menu responsivo

---

## 🏗️ Estrutura do Projeto

```
atividadefinal_frontend/
│
├── assets/
│   ├── img/              # Imagens (profile, portfolio)
│   ├── icons/            # Ícones PWA
│   └── videos/           # Vídeos de background
│
├── css/
│   ├── style.css         # Estilos principais
│   ├── responsive.css    # Media queries (mobile-first)
│   └── animations.css    # Animações e efeitos
│
├── js/
│   ├── main.js           # Inicializações gerais
│   ├── theme.js          # Sistema de tema claro/escuro
│   ├── navigation.js     # Menu e navegação
│   ├── scroll.js         # Smooth scroll e scroll effects
│   ├── portfolio.js      # Carregamento e filtros de projetos
│   ├── form.js           # Validação de formulário
│   ├── animations.js     # Animações via Intersection Observer
│   └── media.js          # Controles de mídia e canvas
│
├── data/
│   └── projects.json     # Dados dos projetos
│
├── index.html            # Página principal
├── manifest.json         # PWA Manifest
├── sw.js                 # Service Worker
└── README.md             # Este arquivo
```

---

## 📱 Seções da Página

### 1️⃣ **Hero Section (Landing)**
- Vídeo de background com overlay
- Animação de entrada (fade-in)
- Botões CTA com scroll interativo
- Links para redes sociais
- Scroll indicator animado

### 2️⃣ **Sobre Mim (About)**
- Foto de perfil estilizada com efeito glow
- Cards de estatísticas (anos de experiência, projetos, clientes)
- Tags de habilidades interativas
- Botão para download de CV

### 3️⃣ **Habilidades & Serviços (Skills)**
- **6 cards interativos** com:
  - Ícones SVG animados
  - Hover com efeito tilt e glow
  - Lista de tecnologias/skills
- Categorias: Front-End, UI/UX, Responsivo, Acessibilidade, Performance, Animações

### 4️⃣ **Portfólio (Portfolio)**
- Grid responsivo com projetos
- Filtros por categoria (Todos, Web Apps, UI/UX Design, Landing Pages)
- **Carregamento dinâmico via JSON**
- Sistema de favoritos (LocalStorage)
- Botão "Carregar Mais"
- Hover reveal com informações do projeto

### 5️⃣ **Multimídia (Media)**
- **Embed de vídeo YouTube** com modal
- **Demo interativo** com botões de controle
- **Canvas de partículas animadas** (WebGL)

### 6️⃣ **Contato (Contact)**
- Formulário com validação JavaScript
- Campos: Nome, Email, Assunto, Mensagem
- Validação em tempo real
- Mensagens de feedback acessíveis (ARIA)
- Informações de contato com ícones

### 7️⃣ **Footer**
- Navegação rápida
- Links para redes sociais
- Créditos e copyright

---

## 🌐 Acessibilidade (WCAG)

### ✅ Implementações de Acessibilidade

- **HTML Semântico**: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- **Alt Text**: Todas as imagens possuem descrição alternativa
- **ARIA Labels**: Botões e links com labels descritivos
- **Navegação por Teclado**: Tab index e foco visível
- **Contraste de Cores**: Relação de contraste adequada (WCAG AA)
- **Focus Visible**: Estados de foco bem definidos
- **Screen Reader Support**: Estrutura navegável por leitores de tela
- **Form Labels**: Todos os campos de formulário com labels associados
- **Roles e ARIA**: Uso correto de roles (navigation, progressbar, etc.)

---

## 📱 Responsividade

### Mobile-First Approach

**Breakpoints:**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### Técnicas Utilizadas:

- **CSS Grid & Flexbox**: Layouts flexíveis e adaptáveis
- **Media Queries**: Ajustes específicos por dispositivo
- **Hamburger Menu**: Menu mobile com animação
- **Imagens Responsivas**: `max-width: 100%` e lazy loading
- **Viewport Units**: Uso de vw, vh para elementos fluidos
- **Touch-Friendly**: Áreas de toque adequadas (min 44px)

---

## 🎨 Técnicas CSS Avançadas

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Gradientes Dinâmicos
```css
background: linear-gradient(135deg, #0A1F44 0%, #2563eb 100%);
```

### Efeitos Glow/Neon
```css
box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
text-shadow: 0 0 10px rgba(37, 99, 235, 0.3);
```

### Animações CSS
- Fade in/out
- Slide animations
- Scale e rotate
- Pulse e bounce
- Shimmer effects

---

## 🚀 Tecnologias Utilizadas

### Core
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+**: Funcionalidades interativas

### Bibliotecas & APIs
- **Font Awesome 6**: Ícones
- **Google Fonts**: Tipografia (Inter, Poppins)
- **Intersection Observer API**: Scroll animations
- **LocalStorage API**: Persistência de dados
- **Fetch API**: Carregamento de JSON
- **Canvas API**: Animações de partículas

### Ferramentas
- **PWA**: Manifest + Service Worker
- **JSON**: Dados estruturados
- **Git/GitHub**: Controle de versão

---

## 🔧 Como Executar Localmente

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Editor de código (VS Code recomendado)
- Live Server (opcional, mas recomendado)

### Passo a Passo

1. **Clone o repositório:**
```bash
git clone https://github.com/QsGabriel/atividadefinal_frontend.git
```

2. **Navegue até a pasta:**
```bash
cd atividadefinal_frontend
```

3. **Abra com Live Server:**
   - Instale a extensão "Live Server" no VS Code
   - Clique com botão direito em `index.html`
   - Selecione "Open with Live Server"

**OU**

4. **Abra diretamente no navegador:**
   - Arraste o arquivo `index.html` para o navegador
   - **Nota**: Algumas funcionalidades (fetch JSON) podem não funcionar sem servidor local

---

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS em `css/style.css`:

```css
:root {
  --color-primary: #0A1F44;    /* Azul escuro principal */
  --color-secondary: #808080;   /* Cinza secundário */
  --color-white: #FFFFFF;       /* Branco */
  /* ... outras variáveis */
}
```

### Adicionar Projetos

Edite `data/projects.json`:

```json
{
  "id": 10,
  "title": "Seu Novo Projeto",
  "description": "Descrição detalhada",
  "category": "web",
  "image": "assets/img/portfolio/novo-projeto.jpg",
  "tags": ["React", "Node.js"],
  "liveUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

### Atualizar Informações Pessoais

Edite diretamente em `index.html`:
- Nome, profissão (seção Hero)
- Sobre mim (seção About)
- Links de redes sociais
- Email e telefone (seção Contact)

---

## 🧪 Validação e Testes

### ✅ Checklist de Qualidade

- [x] HTML validado (W3C Validator)
- [x] CSS validado (W3C CSS Validator)
- [x] JavaScript sem erros (ESLint)
- [x] Acessibilidade WCAG 2.1 AA
- [x] Responsividade em todos os breakpoints
- [x] Performance otimizada (Lighthouse 90+)
- [x] Cross-browser compatibility
- [x] PWA funcional

### Ferramentas de Teste Recomendadas

- **Lighthouse**: Performance, Accessibility, SEO, PWA
- **WAVE**: Acessibilidade web
- **axe DevTools**: Auditoria de acessibilidade
- **BrowserStack**: Testes cross-browser
- **PageSpeed Insights**: Performance

---

## 🌟 Extras Implementados

### ✨ Além do Básico

1. **PWA Completo**: Manifest + Service Worker + Cache Strategy
2. **Tema Claro/Escuro**: Com detecção de preferência do sistema
3. **Canvas de Partículas**: Animação generativa em tempo real
4. **Scroll Progress Bar**: Indicador de progresso de leitura
5. **Lazy Loading**: Carregamento otimizado de imagens
6. **Intersection Observer**: Animações ativadas por scroll
7. **Easter Egg**: Konami Code implementado
8. **Performance Monitoring**: Log de tempo de carregamento
9. **Focus Management**: Foco visual aprimorado para acessibilidade
10. **Hover Tilt Effect**: Efeito 3D nos cards

---

## 📊 Performance

### Otimizações Implementadas

- **Lazy Loading**: Imagens carregadas sob demanda
- **Minificação**: CSS e JS otimizados (para produção)
- **Caching**: Service Worker com estratégia Network First
- **Async/Defer**: Scripts carregados de forma assíncrona
- **Critical CSS**: Estilos críticos inline (opcional)
- **Image Optimization**: Formato WebP e compressão
- **CDN**: Google Fonts e Font Awesome via CDN

### Métricas Esperadas (Lighthouse)

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+
- **PWA**: ✅ Installable

---

## 📚 Recursos de Aprendizado

### Conceitos Aplicados

- **HTML Semântico**: Estrutura significativa
- **CSS Grid & Flexbox**: Layouts modernos
- **JavaScript Modular**: Código organizado em módulos
- **IIFE Pattern**: Encapsulamento de código
- **Event Delegation**: Performance em event listeners
- **Intersection Observer**: Performance em animações de scroll
- **LocalStorage**: Persistência de dados client-side
- **Fetch API**: Requisições assíncronas
- **Service Worker**: Cache e offline-first

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você tem sugestões, melhorias ou encontrou bugs:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👤 Autor

**Gabriel Queiroz de Souza**

- GitHub: [@QsGabriel](https://github.com/QsGabriel)
- LinkedIn: [Gabriel Queiroz](https://linkedin.com/in/gabriel-queiroz)
- Email: gabriel.queiroz@email.com

---

## 🙏 Agradecimentos

- Comunidade de desenvolvimento web
- Font Awesome pela biblioteca de ícones
- Google Fonts pelas tipografias
- Todos que contribuíram com feedback

---

## 📝 Notas Técnicas

### Compatibilidade de Navegadores

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 não suportado (uso de features modernas)

### Dependências Externas

- Google Fonts (Inter, Poppins)
- Font Awesome 6.4.0 (CDN)
- Nenhuma biblioteca JavaScript externa

---

**Desenvolvido com ❤️ e muito ☕ por Gabriel Queiroz**

*Última atualização: Novembro de 2025*
