# Brand Guidelines

## Objectif

Ce guide de branding sert de référence pour ton portfolio et tous tes futurs projets. Il définit le ton, la structure de contenu et les éléments visuels à conserver pour assurer une expérience cohérente et professionnelle.

## Positionnement

- Nom : **Franklin KANA NGUEDIA**
- Rôle principal : **Data Engineer & AI Engineer**
- Valeur clé : transformer des données complexes en solutions métier robustes et industrialisables.

## Identité visuelle (en place sur le site)

Les valeurs ci-dessous font foi : ce sont celles du site et des aperçus de liens.

### Nom

- **Franklin KN** partout : header, onglet du navigateur, pied de page, aperçus de liens, badge. Il s'écrit en deux couleurs, comme « Sebastian Raschka » : « Franklin » dans la couleur du texte, « KN » en couleur d'accent.
- Le nom complet (Franklin KANA NGUEDIA) n'apparaît que dans les descriptions : méta-description, bio de la page À propos, textes alternatifs des images.

### Thèmes de couleurs

Deux thèmes, choisis par la variable d'environnement `PUBLIC_THEME` (source unique des couleurs : `src/utils/theme.ts`) :

- **`ambre`** (par défaut) : charbon + ambre.
- **`classique`** : blanc + bleu nuit.

Où la définir :

- en local, dans `.env` (modèle : `.env.example`), puis relancer `npm run dev` ;
- en production, dans GitHub : Settings > Secrets and variables > Actions > Variables > `PUBLIC_THEME`, puis relancer le déploiement. Sans variable, le site est en `ambre`.

| Rôle | Ambre clair | Ambre sombre | Classique clair | Classique sombre |
| --- | --- | --- | --- | --- |
| Fond | `#faf9f6` | `#18181b` | `#ffffff` | `#0f1216` |
| Texte | `#1c1b19` | `#e8e6e1` | `#1f2328` | `#e6e8eb` |
| Texte secondaire | `#6b6a63` | `#a1a09a` | `#5b6470` | `#9aa3ae` |
| Accent (liens) | `#8a5e12` | `#d4a843` | `#1a5fb4` | `#6ea8fe` |
| Surface | `#efece4` | `#27272a` | `#f5f6f8` | `#171b21` |
| Bordures | `#e3e0d7` | `#3a3a40` | `#e2e5e9` | `#2a3038` |
| Icône (fond) | `#8a5e12` | `#d4a843` | `#1b365d` | `#1b365d` |

### Logo et icône

