# 📘 Documentação Técnica do Projeto

## 🎯 Visão Geral

Este documento explica as **escolhas técnicas**, **arquitetura** e **boas práticas** implementadas no projeto.

---

## 🏗️ Arquitetura do Projeto

### Padrão Utilizado: **Modular**

Cada funcionalidade JavaScript está em seu próprio arquivo, seguindo o princípio de **separação de responsabilidades**.

```
/js
├── main.js          → Inicializações gerais e coordenação
├── theme.js         → Gerenciamento de tema
├── navigation.js    → Menu e navegação
├── scroll.js        → Scroll behaviors
├── portfolio.js     → Lógica do portfólio
├── form.js          → Validação de formulário
├── animations.js    → Animações e observers
└── media.js         → Controles de mídia
```

### Por que modular?
- **Manutenibilidade**: Fácil encontrar e editar código específico
- **Reutilização**: Módulos podem ser reaproveitados
- **Debugging**: Isolar problemas é mais simples
- **Performance**: Carregar apenas o necessário

---

## 💡 Escolhas Técnicas

### 1. **Vanilla JavaScript** (sem frameworks)

**Por quê?**
- ✅ **Performance**: Sem overhead de frameworks
- ✅ **Aprendizado**: Entender fundamentos
- ✅ **Compatibilidade**: Funciona em qualquer navegador moderno
- ✅ **Tamanho**: Bundle final muito menor

**Quando usar frameworks?**
- Projetos grandes e complexos
- Necessidade de gerenciamento de estado avançado
- Times grandes com convenções estabelecidas

### 2. **CSS Custom Properties** (Variáveis CSS)

```css
:root {
  --color-primary: #0A1F44;
  --spacing-md: 1rem;
}
```

**Vantagens:**
- Facilita temas dinâmicos
- Centraliza valores reutilizáveis
- Suporte nativo do navegador
- Pode ser alterado via JavaScript

### 3. **Intersection Observer API**

```javascript
const observer = new IntersectionObserver(callback, options);
```

**Por que não scroll events?**
- ✅ Melhor performance (não bloqueia main thread)
- ✅ Nativo do navegador
- ✅ Mais preciso para detectar visibilidade
- ❌ Scroll events disparam centenas de vezes

### 4. **LocalStorage** para Persistência

**Casos de uso:**
- Tema claro/escuro
- Favoritos do portfólio
- Preferências do usuário

**Limitações:**
- Máximo 5-10MB
- Apenas strings (precisa JSON.stringify)
- Síncrono (pode bloquear em grandes volumes)

**Alternativas:**
- **IndexedDB**: Para grandes volumes
- **SessionStorage**: Apenas durante a sessão
- **Cookies**: Para comunicação com servidor

### 5. **IIFE Pattern** (Immediately Invoked Function Expression)

```javascript
(function() {
  'use strict';
  // código isolado
})();
```

**Por quê?**
- Evita poluição do escopo global
- Previne conflitos de nomes
- Encapsula variáveis privadas
- Padrão comum em JavaScript vanilla

### 6. **Fetch API** para JSON

```javascript
const response = await fetch('data/projects.json');
const data = await response.json();
```

**Por que não XMLHttpRequest?**
- ✅ Sintaxe mais limpa
- ✅ Baseado em Promises
- ✅ Suporte a async/await
- ✅ API moderna do navegador

### 7. **Service Worker** para PWA

**Estratégia escolhida: Network First**

```javascript
// Tenta buscar da rede primeiro
// Se falhar, usa cache
```

**Por quê?**
- Conteúdo sempre atualizado quando online
- Fallback para offline
- Ideal para sites com atualizações frequentes

**Alternativas:**
- **Cache First**: Prioriza velocidade
- **Stale While Revalidate**: Mostra cache e atualiza background

---

## 🎨 CSS: Escolhas de Design

### 1. **Mobile-First**

```css
/* Estilos base para mobile */
.card { width: 100%; }

/* Desktop via media query */
@media (min-width: 768px) {
  .card { width: 50%; }
}
```

**Vantagens:**
- Foco em performance mobile
- Progressivo enhancement
- Menos código para sobrescrever

### 2. **Glassmorphism**

```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
```

**Considerações:**
- ✅ Moderno e elegante
- ⚠️ Pode afetar performance em devices antigos
- ✅ Fallback: background sólido

### 3. **CSS Grid vs Flexbox**

**Grid usado para:**
- Layouts 2D (linhas E colunas)
- Portfolio grid
- Footer

**Flexbox usado para:**
- Layouts 1D (linha OU coluna)
- Navbar
- Cards internos
- Centralização

### 4. **Variáveis de Design Token**

```css
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
```

**Benefícios:**
- Consistência visual
- Fácil manutenção
- Design system escalável

---

## ⚡ Performance

### Otimizações Implementadas

#### 1. **Lazy Loading de Imagens**
```html
<img loading="lazy" src="...">
```
- Carrega apenas quando próximo do viewport
- Economiza banda e tempo inicial

#### 2. **Async/Defer em Scripts**
```html
<script src="..." defer></script>
```
- Não bloqueia renderização
- Executa após DOM pronto

#### 3. **CSS em Múltiplos Arquivos**
```html
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="responsive.css">
<link rel="stylesheet" href="animations.css">
```

**Por quê separar?**
- Melhor organização
- Cache individual
- Facilita manutenção

**Em produção:**
- Concatenar e minificar em um único arquivo

