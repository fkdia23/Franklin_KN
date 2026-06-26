# Dossier vidéos

Déposez ici vos fichiers vidéo servis tels quels par le site.
Ils sont accessibles via le chemin `/assets/videos/<fichier>`.

## Formats recommandés

| Usage | Format | Conseil |
|-------|--------|---------|
| Démo avec son / contrôles | `.mp4` (H.264) | Le plus compatible. |
| Alternative moderne | `.webm` (VP9/AV1) | Plus léger, à fournir en second `<source>`. |
| Animation type GIF | `.mp4` muet en boucle | **5 à 10× plus léger** qu'un vrai `.gif`. |

## Exemples de noms

- `demo.mp4` — vidéo de démonstration d'un projet
- `demo-poster.jpg` — image d'aperçu (poster) affichée avant lecture
- `pipeline-loop.mp4` — animation courte en boucle (remplace un GIF)

## Convertir un GIF en MP4 (recommandé)

```bash
ffmpeg -i animation.gif -movflags faststart -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" pipeline-loop.mp4
```

## Rappel d'intégration dans un post `.md`

Voir le post de démonstration `media-demo` (visible en local uniquement,
`draft: true`) ou utilisez les snippets VS Code : `video`, `gifvideo`, `embed`.
