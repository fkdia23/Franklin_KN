---
author: Franklin KANA NGUEDIA
pubDatetime: 2026-01-15T09:00:00.000Z
modDatetime: 2026-01-15T09:00:00.000Z
title: Spécialisation de modèles LLM pour des domaines métiers
slug: llm-finetuning-domaines-metiers
featured: true
draft: false
tags:
  - LLM
  - Fine-tuning
  - LoRA
  - MLOps
huggingface: https://huggingface.co/fknguedia/qwen_2.5_coder_sqlagent_pilot
description: >
  Concevoir et déployer des modèles LLM spécialisés sur des domaines métier
  via fine-tuning LLaMA/Qwen avec LoRA, puis déploiement autonome sur
  Hugging Face et infrastructure locale Ollama.
---

J'ai conçu et déployé des **modèles LLM spécialisés** sur des domaines métier (par exemple la médecine préventive), via **fine-tuning de LLaMA/Qwen avec LoRA** et un déploiement autonome combinant **Hugging Face** et une **infrastructure locale Ollama**.

- Modèle Hugging Face : https://huggingface.co/fknguedia/qwen_2.5_coder_sqlagent_pilot

---

### 🚀 Les atouts clés du projet

- **Spécialisation métier :** adaptation d'un modèle généraliste à un vocabulaire et des tâches spécifiques par fine-tuning LoRA, sans réentraîner l'intégralité des poids.
- **Déploiement hybride :** publication sur Hugging Face pour le partage et exécution locale via Ollama pour la confidentialité et la maîtrise des coûts.
- **Industrialisation :** pipeline complet de la curation des données jusqu'au déploiement sécurisé.

## Table of contents

## 1. Le défi : un modèle généraliste ne suffit pas pour un métier critique

- **Contexte :** les LLM généralistes connaissent mal le vocabulaire, les contraintes réglementaires et les cas d'usage propres à un domaine métier (santé, finance, droit).
- **Limites :** réponses imprécises, hallucinations sur des termes techniques, absence d'alignement avec les processus internes.
- **Objectif :** disposer d'un modèle **spécialisé, léger et déployable** localement, capable de raisonner dans le contexte métier.

## 2. La solution : fine-tuning LoRA et déploiement autonome

- **Fine-tuning paramétrique efficace (PEFT) avec LoRA :** seuls quelques adaptateurs sont entraînés, ce qui réduit drastiquement le coût mémoire et le temps d'entraînement.
- **Entraînement accéléré avec Unsloth :** entraînement environ **2× plus rapide** grâce à la bibliothèque Unsloth et à la TRL de Hugging Face.
- **Quantification :** modèle dérivé d'une base `Qwen2.5-Coder-0.5B-Instruct` quantifiée en 4 bits (bnb-4bit) pour une exécution légère.

## 3. Le pipeline complet : de la donnée au déploiement

1. **Curation des données** : collecte, nettoyage et formatage des exemples métier au format instruction/réponse.
2. **Entraînement** : fine-tuning LoRA avec suivi des métriques de perte et d'overfitting.
3. **Tests qualité** : évaluation des réponses sur un jeu de validation métier.
4. **Déploiement sécurisé** : publication gated sur Hugging Face + exécution locale via Ollama.

## 4. Stack technique

- **Modèle de base** : Qwen2.5-Coder-0.5B-Instruct (variante quantifiée 4-bit)
- **Méthode** : LoRA / PEFT, librairie Unsloth + TRL
- **Frameworks** : Transformers, Safetensors
- **Déploiement** : Hugging Face Hub (model card, gating) + Ollama en local
- **Licence** : Apache-2.0

## 5. Lien avec le poste

Ce projet démontre une expérience concrète dans la **définition et la mise en œuvre d'architectures IA distribuées**, la maîtrise des **environnements cloud et on-premises** ainsi que le **déploiement sécurisé de modèles critiques** — des compétences directement transférables à un poste de Data Scientist orienté MLOps et industrialisation.
