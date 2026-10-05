---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-06-26T09:00:00.000Z
modDatetime: 2026-06-26T09:00:00.000Z
title: "Travaux en IA & Data : agents, LLMs et fine-tuning"
slug: travaux-ia-agents-llm
featured: true
draft: false
tags:
  - AI Engineering
  - LLM
  - RAG
  - Fine-tuning
  - NextJS
github: https://github.com/fkdia23
description: >
  Sélection de 4 projets d'ingénierie IA : conception d'applications LLM,
  orchestration d'agents et de tools, fine-tuning PEFT/LoRA, RAG traçable,
  APIs et déploiement local de modèles.
---

Cette page rassemble **4 travaux en IA & Data** autour des agents et des LLMs :
gestion de bases documentaires, exposition d'**APIs**, orchestration de _tools_,
adaptation PEFT, RAG, évaluation, observabilité et déploiement. Elle illustre le
cycle complet d'un système LLM, du choix du modèle jusqu'à son intégration dans
une application exploitable.

> Pour chaque projet : le **périmètre technique**, la stack, les choix
> d'architecture, une démo et le code ou modèle associé.

---

## Timeline des projets IA

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-04</span> <span class="timeline-title">LocalMind — assistant conversationnel auto-hébergé</span></summary>
<div class="timeline-body">

**Rôle IA Engineer :** concevoir et intégrer une application LLM locale de bout
en bout, depuis le serving du modèle jusqu'à l'expérience conversationnelle et
la génération documentaire.

**Domaine :** LLM application · **Stack :** Next.js 14 · TypeScript · Ollama ·
PostgreSQL · Prisma · Docker

- **Architecture :** assistant conversationnel auto-hébergé, inférence locale
  via Ollama, persistance des conversations avec PostgreSQL/Prisma et
  génération de documents Word ou PDF.
- **Compétences démontrées :** intégration d'un LLM dans une application web,
  conception d'API et de flux conversationnels, conteneurisation Docker et
  prise en compte de la confidentialité des données.

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

**Rôle IA Engineer :** construire un pipeline RAG vérifiable pour des documents
complexes, avec séparation claire entre ingestion, retrieval, génération et
traçabilité des réponses.

**Domaine :** RAG / IA de confiance · **Stack :** Neo4j · Ollama (Mistral 7B,
nomic-embed-text) · FastAPI · React · Docker · Prometheus/Grafana

- **Architecture :** ingestion et structuration des documents dans Neo4j,
  recherche sémantique, génération locale avec Mistral et API FastAPI pour
  exposer le pipeline à l'interface React.
- **Compétences démontrées :** conception d'un agent de recherche, deep links
  vers la page source, citations auditables, instrumentation Prometheus/Grafana
  et surveillance de la qualité du retrieval.

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

**Rôle IA Engineer :** adapter un LLM open source à une tâche métier avec une
empreinte mémoire maîtrisée et un protocole de déploiement reproductible.

- **Méthode :** fine-tuning supervisé d'un modèle quantifié **4-bit** avec des
  adaptateurs **LoRA/PEFT**, entraînement accéléré par Unsloth et TRL, puis
  validation du comportement spécialisé.
- **Mise en production :** publication du modèle et de ses artefacts sur
  Hugging Face, puis déploiement local avec Ollama pour l'inférence.
- **Compétences démontrées :** préparation de données, quantification,
  entraînement parameter-efficient, comparaison coût/qualité et gestion d'un
  modèle _gated_.

![Modèle fine-tuné Qwen2.5-Coder — carte Hugging Face](src/assets/images/qwen-finetuning.png)

- **Modèle :** <https://huggingface.co/fknguedia/qwen_2.5_coder_sqlagent_pilot>

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-02</span> <span class="timeline-title">Agent SQL pour équipes métier</span></summary>
<div class="timeline-body">

**Rôle IA Engineer :** orchestrer un LLM capable d'appeler un outil SQL de façon
contrôlée, derrière une API exploitable par des utilisateurs métier.

**Domaine :** Agents LLM / Data · **Stack :** FastAPI · LLaMA · PostgreSQL ·
Gradio · Docker

- **Architecture :** chaîne **text-to-SQL-to-text** : interprétation de la
  question, appel d'un _tool_ SQL, exécution PostgreSQL et reformulation de la
  réponse en langage naturel.
- **Garde-fous :** validation en lecture seule, contrôle des requêtes,
  séparation des responsabilités entre l'agent et la base, et logs d'audit.
- **Compétences démontrées :** tool calling, design d'API FastAPI,
  orchestration d'un agent, sécurité applicative, interface Gradio et
  déploiement Docker.

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

## Compétences d'ingénierie IA

- **Ingénierie LLM de bout en bout** : intégration d'applications, agents,
  _tool calling_, APIs et serving local de modèles.
- **Adaptation de modèles** : quantification 4-bit, fine-tuning supervisé,
  adaptateurs **PEFT/LoRA**, déploiement et validation d'un modèle spécialisé.
- **RAG et IA de confiance** : retrieval documenté, citations vérifiables,
  garde-fous SQL, logs d'audit et attention portée à la souveraineté des
  données.
- **Industrialisation** : Python, TypeScript/Next.js, FastAPI, Docker,
  PostgreSQL, Neo4j et monitoring des coûts, logs et performances.
