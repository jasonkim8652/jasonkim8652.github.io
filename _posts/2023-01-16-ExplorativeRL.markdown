---
title:  "Hit and Lead Discovery with Explorative RL and Fragment-based Molecule Generation(2021)"
classes: wide
excerpt: "Paper review about making synthesizable molecule through RL"
date:   2023-01-15 18:01:24 +0900
categories: 
  - SmallMolecule
tags:
  - Generative model
  - Graph based model
  - Reinforcement learning
  - Synthesizability
mathjax: true
---
## Motivation

While the simplistic scores(e.g., cLogP, QED) are computed by a sum of local fragments' scores and are not a function of global molecular structure, making the optimization tasks relatively simple, docking score optimization is a more demanding exploration problem for RL agents. To be a drug candidates, they should have enough steric stability to arrive at the target organ in the intended form(chemical realisticness), and they should not include any seriously reactive or toxic substructure. The low quality of generated molecules can arise from a single improper addition of atoms and bonds, which would deteriorate the entire sanity of the structure. To prevent this, they explicitly restrict the generation space within realistic and qualified molecuels by generating molecules as a combination of appropriate fragments. 

However, such a strong constraint in generation space would make the optimization problem of docking score even harder and render a higher probability of over-fitting to few solution. In this respect, we introduce a new framework, Fragment-based generative RL with an Explorative Experience replay for Drug design (FREED).

Our model generates molecules by attaching a chemically realistic and pharmacochemically acceptable fragemnt unit on a given state of molecules at each step. We also explore several explorative algorithms based on curiosity-driven learning and prioritized experience replay(PER). We devise an effective PER method that defines priority as the novelty of the experiences estimated by the predictive error or uncertainty of the auxiliary reward predicor's outcome. 

Model overview is following below. 

![Model overview](https://jasonkim8652.github.io/assets/images/FREED_1.png)

Coupling an RL policy network with fragment-based generation holds genera advantages compared to VAE-based methods. For example, RL models do not need to be trained on reconstruction tasks which might restrict the diversity of generated molecules. Our work is one of the earliest applications of RL with a fragment-based molecular gneration 

