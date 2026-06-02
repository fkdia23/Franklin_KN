---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-05-06T09:00:00.000Z
modDatetime: 2026-05-06T09:00:00.000Z
title: Chatbot RAG — assistant IA sur base documentaire
slug: chatbot-rag-documentaire
featured: false
draft: false
tags:
  - RAG
  - LangChain
  - FastAPI
  - LLM
github: https://github.com/fkdia23/rag_project
description: >
  Conception d'un assistant IA reposant sur une base documentaire :
  FastAPI + vector DB + LangChain + PostgreSQL + Docker, pour l'ingestion,
  l'indexation et les requêtes en langage naturel.
---

J'ai conçu un **assistant IA de type RAG (Retrieval-Augmented Generation)** reposant sur une base documentaire. L'utilisateur dépose un document (PDF) et interroge son contenu en langage naturel.

- Code source : https://github.com/fkdia23/rag_project

---

### 🚀 Les atouts clés du projet

- **RAG complet :** ingestion, indexation vectorielle et requêtes en langage naturel.
- **Architecture modulaire :** FastAPI + base vectorielle + LangChain + PostgreSQL + Docker.
- **Industrialisable :** service analytique conteneurisé, prêt à intégrer un système d'information.

## Table of contents

## 1. Le défi : exploiter une documentation dense

- **Contexte :** les documents métier (procédures, rapports, manuels) sont riches mais difficiles à interroger rapidement.
- **Limites :** recherche par mots-clés peu pertinente, lecture manuelle chronophage.
- **Objectif :** permettre de **poser une question en langage naturel** et d'obtenir une réponse sourcée à partir des documents.

## 2. La solution : un pipeline RAG end-to-end

1. **Ingestion** : dépôt et extraction du contenu des documents.
2. **Indexation** : découpage en chunks, génération d'embeddings et stockage dans une **base vectorielle**.
3. **Requête** : recherche des passages les plus pertinents par similarité.
4. **Génération** : le LLM produit une réponse contextualisée à partir des passages récupérés, orchestré par **LangChain**.

## 3. Stack technique

- **API** : FastAPI (Python)
- **Orchestration RAG** : LangChain
- **Base vectorielle** : vector DB pour la recherche sémantique
- **Base de données** : PostgreSQL pour les métadonnées
- **Infrastructure** : Docker pour la conteneurisation

## 4. Lien avec le poste

Ce projet met en avant des compétences en **intégration de solutions Big Data**, en **structuration des données** et en **industrialisation de services analytiques** pour des besoins métier — directement alignées avec les missions d'un Data Scientist junior.

> Pour un cas d'usage RAG plus avancé (citations, traçabilité et deep linking vers la source), voir aussi mon article [Construire un RAG fiable, traçable et auditable](/posts/rag-precision-tracabilite).
