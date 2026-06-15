---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-04-08T09:00:00.000Z
modDatetime: 2026-04-08T09:00:00.000Z
title: Pipeline e-commerce temps réel sur Azure
slug: pipeline-ecommerce-temps-reel
featured: false
draft: false
tags:
  - Data Engineering
  - Azure
  - Databricks
  - Big Data
github: https://github.com/fkdia23/az_dataEngineer_E2E
description: >
  Conception d'un pipeline Big Data temps réel pour ingérer, transformer
  et restituer des indicateurs commerciaux, avec une architecture
  médaillon Bronze/Silver/Gold sur Azure.
---

J'ai conçu un **pipeline Big Data temps réel** pour ingérer, transformer et restituer des indicateurs commerciaux, de la base source jusqu'aux tableaux de bord décisionnels.

- Code source : https://github.com/fkdia23/az_dataEngineer_E2E

---

### Objectifs

- **Architecture médaillon :** organisation des données en couches Bronze → Silver → Gold pour une qualité progressive.
- **Bout en bout (E2E) :** de la base on-premise jusqu'à la visualisation Power BI.
- **Gouvernance intégrée :** sécurité gérée via Azure Active Directory et Key Vaults.

## 1. Le défi : valoriser les données commerciales en continu

- **Contexte :** les indicateurs commerciaux doivent être disponibles rapidement pour piloter l'activité.
- **Limites des traitements batch classiques :** latence trop élevée, données figées.
- **Objectif :** un pipeline **distribué, temps réel et résilient** pour la valorisation continue des données.

## 2. La solution : un pipeline end-to-end sur Azure

1. **Ingestion** : extraction depuis une base on-premise via **Azure Data Factory**.
2. **Stockage en couches** : **Azure Data Lake Storage Gen2** organisé en zones Bronze, Silver et Gold.
3. **Transformation** : nettoyage et enrichissement avec **Azure Databricks** (Spark).
4. **Modélisation analytique** : **Azure Synapse Analytics** pour l'entreposage et les requêtes.
5. **Restitution** : tableaux de bord **Power BI Embedded**.

## 3. Architecture médaillon

- **Bronze** : données brutes ingérées telles quelles.
- **Silver** : données nettoyées, dédupliquées et conformées.
- **Gold** : données agrégées et prêtes pour l'analyse métier.

## 4. Sécurité et gouvernance

- **Azure Active Directory** : gestion des identités et des accès.
- **Azure Key Vaults** : stockage sécurisé des secrets et clés.

## 5. Stack technique

- **Ingestion** : Azure Data Factory
- **Stockage** : Azure Data Lake Storage Gen2
- **Traitement** : Azure Databricks (Spark)
- **Entrepôt** : Azure Synapse Analytics
- **Visualisation** : Power BI Embedded
- **Sécurité** : Azure Active Directory, Key Vaults

## 6. Lien avec le poste

Ce projet démontre une expertise en **architecture distribuée**, en **Data Lake / Data Warehouse**, en **traitement temps réel** et dans la mise en œuvre de **pipelines end-to-end** pour la valorisation des données — compétences clés pour un poste data orienté ingénierie.
