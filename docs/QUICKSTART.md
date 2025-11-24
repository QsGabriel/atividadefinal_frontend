# 🚀 Guia de Início Rápido

## ⚡ Começando em 5 Minutos

### 1. Abrir o Projeto

**Opção A: Com Live Server (Recomendado)**
1. Abra o VS Code
2. Instale a extensão "Live Server"
3. Clique com botão direito em `index.html`
4. Selecione "Open with Live Server"

**Opção B: Direto no Navegador**
1. Navegue até a pasta do projeto
2. Arraste `index.html` para o navegador
3. ⚠️ Algumas funcionalidades podem não funcionar (CORS)

---

## 📋 Primeiros Passos

### 1. Personalizar Informações

Edite `index.html` e procure por:

```html
<!-- Seu Nome -->
<span class="hero-name">Gabriel Queiroz</span>

<!-- Seu Email -->
<a href="mailto:gabriel.queiroz@email.com">

<!-- Suas Redes Sociais -->
<a href="https://github.com/QsGabriel">
```

### 2. Adicionar Suas Imagens

Veja o arquivo `IMAGES_GUIDE.md` para detalhes completos.

**Imagens essenciais:**
- `assets/img/profile.jpg` - Sua foto (800x800px)
- `assets/img/portfolio/project-X.jpg` - Screenshots dos projetos

**Placeholder temporário:**
```json
"image": "https://via.placeholder.com/1200x750/0A1F44/FFFFFF?text=Meu+Projeto"
```

### 3. Adicionar Seus Projetos

Edite `data/projects.json`:

```json
{
  "id": 10,
  "title": "Seu Projeto Novo",
  "description": "Descrição do que você fez",
  "category": "web",
  "image": "assets/img/portfolio/projeto-novo.jpg",
  "tags": ["React", "Node.js"],
  "liveUrl": "https://seu-site.com",
  "githubUrl": "https://github.com/seu-usuario/projeto"
}
```

---

## 🎨 Personalização Rápida

### Mudar Cores

Edite `css/style.css`:

```css
:root {
  --color-primary: #0A1F44;    /* Sua cor principal */
  --color-secondary: #808080;   /* Sua cor secundária */
}
```

### Mudar Fontes

