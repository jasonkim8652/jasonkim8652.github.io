---
title:  "LibINVENT: Reaction-based Generative Scaffold Decoration for in Silico Library Desgin(2021)"
classes: wide
excerpt: "Paper review about making synthesizable molecule generative model"
date:   2023-01-10 18:01:24 +0900
categories: 
  - generativemodel
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

Our objective in this paper is as following below. For a given scaffold s, the library is a set of molecules with the following conditions. 1. All include same scaffold 2. All molecules are accessible by the same sequence of synthetically relevant chemical transformation. 

## Method

### Model Overview

![model architecture](https://jasonkim8652.github.io/assets/images/Libinvent_1.jpg){: .center}

Prior model is RNN model which get scaffold smiles as input and results in a proposed molecules. RL model updates parameter in prior model using score function and diversity filter. 

### Dataset

Compounds are from the publicly available ChEMBL27. First step of the data preparation process involves data purging and sanitization by removing the compounds that does not satisfies Lipinski's rule of 5 or having rare token. Following below is their statistics about token. 

![Token Statistics](https://jasonkim8652.github.io/assets/images/Libinvent_2.png){: .center}

The second preprocessing step necessary to train a scaffold decorating model is compound slicing. Recently, exhaustive slicing of bonds according to RECAP rules has been explored. However, this was not always effective for a wet lab chemist. Training on data sliced according to RECAP rules does not teach the prior to understand these chemical principles. Following below image explains about 11 rules in RECAP.

![RECAP rules](https://jasonkim8652.github.io/assets/images/Libinvent_3.png)

In this work, they used thirty-seven handcrafted reaction-based rules are used to slice the training compounds into scaffolds and decorations. This brings positive inductive bias,  resulting in more feasible results. The choice of 37 reactions has been made in consultation with human experts to increase the likelihood of proposing compounds obtainable through well-explored and easily implemented synthetic routes. By using this reation-based rules, they made a tuple that contains scaffold, decorators and original molecules, which put into model training. 

### Prior model

Before we move on, I emphasized that most of the explanation about prior model was in Ref.[[1]](https://jcheminf.biomedcentral.com/articles/10.1186/s13321-020-00441-8). Prior generative model is RNN that takes a scaffold as an input and returns complete compounds obtained by attaching decorations to the input scaffold. They demonstrate that the reaction-based slicing method enables the generative model to propose decorations according to the chemical reactions used in training. 

Teacher forcing is used to train the prior model capable of creating chemically valid compounds containing a given scaffold. The generation process can be seen as sequential conditional likelihood maximization problem. The output of the model represents a probability distribution over the token space containing all of the possible SMILES tokens present in the training dataset enriched by the “START” and “END” tokens.

![priormodel](https://jasonkim8652.github.io/assets/images/Libinvent_4.jpg)

![priormodel2](https://jasonkim8652.github.io/assets/images/Libinvent_5.jpg)

Each RNN cells are consisted of three LSTM layer and they used bidirectional RNN for econder. They put both feature vector in right side and reverse side to decoder. Then, the model also featured a global attention mechanism that combined the summed outputs for both directions of encoder in each step with the output of the current step of the decoder. 

### RL focusing

Fine-tuning is efficiently achieved by setting up an RL loop in which the prior iteratively proposes compounds and receives task-specific rewards for its output. During the run, all high-scoring compounds are stored in a virtual chemical library that we will refer to as the resulting data set. The rewards are shaped by a scoring function defining desirable chemical or structural properties to guide the model toward producing compounds of interest. However, because the objective is to explore a rather narrow space of solutions designed for a given scaffold, this may lead to a **mode collapse**. 

To achieve a stable RL process, we introduce a mechanism that relies on diversity filters(DFs) and the prior likelihoods of the proposed compounds.DFs penalize the RL agent for repeatedly generating the same compound, which significantly reduces the risk of mode collapse toward a single high-scoring solution(molecule). The prior likelihood serves as an additional regularizer, anchoring the agent to the previously learnt chemical space and ensuring that the SMILES syntax is not forgotten. Another reward-modifying factor is the reaction filter(RF). RFs are designed to be selective, so that a reaction or a set of reactions can be specified for each attachment point of the scaffold.

To define the task, a reward function is constructed to guide the agent’s learning, taking SMILES strings as input and returning scores in the range of [0,1]. Then, standard policy iteration RL is applied: In successive iterations, the agent proposes decorations for the scaffold and updates its parameters in a gradient ascent fashion based on the rewards these decorations receive. During the training, all syntactically valid compounds with a score exceeding a user-defined threshold are stored in the resulting dataset. Action is a proposed decoration for the scaffold, whereas the state contains information about all previously proposed decorations and the rewards assigned to those. At each step, the RL agent randomly samples an action according to its policy. The aim is to find the value of the parameter maximizing the expected cumulative rewards across the whole run. Then, we use policy gradient method. Without further regularization or adjustments, these methods are known to suffer from high variance and instability. However, our aim is to produce a large number of varied, interesting molecules. This means that a certain level of variance is desirable to promote the exploration of the chemical space and to prevent mode collapse toward a single, high-scoring solution. Our experiment show that high variance does not hinder the models from producing relevant output. 

We defined augmented log likelihood, which balances the prior anchor wirh the task-specific objective. 

![augmented log likelihood](https://jasonkim8652.github.io/assets/images/Libinvent_6.png)

Furthermore, they tested following four different RL learning strategies.

![RL startegies](https://jasonkim8652.github.io/assets/images/Libinvent_7.png)

## Results

![Results](https://jasonkim8652.github.io/assets/images/Libinvent_8.jpg)

![Results](https://jasonkim8652.github.io/assets/images/Libinvent_9.jpg)

Whereas it is not immediately intuitive, the DAP learning strategy has proven to be the most successful strategy. A combination of the prior likelihood and the scoring function is used to guide the agent toward a desirable region of the chemical space while ensuring that the underlying chemical syntax is not forgotten. A possible rationale for this is the notoriously high variance typically observed for policy iteration RL; whereas we note that the generative model requires this variance to explore the chemical space, too much variation combined with a lack of anchor to the prior knowledge is detrimental to the performance. 

## What I've learned

* Generative model that understands chemical reaction is possible.
* RNN, gradient policy methos, which are simple and old methods, are also good in these days. The important thing is that they should be used in right place with right purpose. 





## Reference

1. Arús-Pous, Josep, et al. "SMILES-based deep generative scaffold decorator for de-novo drug design." Journal of cheminformatics 12.1 (2020): 1-18.