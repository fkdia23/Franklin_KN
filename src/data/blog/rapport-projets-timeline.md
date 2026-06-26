---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-06-25T09:00:00.000Z
modDatetime: 2026-06-25T09:00:00.000Z
title: "Rapport complet — Timeline de tous mes projets Data & IA"
slug: rapport-projets-timeline
featured: true
draft: true
tags:
  - Rapport
  - Data Engineering
  - RAG
  - MLOps
  - LLM
github: https://github.com/fkdia23
description: >
  Vue d'ensemble chronologique de l'intégralité de mes projets Data
  Engineering, RAG, MLOps et fine-tuning de LLM : timeline, synthèse et
  fiches détaillées avec stack, résultats et liens.
---

Ce rapport rassemble **l'intégralité de mes projets** sous forme de frise
chronologique, avec pour chacun le contexte, la stack technique, les points
forts et le code source. Objectif : une lecture rapide de mon parcours
technique, du Data Engineering à l'IA générative industrialisée.

---

## 🗂️ Synthèse

| # | Projet | Domaine | Stack clé | Date |
|---|--------|---------|-----------|------|
| 1 | [RAG fiable & traçable (URSSAF)](/posts/rag-precision-tracabilite) | RAG / IA | Neo4j · Ollama · FastAPI · React | 2025-10 |
| 2 | [Spécialisation de LLM métier](/posts/llm-finetuning-domaines-metiers) | Fine-tuning | Qwen · LoRA · Unsloth · HF | 2026-01 |
| 3 | [Agent SQL pour équipes métier](/posts/agent-sql-equipes-metier) | LLM / Data | LLaMA · FastAPI · PostgreSQL | 2026-02 |
| 4 | [MLOps médical (Kubeflow)](/posts/mlops-medical-kubeflow) | MLOps | Jenkins · Kubeflow · K8s | 2026-03 |
| 5 | [Airflow Learning & Projects](/posts/airflow-learning) | Data Eng. | Airflow · Pandas · Parquet | 2026-03 |
| 6 | [Pipeline e-commerce temps réel](/posts/pipeline-ecommerce-temps-reel) | Data Eng. | Azure · Databricks · Synapse | 2026-04 |
| 7 | [Chatbot RAG documentaire](/posts/chatbot-rag-documentaire) | RAG / IA | LangChain · FastAPI · Vector DB | 2026-05 |

**7 projets** — 3 RAG/LLM · 2 Data Engineering · 1 MLOps · 1 Fine-tuning

---

## 🧭 Timeline des projets

> Cliquez sur une étape pour déplier le détail du projet.

<div class="timeline">

<details class="timeline-item" open>
<summary><span class="timeline-date">2025-10</span> <span class="timeline-title">RAG fiable, traçable & auditable (URSSAF)</span></summary>
<div class="timeline-body">

**Domaine :** IA / RAG · **Stack :** Neo4j · Ollama (Mistral 7B, nomic-embed-text) · FastAPI · React · Docker · Prometheus/Grafana

Système RAG de haute précision : citations sources, deep-linking vers la page PDF (`#page=XX`), surlignage dynamique et monitoring des hallucinations.

- **Code :** <https://github.com/fkdia23/RAG---Deep-Linking-Search>
- [Lire la fiche complète →](/posts/rag-precision-tracabilite)

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-01</span> <span class="timeline-title">Spécialisation de LLM pour domaines métiers</span></summary>
<div class="timeline-body">

**Domaine :** Fine-tuning · **Stack :** Qwen2.5-Coder-0.5B (4-bit) · LoRA/PEFT · Unsloth + TRL · Transformers · Ollama

Fine-tuning LoRA d'un modèle quantifié 4-bit avec Unsloth (~2× plus rapide), déploiement hybride Hugging Face (gated) + Ollama local.

- **Modèle :** <https://huggingface.co/fknguedia/qwen_2.5_coder_sqlagent_pilot>
- [Lire la fiche complète →](/posts/llm-finetuning-domaines-metiers)

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-02</span> <span class="timeline-title">Agent SQL pour équipes métier</span></summary>
<div class="timeline-body">

**Domaine :** LLM / Data · **Stack :** FastAPI · LLaMA · PostgreSQL · Gradio · Docker

Assistant text-to-SQL-to-text : les non-techniciens interrogent PostgreSQL en langage naturel, avec validation lecture seule et logs d'audit.

- **Code :** <https://github.com/fkdia23/text-to-sql-to-text>
- [Lire la fiche complète →](/posts/agent-sql-equipes-metier)

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-03</span> <span class="timeline-title">MLOps médical — industrialisation de l'IA</span></summary>
<div class="timeline-body">

**Domaine :** MLOps · **Stack :** Jenkins · Kubeflow · Kubernetes · monitoring temps réel

Plateforme CI/CD ML : tests automatisés, monitoring temps réel, détection de drift et rollback instantané (fiabilité 24/7).

- **Code :** <https://github.com/fkdia23/kubeflow>
- [Lire la fiche complète →](/posts/mlops-medical-kubeflow)

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-03</span> <span class="timeline-title">Airflow Learning & Projects</span></summary>
<div class="timeline-body">

**Domaine :** Data Engineering · **Stack :** Apache Airflow · Python/Pandas · Parquet · API Yahoo Finance

Orchestration ETL fiable et observable : DAG Airflow sur l'API Yahoo Finance, transformation Pandas, stockage Parquet, validation de schéma.

- **Code :** <https://github.com/fkdia23/airflow-yahoo-finance-analyze-StockMarket>
- [Lire la fiche complète →](/posts/airflow-learning)

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-04</span> <span class="timeline-title">Pipeline e-commerce temps réel sur Azure</span></summary>
<div class="timeline-body">

**Domaine :** Data Engineering · **Stack :** Azure Data Factory · ADLS Gen2 · Databricks (Spark) · Synapse · Power BI

Pipeline Big Data E2E : architecture médaillon Bronze/Silver/Gold (Data Factory → ADLS Gen2 → Databricks → Synapse → Power BI), gouvernance AAD + Key Vault.

- **Code :** <https://github.com/fkdia23/az_dataEngineer_E2E>
- [Lire la fiche complète →](/posts/pipeline-ecommerce-temps-reel)

</div>
</details>

<details class="timeline-item" open>
<summary><span class="timeline-date">2026-05</span> <span class="timeline-title">Chatbot RAG sur base documentaire</span></summary>
<div class="timeline-body">

**Domaine :** IA / RAG · **Stack :** FastAPI · LangChain · Vector DB · PostgreSQL · Docker

RAG end-to-end modulaire et conteneurisé, prêt à intégrer un système d'information.

- **Code :** <https://github.com/fkdia23/rag_project>
- [Lire la fiche complète →](/posts/chatbot-rag-documentaire)

</div>
</details>

</div>

---

## 📈 Ce que ce parcours démontre

- **Couverture end-to-end** : de l'ingestion (Airflow, Azure) à la mise en
  production de modèles (MLOps, fine-tuning) et aux applications IA (RAG, agents).
- **Industrialisation** : conteneurisation, CI/CD, observabilité et gouvernance
  systématiques.
- **IA de confiance** : traçabilité, sources vérifiables et maîtrise des coûts
  (déploiements locaux Ollama, quantification).

> Chaque projet de cette timeline dispose de sa fiche dédiée — cliquez sur
> **« Lire le projet »** pour le détail technique complet.