No `<head>` do `index.html`, altere o Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte&display=swap">
```

E no CSS:
```css
:root {
  --font-primary: 'SuaFonte', sans-serif;
}
```

---

## 🔧 Funcionalidades Ativas

### ✅ O que já está funcionando:

1. **Navegação Suave** - Clique nos links do menu
2. **Menu Mobile** - Teste redimensionando a janela
3. **Tema Claro/Escuro** - Botão no header
4. **Scroll Progress** - Barra azul no topo
5. **Animações** - Rolagem da página ativa animações
6. **Portfolio Dinâmico** - Carregado do JSON
7. **Favoritos** - Clique na estrela dos projetos
8. **Filtros** - Botões acima do portfólio
9. **Validação de Formulário** - Preencha o formulário de contato
10. **Partículas Animadas** - Canvas na seção multimídia

---

## 🧪 Testando Funcionalidades

### Tema Claro/Escuro
1. Clique no ícone da lua/sol no header
2. Tema deve mudar e persistir ao recarregar

### Favoritos
1. Vá até a seção Portfolio
2. Clique na estrela de um projeto
3. Recarregue a página - favorito deve estar salvo

### Formulário
1. Preencha com dados inválidos
2. Veja as mensagens de erro
3. Preencha corretamente e envie

### Smooth Scroll
1. Clique em qualquer link do menu
2. Página deve rolar suavemente até a seção

---

## 📱 Testar Responsividade

### No Navegador:
1. Pressione `F12` para abrir DevTools
2. Clique no ícone de dispositivo móvel
3. Teste diferentes tamanhos:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1440px)

### Pontos de teste:
- [ ] Menu vira hamburger no mobile
- [ ] Cards empilham verticalmente
- [ ] Botões ficam em coluna
- [ ] Texto é legível em todos os tamanhos
- [ ] Imagens se redimensionam

---

## 🐛 Problemas Comuns

### Projetos não aparecem
**Problema**: `data/projects.json` não carrega
**Solução**: Use Live Server ou servidor local (não funciona com file://)

### Vídeo não aparece
**Problema**: Arquivo `hero-background.mp4` não existe
**Solução**: Adicione o vídeo ou comente a tag `<video>` no HTML

### Imagens quebradas
**Problema**: Imagens não estão na pasta correta
**Solução**: Use placeholders temporários (veja IMAGES_GUIDE.md)

### Service Worker não funciona
**Problema**: Precisa de HTTPS ou localhost
**Solução**: Use Live Server ou hospede em HTTPS

---

## 📦 Preparar para Produção

### 1. Otimizar Imagens
- Use TinyPNG ou Squoosh
- Converta para WebP quando possível
- Mantenha < 200KB por imagem

### 2. Minificar Arquivos
- Use ferramentas online para minificar CSS/JS
- Ou: `npx uglify-js js/*.js -o js/bundle.min.js`

### 3. Testar Performance
- Lighthouse no Chrome DevTools
- Meta: 90+ em todas as métricas

### 4. Validar Código
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/
- Acessibilidade: https://wave.webaim.org/

---

## 🚀 Deploy (Hospedagem)

### Opções Gratuitas:

**1. GitHub Pages**
```bash
# No repositório GitHub, vá em Settings > Pages
# Selecione branch main e pasta root
# Salve e aguarde deploy
```

**2. Netlify**
1. Arraste a pasta do projeto em netlify.com/drop
2. Ou conecte com GitHub para deploy automático

**3. Vercel**
```bash
npm i -g vercel
vercel
```

**4. Cloudflare Pages**
- Conecte repositório GitHub
- Configure build settings
- Deploy automático em commits

---

## 📚 Próximos Passos

### Melhorias Sugeridas:

1. **SEO**
   - Adicione meta tags Open Graph
   - Crie sitemap.xml
   - Configure robots.txt

2. **Analytics**
   - Google Analytics
   - Microsoft Clarity
   - Hotjar

3. **Formulário Real**
   - Integrar com FormSpree
   - Ou usar Netlify Forms
   - Ou criar backend próprio

4. **CMS**
   - Adicionar CMS headless (Strapi, Contentful)
   - Para gerenciar projetos sem editar JSON

5. **Blog**
   - Adicionar seção de blog
   - Usar Markdown para posts

---

## 💡 Dicas de Customização

### Adicionar Nova Seção
1. Copie estrutura HTML de seção existente
2. Adicione ID único
3. Adicione link no menu
4. Estilize no CSS

### Adicionar Animação
```javascript
// Em animations.js
document.querySelector('.seu-elemento').addEventListener('mouseenter', () => {
  element.style.transform = 'scale(1.1)';
});
```

### Adicionar Nova Funcionalidade JS
1. Crie arquivo em `/js/`
2. Importe no `index.html` antes de `</body>`
3. Use padrão IIFE para encapsular

---

## 🆘 Precisa de Ajuda?

### Recursos:
- **MDN Web Docs**: https://developer.mozilla.org/
- **CSS Tricks**: https://css-tricks.com/
- **Stack Overflow**: https://stackoverflow.com/

### Documentação do Projeto:
- `README.md` - Documentação completa
- `IMAGES_GUIDE.md` - Guia de imagens
- Comentários no código fonte

---

## ✅ Checklist Final

Antes de publicar:

- [ ] Todas as informações pessoais atualizadas
- [ ] Imagens reais adicionadas (não placeholders)
- [ ] Links de redes sociais corretos
- [ ] Projetos reais no JSON
- [ ] Email de contato funcionando
- [ ] CV atualizado para download
- [ ] Testado em múltiplos navegadores
- [ ] Testado em dispositivos móveis
- [ ] Performance > 90 no Lighthouse
- [ ] Sem erros no console
- [ ] Validação W3C passando

---

**Boa sorte com seu portfólio! 🎉**

Se tiver dúvidas, leia o README.md completo ou consulte os comentários no código.
