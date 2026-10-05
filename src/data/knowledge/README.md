# Knowledge Hub — mode d'emploi

Chaque dossier est un **track** (parcours d'apprentissage / de recherche). Les
tracks sont déclarés dans `src/knowledge.config.ts` : titre, URL (`slug`),
ordre et activation (`enabled`). Le nom du dossier doit être l'`id` du track.

```text
src/data/knowledge/
└── <track>/
    ├── overview.md                      description + présentation du track
    ├── courses/
    │   └── <cours>/
    │       ├── course.md                fiche du cours
    │       └── modules/
    │           └── 04-self-attention/   le numéro donne l'ordre
    │               ├── note.md          la note du module
    │               └── assets/          images, vidéos, PDF, notebooks…
    ├── notes/<note>.md                  ou notes/<note>/note.md + assets/
    ├── experiments/<expérience>.md
    ├── projects/<projet>.md
    ├── papers/<paper>.md
    ├── references/<référence>.md
    └── journal/2026-09-15.md            la date du nom de fichier sert de titre
```

Les modèles prêts à copier sont dans `_modeles/` (ignoré par le site, comme
tout fichier ou dossier qui commence par `_`).

## Ce qui est publié

Rien n'est public par défaut. En production :

| Élément                                             | Publié si…                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| Track                                               | `enabled: true` dans `src/knowledge.config.ts`                            |
| Cours                                               | `status` dans `publicStatuses` (par défaut `in-progress`, `completed`)    |
| Module                                              | son cours est publié, son `status` est public **et** `visibility: public` |
| Note, expérience, projet, paper, référence, journal | `visibility: public` (et, s'il y a un `status`, un statut public)         |

Statuts : `planned` (invisible), `in-progress` (visible), `completed`
(visible), `paused` (invisible par défaut), `abandoned` (invisible). La liste
des statuts publics se règle dans `publicStatuses`.

Un contenu non publié n'a ni page, ni aperçu, ni fichier joint, ni entrée dans
le sitemap ou la recherche : le filtrage se fait au build. En local
(`npm run dev`), tout reste consultable avec un badge « Non publié ».

## Progression

Les barres de la page d'un track sont calculées à partir des modules des cours
affichés et des expériences qui ont un statut : `completed` = 100 %,
`in-progress` = 50 %, sinon 0 % ; le champ `progress: 0-100` remplace ce calcul.
Les modules sont regroupés par `area` (Foundation, Architecture…), dans l'ordre
du champ `areas` de `overview.md` ; sans `area`, par cours.

## Fichiers joints

Dans une note, les chemins relatifs fonctionnent :

```md
![Architecture](./assets/images/architecture.png)
[Télécharger le notebook](./assets/files/example.ipynb)
<video src="./assets/videos/demo.mp4" controls></video>
```

Les images Markdown sont optimisées par Astro ; les autres fichiers sont
publiés sous `/knowledge-files/…`, uniquement s'ils sont cités par une note
publiée.

## Ajouter un track

1. Ajouter une entrée dans `src/knowledge.config.ts`
   (`{ id: "diffusion-models", title: "Diffusion Models", slug: "diffusion-models", enabled: false, order: 8 }`).
2. Créer `src/data/knowledge/diffusion-models/overview.md` (voir `_modeles/overview.md`).
3. Passer `enabled` à `true` quand le track est prêt à être publié.

Aucun composant à créer : le header, le hub et les pages sont génériques.
