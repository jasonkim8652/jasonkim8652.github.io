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

## previous study

Coupling an RL policy network with fragment-based generation holds genera advantages compared to VAE-based methods. For example, RL models do not need to be trained on reconstruction tasks which might restrict the diversity of generated molecules. Our work is one of the earliest applications of RL with a fragment-based molecular gneration method. While DeepFMPO[[1]](https://pubs.acs.org/doi/full/10.1021/acs.jcim.9b00325?casa_token=ygXhmUxG9ZsAAAAA%3AOOdoB-2LnrC8ZLT2YcZNc6NjzCJQt5u4b9MQ7c332aAByeyvQW-NtVyAB-SfwFe4ki4UFeeGfJKek02J) is also an application of RL with a fragemtn-based molecular generation method, DeepFMPO is designed to introduce only slight modifications to the given template molecules, which would make it inappropriate for the de novo drug design. Moreover, while DeepFMPO's generation procedure cannot change the connectivity of the fragments of the given template, our method is free to explore various connectivity. 

Our view is that, on a high levle, there are two main approaches to acheive efficient exploration. The first one is to introduce the "curiosity" or exploration bonus as intrinsic reward for loss optimization. Pathak et al.[[2]]("https://proceedings.mlr.press/v70/pathak17a.html?ref=https://githubhelp.com") defined curiosity as a distance between the true next state feature vecotr and the predicted estimate of the next state feature vecotr. Thiede et al.[[3]](https://arxiv.org/abs/2012.11293) brought curiosity-driven learning into the molecular generation task. In Thiede et al., curiosity is defined as a distance between the true reward of the current state and the predicted estimate of the current state reward. However, these "curiosity-driven" intrinsic reward-based models sometimes fail to solve complex problems. The failures are explained as a result of the RL agent's dtachment or derailment from the optimal solutions. The other approach of solving hard exploratiton problmes is a sample-efficient use of experiences. Prioritized experience replay(PER) method introduced in schaul et al.[[4]](https://arxiv.org/abs/1511.05952) samples experience that can give more information to the RL agent and thus have more 'surprisal'-defined by the temporal-difference (TD) error- in higher probability. In a similar sense, self-imitation learning introduced  in Oh et al.[[5]](http://proceedings.mlr.press/v80/oh18b) samples only the 'good' experiences where the actual rewoard is larger than the agent's value estimate. However, prioritized sampling based on the agent's value estimate is susceptible to outliers and spikes, which may lead to destabilizing the agent itself. Moreover, our explorative algorithm aims to preserve sufficient diversity and find many possible soultions instead of finding the most efficient route to a single solution. 


## Reference
1. Ståhl, Niclas, et al. "Deep reinforcement learning for multiparameter optimization in de novo drug design." Journal of chemical information and modeling 59.7 (2019): 3166-3176.
2. Pathak, Deepak, et al. "Curiosity-driven exploration by self-supervised prediction." International conference on machine learning. PMLR, 2017.
3. Thiede, Luca A., et al. "Curiosity in exploring chemical space: Intrinsic rewards for deep molecular reinforcement learning." arXiv preprint arXiv:2012.11293 (2020).
4. Schaul, Tom, et al. "Prioritized experience replay." arXiv preprint arXiv:1511.05952 (2015).
5. Oh, Junhyuk, et al. "Self-imitation learning." International Conference on Machine Learning. PMLR, 2018.