- **Logo** : le nom « Franklin KN » en Inter Regular, « KN » en couleur d'accent, avec en option « DATA & AI ENGINEER » dessous (Inter Medium, espacé). Pas de symbole : le header n'affiche que le nom.
- **Icône** (onglet du navigateur, écran d'accueil iOS, avatars) : le mot « Franklin » en Inter ExtraBold dans un carré aux coins arrondis, aux couleurs du thème. À 16 px, le mot n'est pas lisible ; il l'est à partir de 32 px (écrans haute résolution).
- Fichiers dans `public/brand/<thème>/`, aussi en ligne sur `https://fkdia23.github.io/brand/<thème>/<fichier>` :

| Fichier | Usage |
| --- | --- |
| `franklin-kn-icon.svg`, `-512.png`, `-1024.png` | Avatar (GitHub, LinkedIn, Hugging Face), icône, sur fond clair |
| `franklin-kn-icon-dark-bg.svg`, `-dark-bg-512.png` | Icône sur fond sombre |
| `franklin-kn-logo.svg`, `.png` | CV, slides, documents sur fond clair |
| `franklin-kn-logo-dark-bg.svg`, `.png` | Fonds sombres |
| `../franklin-kn-logo-black.svg`, `../franklin-kn-logo-white.svg` | Monochrome : impression, filigrane |

Règles d'usage : garder autour du logo une marge d'au moins la hauteur du « K » ; ne pas le déformer, le recolorer hors des couleurs ci-dessus ni changer sa police.

### Typographie

- **Inter** (400 à 800), auto-hébergée dans `public/fonts/` : textes du site, nom, icône (vectorisée), aperçus de liens, badge.
- Code : police monospace du système.

## Ton & message

- Professionnel, direct et orienté valeur métier.
- Axé sur la fiabilité, la performance et l'observabilité.
- Pas de jargon inutile : chaque phrase doit expliquer un avantage ou une compétence.
- Accent sur l'impact concret : réduction de coût, qualité des données, production, industrialisation.

## Éléments de page à conserver

1. Titre clair avec ton nom et ta spécialité.
2. Sous-titre court positionnant ta proposition de valeur.
3. Phrase d'accroche détaillant l’impact métier et technique.
4. Liste de compétences principales visibles immédiatement.
5. Section projets clés avec preuves concrètes.
6. Section impact / résultats métiers.
7. Liens utiles pour faciliter la prise de contact.

## Structure recommandée

- HERO
  - Photo professionnelle / visuelle personnelle
  - Nom + fonction
  - Accroche de valeur
  - Liste de technologies / expertises
  - Calls to action : projets, à propos, contact

- Compétences & expertise
  - Éléments courts et faciles à scanner
  - Utiliser des bullets ou des badges

- Projets clés
  - Titre du projet
  - Description courte du contexte et du résultat
  - Technologies utilisées

- Impact
  - Résultats mesurables ou bénéfices métiers
  - Exemples concrets de transformation

- Liens utiles
  - Portfolio
  - GitHub
  - LinkedIn
  - Contact

## UI / UX

- Minimalisme et clarté : espace, typographie aérée, contrastes nets.
- Prioriser la lisibilité mobile-first.
- Utiliser une hiérarchie visuelle forte : gros titre, sous-titre, paragraphes courts.
- Appels à l’action visibles et simples.
- Favoriser la navigation fluide entre présentation, projets et contact.
- Organiser les pages en sections distinctes avec des blocs espacés.
- Préférer les interactions légères : hover doux, transitions subtiles, micro-animations discrètes.
- Limiter le nombre de polices à deux familles au maximum pour rester cohérent.
- Faire remonter en priorité les informations clés : expertise, projets, résultats.
- Utiliser des icônes et des boutons clairs pour guider l’utilisateur.
- Assurer une expérience homogène sur desktop et mobile, avec des marges généreuses et des boutons faciles à cliquer.

## Couleurs et palette

- Couleur principale : accent profond et professionnel (exemple : bleu pétrole, bleu nuit ou vert foncé). Cela renforce la confiance et la stabilité.
- Couleur secondaire : neutre clair pour les fonds (exemple : gris pâle, blanc cassé) afin de mettre en valeur le contenu.
- Couleur de texte principal : sombre et lisible (anthracite ou gris très foncé).
- Couleur de texte secondaire : gris neutre pour les descriptions et petits éléments.
- Couleur d’action : accent vif pour les boutons et liens importants (orange doux, vert jade ou bleu cyan selon l’ambiance souhaitée).
- Couleur d’état / survol : version plus foncée ou légèrement plus saturée de l’accent principal.
- Utiliser le contraste élevé pour les boutons et CTA, et laisser des espaces blancs autour des sections importantes.
- Garder une palette restreinte de 3 à 4 couleurs maximum pour ne pas surcharger la page.

## Call-to-action

- Boutons : formes arrondies modérées, grandes zones cliquables, texte en majuscules modérées ou clair.
- Texte de bouton : action directe et orientée valeur (ex. "Voir mes projets", "Découvrir mes expertises", "Me contacter").
- Éviter les CTA multiples sur la même ligne ; privilégier un bouton principal et un bouton secondaire.
- Toujours proposer une action en fin de section : en savoir plus, lire un projet, envoyer un message.

## Typographie

- Police principale : une fonte sans empattement moderne et élégante (exemples : Inter, Poppins, Space Grotesk, Nunito).
- Police secondaire : variante plus neutre pour les textes longs ou les paragraphes (exemple : Roboto, Open Sans, Public Sans).
- Hiérarchie typographique : titre H1 large, H2/H3 avec un espacement clair, paragraphes avec une hauteur de ligne confortable.
- Poids : utiliser semibold/medium pour les titres et regular pour les textes courants.
- Taille : conserver des tailles lisibles sur mobile (16px minimum pour le texte, 36px+ pour les titres principaux).
- Style : éviter les polices fantaisie ; privilégier la sobriété et la clarté.

## Branding futur

Utilise ces règles pour créer de nouveaux sites ou landing pages :

- Garder le même ton et les mêmes mots-clés (Data Engineer, AI Engineer, Airflow, Spark, RAG, Neo4j, FinOps, Observabilité).
- Reprendre la structure "HERO → compétences → projets → impact → contacts".
- Conserver la cohérence visuelle sur toutes les pages : même palette simple, mêmes types de boutons, mêmes styles de badges.
- Mettre en avant les résultats plutôt que la liste exhaustive d’outils.

## Exemple de phrase de branding

- "Je conçois des architectures data et IA robustes pour transformer des données complexes en produits métier opérationnels."
- "Je développe des pipelines Airflow, des systèmes RAG et des graphes Neo4j avec un pilotage orienté observabilité et FinOps."

## Recommandation de style

- Couleurs : neutres + accent unique pour les actions.
- Typographie : lisible, moderne, sans empattement.
- Iconographie : simple, efficace, orientée tech.
- Visuels : portraits pro + captures de projets ou schémas d'architecture.

## Usage

Ce guide doit être utilisé comme base pour :

- ton portfolio actuel,
- les pages "À propos" et "Projets",
- les futurs sites de présentation,
- les documents de communication personnelle.
