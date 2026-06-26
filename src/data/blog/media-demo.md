---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-06-25T10:00:00.000Z
modDatetime: 2026-06-25T10:00:00.000Z
title: "Démo — vidéos & GIF dans les posts"
slug: media-demo
featured: false
draft: true
tags:
  - Démo
  - Documentation
description: >
  Post de démonstration (visible en local uniquement) montrant comment
  intégrer des vidéos, des animations type GIF et des embeds YouTube
  dans un post markdown.
---

Ce post est un **bac à sable** pour les médias. Il est en `draft: true` : il
s'affiche uniquement en local (`npm run dev`) et reste **caché en production**.
Déposez vos fichiers dans `public/assets/videos/` puis remplacez les chemins
ci-dessous.

## 1. Vidéo auto-hébergée (avec contrôles)

Idéal pour une démo de projet avec son et barre de lecture.

<video class="post-video" controls preload="metadata" poster="/assets/videos/demo-poster.jpg">
  <source src="/assets/videos/demo.webm" type="video/webm" />
  <source src="/assets/videos/demo.mp4" type="video/mp4" />
  Votre navigateur ne supporte pas la lecture vidéo.
</video>

> Le `poster` est l'image affichée avant lecture. Fournir `.webm` **puis**
> `.mp4` laisse le navigateur choisir le format le plus léger qu'il supporte.

## 2. Animation type GIF (vidéo en boucle)

Pour une boucle courte (ex. un pipeline qui s'anime). Une vidéo `muted loop`
est **bien plus légère** qu'un vrai `.gif`.

<video class="post-video" autoplay loop muted playsinline>
  <source src="/assets/videos/pipeline-loop.mp4" type="video/mp4" />
</video>

## 3. GIF classique (comme image)

Si vous tenez à un vrai `.gif`, il s'intègre comme une image markdown :

![Animation de démonstration](/assets/images/demo.gif)

## 4. Embed YouTube / Vimeo (responsive 16:9)

Pour une vidéo hébergée en ligne, sans alourdir le repo.

<div class="embed">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Vidéo de démonstration"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

---

## Aide-mémoire

| Besoin | Bloc à utiliser | Snippet VS Code |
|--------|-----------------|-----------------|
| Démo avec contrôles | `<video class="post-video" controls>` | `video` |
| Boucle type GIF | `<video class="post-video" autoplay loop muted>` | `gifvideo` |
| GIF image | `![alt](/assets/images/x.gif)` | `gif` |
| YouTube/Vimeo | `<div class="embed"><iframe …></div>` | `embed` |

> Une fois ce système validé, vous pouvez **supprimer ce post de démo** ou le
> laisser en `draft: true` comme référence interne.
