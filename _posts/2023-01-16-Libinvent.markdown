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
Since retrosynthesis problem in lead optimization compound is too hard to solve in computer, I tried to make a model that could make a synthesizable Leadoptimization library. This paper is about constructing synthesizable molecule genertive model. There are actually three ways to solve this problem.

1. Making a virtual library with building blocks and Reaction templates exhaustively.
2. Making a virtual library with building blocks and Reaction templates using RL(focusing on specific molecules).
3. Using a molecule generative model to build virtual library.

First method is too exhaustive: we do not need to make a compounds that is not similar to hit compound. Second method also has problem. Even though we apply RL while building virtual library to make a compounds that is similar to hit compound, it is hard to apply RL because of large action space; There are almost infinite number of combination of reactants and reactions which makes determining next step hard. These are the reason why we need to use thrid method, using molecule generative model. It also does not require us to construct building block library. 

## Method

### Model Overview

[model architecture](https:/jasonkim8652.github.io/assets/images/Libinvent_1.jpg){./center}