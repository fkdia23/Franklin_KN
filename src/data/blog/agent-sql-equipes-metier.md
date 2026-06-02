---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-02-05T09:00:00.000Z
modDatetime: 2026-02-05T09:00:00.000Z
title: Agent SQL pour équipes métier — démocratiser l'accès aux données
slug: agent-sql-equipes-metier
featured: true
draft: false
tags:
  - LLM
  - Text-to-SQL
  - FastAPI
  - Data
github: https://github.com/fkdia23/text-to-sql-to-text
description: >
  Un assistant SQL en langage naturel permettant à des non-techniciens
  d'interroger des bases PostgreSQL sans assistance technique, avec une
  architecture FastAPI + LLaMA + Docker + Gradio sécurisée.
---

J'ai développé un **assistant SQL en langage naturel** permettant à des utilisateurs non techniciens d'interroger des bases de données métier (PostgreSQL) **sans aucune assistance technique**. L'objectif : démocratiser l'accès à la donnée tout en gardant un haut niveau de sécurité.

- Code source : https://github.com/fkdia23/text-to-sql-to-text

---

### 🚀 Les atouts clés du projet

- **Langage naturel → SQL → réponse :** l'utilisateur pose sa question en français, l'agent génère la requête, l'exécute et restitue le résultat en langage clair.
- **Sécurité renforcée :** validation des requêtes, gestion des permissions et logs d'audit.
- **Architecture conteneurisée :** déploiement reproductible via Docker.

## Table of contents

## 1. Le défi : la donnée reste prisonnière des équipes techniques

- **Contexte :** les équipes métier dépendent souvent des analystes ou développeurs pour obtenir une simple extraction de données.
- **Conséquence :** délais, surcharge des équipes data, sous-exploitation des bases existantes.
- **Objectif :** donner de l'autonomie aux métiers tout en encadrant strictement l'accès aux données.

## 2. La solution : un agent text-to-SQL-to-text

1. **Compréhension** : l'utilisateur formule sa demande en langage naturel (ex. « Liste les 5 produits les plus vendus par catégorie »).
2. **Génération** : le LLM produit une requête SQL à partir du schéma de la base.
3. **Validation** : la requête est analysée et filtrée avant exécution (lecture seule, contrôle des tables autorisées).
4. **Exécution & restitution** : le résultat est exécuté sur PostgreSQL puis reformulé en langage naturel.

## 3. Stack technique

- **API** : FastAPI (Python), asynchrone
- **Modèle** : LLaMA pour la génération SQL
- **Base de données** : PostgreSQL
- **Interface** : Gradio pour une démo accessible
- **Infrastructure** : Docker pour la conteneurisation
- **Sécurité** : validation des requêtes, gestion des permissions, logs d'audit

## 4. Sécurité et gouvernance

- **Validation des requêtes** : interdiction des opérations destructrices, restriction aux requêtes de lecture.
- **Gestion des permissions** : contrôle des tables et colonnes accessibles selon le profil.
- **Logs d'audit** : traçabilité complète des requêtes générées et exécutées.

## 5. Lien avec le poste

Ce projet illustre la **conception de solutions d'intégration et de valorisation des données** pour différents métiers, ainsi que la maîtrise des **bonnes pratiques DevOps Big Data** et des **pipelines conteneurisés** — au cœur des responsabilités d'un Data Scientist junior tourné vers l'usage métier.