#### 4. **Event Delegation**
```javascript
// ❌ Ruim: listener em cada elemento
items.forEach(item => {
  item.addEventListener('click', handler);
});

// ✅ Bom: um listener no pai
parent.addEventListener('click', (e) => {
  if (e.target.matches('.item')) handler(e);
});
```

#### 5. **Debounce/Throttle** (considerado)

Para eventos que disparam muito:
```javascript
window.addEventListener('scroll', throttle(handleScroll, 100));
```

---

## ♿ Acessibilidade

### Implementações WCAG 2.1

#### 1. **HTML Semântico**
```html
<header>, <nav>, <main>, <section>, <article>, <footer>
```
- Estrutura clara para screen readers
- Melhor SEO
- Navegação por landmarks

#### 2. **ARIA Labels**
```html
<button aria-label="Alternar tema claro/escuro">
```
- Contexto para elementos visuais
- Essencial para ícones sem texto

#### 3. **Form Accessibility**
```html
<label for="name">Nome</label>
<input id="name" aria-required="true" aria-describedby="nameError">
<span id="nameError" role="alert"></span>
```

#### 4. **Keyboard Navigation**
```css
:focus-visible {
  outline: 2px solid #2563eb;
}
```
- Foco visível para navegação por teclado
- Removido em cliques de mouse

#### 5. **Contraste de Cores**
- Relação mínima 4.5:1 para texto normal
- 3:1 para texto grande
- Testado com ferramentas WCAG

---

## 🔒 Segurança

### Boas Práticas Aplicadas

#### 1. **rel="noopener noreferrer"**
```html
<a href="..." target="_blank" rel="noopener noreferrer">
```
- Previne tabnabbing
- Protege informações de referrer

#### 2. **Content Security Policy** (recomendado para produção)
```html
<meta http-equiv="Content-Security-Policy" content="...">
```

#### 3. **Sanitização de Inputs**
```javascript
// Em produção, validar também no servidor
const sanitized = input.trim().replace(/<script>/gi, '');
```

#### 4. **HTTPS Only**
- PWA requer HTTPS
- Service Worker requer HTTPS (exceto localhost)

---

## 📊 Métricas e Monitoramento

### Performance Metrics

```javascript
// Implementado em main.js
const perfData = performance.getEntriesByType('navigation')[0];
const loadTime = perfData.loadEventEnd - perfData.fetchStart;
```

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Como medir:
1. Lighthouse (Chrome DevTools)
2. PageSpeed Insights
3. WebPageTest
4. Chrome User Experience Report

---

## 🧪 Testing

### Testes Recomendados

#### 1. **Validação HTML/CSS**
- W3C HTML Validator
- W3C CSS Validator
- Lighthouse

#### 2. **Cross-Browser**
- Chrome, Firefox, Safari, Edge
- BrowserStack ou LambdaTest

#### 3. **Responsividade**
```
Testar em:
- 320px (iPhone SE)
- 375px (iPhone X)
- 768px (iPad)
- 1024px (Tablet landscape)
- 1440px (Desktop)
- 1920px (Desktop large)
```

#### 4. **Acessibilidade**
- axe DevTools
- WAVE
- Lighthouse Accessibility
- Testes manuais com teclado

#### 5. **Performance**
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://seu-site.com --view
```

---

## 🚀 Deploy e Produção

### Checklist Pré-Deploy

- [ ] Minificar CSS e JS
- [ ] Otimizar imagens (WebP, compressão)
- [ ] Configurar cache headers
- [ ] Ativar compressão GZIP/Brotli
- [ ] Configurar CDN (opcional)
- [ ] Configurar SSL/TLS
- [ ] Testar Service Worker
- [ ] Validar manifest.json
- [ ] Testar em dispositivos reais
- [ ] Configurar analytics

### Build para Produção

```bash
# Minificar CSS
npx clean-css-cli css/*.css -o dist/style.min.css

# Minificar JS
npx uglify-js js/*.js -o dist/bundle.min.js

# Otimizar imagens
npx imagemin assets/img/* --out-dir=dist/img
```

---

## 📚 Recursos e Referências

### Documentação
- [MDN Web Docs](https://developer.mozilla.org/)
- [web.dev](https://web.dev/)
- [CSS Tricks](https://css-tricks.com/)

### Ferramentas
- [Can I Use](https://caniuse.com/) - Compatibilidade
- [BundlePhobia](https://bundlephobia.com/) - Tamanho de pacotes
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Inspiração
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)
- [Behance](https://www.behance.net/)

---

## 🔄 Versionamento

### Estrutura de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug
style: mudanças de estilo
refactor: refatoração de código
docs: atualiza documentação
perf: melhoria de performance
test: adiciona testes
```

### Exemplo:
```bash
git commit -m "feat: adiciona sistema de favoritos com localStorage"
```

---

## 💭 Considerações Finais

### Escalabilidade

Para projetos maiores, considere:
- **TypeScript**: Tipagem estática
- **Build Tools**: Webpack, Vite, Parcel
- **CSS Preprocessors**: Sass, Less
- **Frameworks**: React, Vue, Svelte
- **State Management**: Redux, Zustand
- **Testing**: Jest, Cypress, Playwright

### Manutenibilidade

- Mantenha comentários atualizados
- Documente decisões importantes
- Use naming conventions consistentes
- Escreva código auto-explicativo
- Faça code reviews

---

**Documentação criada em Novembro de 2025**  
**Versão do Projeto: 1.0.0**
