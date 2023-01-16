---
title:  "LibINVENT: Reaction-based Generative Scaffold Decoration for in Silico Library Desgin(2021)"
classes: wide
excerpt: "Paper review about making synthesizable molecule generative model"
date:   2023-01-10 18:01:24 +0900
categories: 
  - SmallMolecule
tags:
  - Generative model
  - Language based model
  - Reinforcement learning
  - Synthesizability
mathjax: true
---

## Motivation
Since retrosynthesis problem is too hard to solve in computer, I tried to make a model that could make a synthesizable Leadoptimization library. This paper is about constructing synthesizable molecule genertive model. There are actually three ways to solve this problem.

1. Making a virtual library with building blocks and Reaction templates exhaustively.
2. Making a virtual library with building blocks and Reaction templates using RL(focusing on specific molecules).
3. Using a molecule generative model to build virtual library.


