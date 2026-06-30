---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-06-26T09:00:00.000Z
modDatetime: 2026-06-26T09:00:00.000Z
title: "Candidature AFNOR — Ingénieur IA & Data : ma timeline projets"
slug: candidature-afnor-ingenieur-ia-data
featured: true
draft: false
tags:
  - Candidature
  - LLM
  - RAG
  - Fine-tuning
  - NextJS
github: https://github.com/fkdia23
description: >
  Sélection de 4 projets IA & Data présentés en timeline pour le poste
  d'Ingénieur IA & Data au Pôle Innovation & Data Science d'AFNOR :
  agents LLM, tools, APIs mutualisées, fine-tuning, RAG traçable et
  assistant conversationnel auto-hébergé.
---

Le **Pôle Innovation & Data Science d'AFNOR** développe un écosystème d'**agent
multifonction** — gestion de bases documentaires, exposition d'**APIs**,
diffusion mutualisée des capacités IA — et des **projets de data science
appliquée**. Cette page rassemble **4 projets** qui couvrent exactement ce
périmètre : développement d'applications LLM, orchestration de _tools_,
fine-tuning, RAG traçable et assistant conversationnel.

> Pour chaque projet : le **lien direct avec les missions du poste**, la stack,
> une démo et le code source.

---
## Timeline des projet

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-04</span> <span class="timeline-title">LocalMind — assistant conversationnel auto-hébergé</span></summary>
<div class="timeline-body">

**Domaine :** LLM / Application · **Stack :** Next.js 14 · TypeScript · Ollama · PostgreSQL · Prisma · Docker

- **Objectif : 
    Objectif simple : Créer un assistant similaire à ChatGPT ou Claude qui fonctionne entièrement sur l'ordinateur de l'utilisateur, de manière 100 % privée et sans aucune connexion internet, tout en étant capable de générer automatiquement des documents (comme des fichiers Word ou PDF).**


<div class="embed">
  <iframe
    src="https://drive.google.com/file/d/1QFXsXssFo9N1gCLTQYnX8AFxdLDC8t9k/preview"
    title="Vidéo de démonstration"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

- **Code :** <https://github.com/fkdia23/LocalMind>

</div>
</details>

<div class="timeline">

<details class="timeline-item" open>
<summary><span class="timeline-date">2025-10</span> <span class="timeline-title">RAG fiable, traçable & auditable</span></summary>
<div class="timeline-body">

**Domaine :** IA / RAG · **Stack :** Neo4j · Ollama (Mistral 7B, nomic-embed-text) · FastAPI · React · Docker · Prometheus/Grafana
- **Objectif : 
    Créer un agent ia de recherche intelligent qui répond à partir de documents complexes (comme des lois ou des règlements) et qui prouve sa réponse en ouvrant directement la bonne page du document source comme une citation.**

<div class="embed">
  <iframe
    src="https://drive.google.com/file/d/1nY6ZOGS2yOmK_jGGTtL-hnd5_0hVIVO9/preview"
    title="Vidéo de démonstration"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

- **Code :** <https://github.com/fkdia23/RAG---Deep-Linking-Search>

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-01</span> <span class="timeline-title">Spécialisation de LLM pour domaines métiers</span></summary>
<div class="timeline-body">

**Domaine :** Fine-tuning · **Stack :** Qwen2.5-Coder-0.5B (4-bit) · LoRA/PEFT · Unsloth + TRL · Transformers · Ollama

Fine-tuning **LoRA** d'un modèle quantifié **4-bit** avec Unsloth (~2× plus
rapide), puis déploiement **hybride** Hugging Face (modèle _gated_) + Ollama
local. Spécialisation d'un LLM pour un domaine métier précis.


![Modèle fine-tuné Qwen2.5-Coder — carte Hugging Face](src/assets/images/qwen-finetuning.png)
- **Modèle :** <https://huggingface.co/fknguedia/qwen_2.5_coder_sqlagent_pilot>

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-02</span> <span class="timeline-title">Agent SQL pour équipes métier</span></summary>
<div class="timeline-body">

**Domaine :** LLM / Data · **Stack :** FastAPI · LLaMA · PostgreSQL · Gradio · Docker

Assistant **text-to-SQL-to-text** : les non-techniciens interrogent PostgreSQL
en **langage naturel**, avec **validation lecture seule** et **logs d'audit**.
Orchestration d'un LLM exposant un _tool_ SQL sécurisé derrière une API.


<div class="embed">
  <iframe
    src="https://drive.google.com/file/d/1ORayWwbPbKX1VJAoMioohyViK-akN4u8/preview"
    title="Vidéo de démonstration"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

- **Code :** <https://github.com/fkdia23/text-to-sql-to-text>

</div>
</details>



</div>

---

## Ce que cette sélection démontre pour le poste

- **Applications LLM de bout en bout** : de l'orchestration et des _tools_
  (Agent SQL) à l'agent conversationnel (LocalMind), en passant par le RAG
  traçable (URSSAF) — exactement l'**écosystème agent multifonction** visé.
- **Data science appliquée** : fine-tuning, quantification et **évaluation** de
  modèles, avec une vraie **maîtrise des coûts**.
- **IA de confiance & conformité** : sources vérifiables, déploiements **100 %
  locaux**, attention aux enjeux **RGPD et de souveraineté** des données.
- **Stack alignée** : **Python, JavaScript / Next.js**, FastAPI, Docker et
  **monitoring** (coûts, logs, performances) — transférable à l'écosystème
  **Azure (Azure OpenAI, Azure DevOps)** 

> Curieux, pédagogue et autonome : ces projets sont nés de besoins concrets,
> documentés et conçus pour être repris en équipe.
</content>
</invoke>
