---
title: "Airflow Learning & Projects"
description: "Exploration des concepts Apache Airflow à travers des projets pratiques et use cases avancés"
pubDate: 2026-03-19
updatedDate: 2026-03-19
pubDatetime : 2026-03-19
draft: false
heroImage: "/assets/images/airflow.png"
featured: true
tags: ["Airflow", "Data Engineering", "Orchestration", "ETL/ELT"]
github: https://github.com/fkdia23/airflow-yahoo-finance-analyze-StockMarket

---

![Airflow Logo](src/assets/images/airflow-astronomer.png)

## Projet principal : Orchestration data avec Apache Airflow

Ce dossier présente mon travail d’apprentissage orienté **Airflow**, **orchestration de pipelines ETL**, **qualité des données** et **observabilité**.

L’objectif : transformer des idées techniques en flux de données automatisés, fiables et prêts pour le suivi opérationnel.

## 1. Analyse de données boursières avec Airflow

- Repository : [Analyze stock market - API Yahoo Finance](https://github.com/fkdia23/airflow-yahoo-finance-analyze-StockMarket.git)
- Enjeux : collecte quotidienne de données financières, traitement ETL, stockage structuré et préparation pour analyse.
- Solution : une DAG Airflow orchestrant l’extraction depuis l’API Yahoo Finance, la transformation Python/Pandas et l’écriture dans un format Parquet.
- Résultats clés :
  - automatisation complète de la collecte des cours de bourse
  - pipeline réutilisable pour backtesting et scoring
  - base stable pour visualisation et surveillance de séries temporelles

## 2. Principes de production appliqués

- **Fiabilité** : exécution planifiée des DAGs avec reprise automatique en cas d’erreur
- **Qualité des données** : validation des schémas, détection de valeurs manquantes et alerting sur incidents
- **Observabilité** : suivi des exécutions, temps de runtime et journaux d’erreur
- **Modularité** : tâches séparées pour extraction, transformation et chargement

## 3. Impact et valeur métier

- Gain de temps : suppression des traitements manuels de collecte de données
- Réduction du risque d’erreurs humaines dans les données financières
- Meilleure capacité à prendre des décisions rapides sur des séries temporelles propres
- Base solide pour monter en charge vers un pipeline plus large (multi-source, calculs de signaux, scoring)

## 4. Mes apprentissages & bonnes pratiques

- Apprendre Airflow en contexte réel aide à maîtriser :
  - la gestion des dépendances entre tâches
  - les operators personnalisés
  - l’architecture d’un DAG maintenable
- Ajouter un monitoring métier permet de transformer un POC en pipeline industriel
- Penser le pipeline comme un service : disponible, observable, redémarrable

## 5. Suivi et extension

Pour transformer cet apprentissage en projet visible dans ton portfolio, voici les prochains pas :

- ajouter une page projet dédiée sur le site avec : contexte, architecture, stack, liens, résultats
- documenter le suivi des pipelines (ex : alertes, métriques, erreurs)
- partager un cas d’utilisation concret avec chiffres et bénéfices

> Cette page est maintenant structurée autour de ton savoir-faire Airflow et de l’impact métier. Elle devient plus lisible, plus crédible et plus utile pour un recruteur ou un client.

