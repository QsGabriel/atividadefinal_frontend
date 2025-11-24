# 📸 Guia de Imagens e Recursos

## Imagens Necessárias

Este arquivo lista todas as imagens que você precisa adicionar ao projeto para que ele funcione completamente.

---

## 📁 assets/img/

### profile.jpg
- **Dimensões recomendadas**: 800x800px
- **Formato**: JPG ou PNG
- **Descrição**: Sua foto profissional/pessoal
- **Localização**: `assets/img/profile.jpg`
- **Usado em**: Seção "Sobre Mim"

---

## 📁 assets/img/portfolio/

Adicione imagens para os projetos do portfólio:

### project-1.jpg até project-9.jpg
- **Dimensões recomendadas**: 1200x750px (16:10)
- **Formato**: JPG, PNG ou WebP
- **Descrição**: Screenshots ou mockups dos projetos
- **Localização**: `assets/img/portfolio/project-X.jpg`

**Lista de projetos:**
1. `project-1.jpg` - E-commerce Dashboard
2. `project-2.jpg` - Figma UI Kit - Fintech
3. `project-3.jpg` - Landing Page - SaaS
4. `project-4.jpg` - App de Gestão de Tarefas
5. `project-5.jpg` - Redesign - App Mobile
6. `project-6.jpg` - Portfolio Criativo
7. `project-7.jpg` - Plataforma de Cursos Online
8. `project-8.jpg` - Design System - Empresa
9. `project-9.jpg` - Landing Page - Startup Tech

### 💡 Dica para Placeholder
Enquanto não tiver as imagens reais, você pode usar serviços de placeholder:
- **https://via.placeholder.com/1200x750/0A1F44/FFFFFF?text=Project+1**
- **https://picsum.photos/1200/750** (imagens aleatórias)
- **https://placehold.co/1200x750/0A1F44/white/png?text=Projeto**

---

## 🎬 assets/videos/

### hero-background.mp4
- **Duração**: 10-30 segundos (loop)
- **Dimensões**: 1920x1080 (Full HD) ou 1280x720 (HD)
- **Formato**: MP4 (H.264 codec)
- **Tamanho**: < 5MB (para performance)
- **Descrição**: Vídeo de fundo para a seção Hero
- **Localização**: `assets/videos/hero-background.mp4`

**Alternativas gratuitas:**
- **Pexels Videos**: https://www.pexels.com/videos/
- **Pixabay**: https://pixabay.com/videos/
- **Coverr**: https://coverr.co/

**Sugestões de busca:**
- "technology background"
- "coding screen"
- "abstract blue"
- "particles animation"

### 💡 Placeholder para Vídeo
Se não tiver vídeo, pode:
1. Comentar a tag `<video>` no HTML
2. Usar apenas o gradient background
3. Adicionar uma imagem estática no lugar

---

## 🎨 assets/icons/

Ícones PWA em diferentes tamanhos:

### Tamanhos Necessários:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Como Criar:
1. Crie um ícone base (512x512px)
2. Use ferramentas online para gerar todos os tamanhos:
   - **https://realfavicongenerator.net/**
   - **https://www.favicon-generator.org/**

### Design Sugerido:
- Iniciais "GQ" em fonte moderna
- Fundo: Azul escuro (#0A1F44)
- Texto: Branco ou gradiente

---

## 📄 assets/

### cv-gabriel-queiroz.pdf
- **Descrição**: Seu currículo em PDF
- **Localização**: `assets/cv-gabriel-queiroz.pdf`
- **Usado em**: Botão "Download CV" na seção About

---

## 🔧 Como Adicionar Imagens Placeholder Temporárias

### Opção 1: Usando via.placeholder.com
Substitua no `data/projects.json`:
```json
"image": "https://via.placeholder.com/1200x750/0A1F44/FFFFFF?text=Nome+Projeto"
```

### Opção 2: Usando Picsum (imagens reais aleatórias)
```json
"image": "https://picsum.photos/1200/750?random=1"
```

### Opção 3: Criar imagens com CSS
Adicione uma classe no CSS:
```css
.placeholder-image {
  background: linear-gradient(135deg, #0A1F44 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}
```

---

## ✅ Checklist de Recursos

- [ ] Foto de perfil (profile.jpg)
- [ ] 9 imagens de projetos
- [ ] Vídeo de fundo hero (opcional)
- [ ] Ícones PWA (8 tamanhos)
- [ ] CV em PDF
- [ ] Favicon (16x16, 32x32)

---

## 🎨 Ferramentas Recomendadas

### Edição de Imagens
- **Photoshop / GIMP**: Edição profissional
- **Canva**: Design rápido e templates
- **Figma**: Design e prototipagem
- **Photopea**: Photoshop online gratuito

### Compressão
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim** (Mac)

### Vídeos
- **HandBrake**: Compressão de vídeo
- **CloudConvert**: Conversão online
- **FFmpeg**: Linha de comando (avançado)

---

## 📝 Notas Importantes

1. **Otimize sempre as imagens** antes de adicionar ao projeto
2. **Use WebP** quando possível (melhor compressão)
3. **Mantenha tamanhos adequados** para não prejudicar a performance
4. **Use lazy loading** para imagens abaixo da dobra
5. **Adicione alt text descritivo** em todas as imagens

---

**Última atualização**: Novembro 2025
