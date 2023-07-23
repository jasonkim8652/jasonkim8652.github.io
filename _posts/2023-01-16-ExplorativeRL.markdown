---
title:  "Hit and Lead Discovery with Explorative RL and Fragment-based Molecule Generation(2021)"
classes: wide
excerpt: "Paper review about making synthesizable molecule through RL"
date:   2023-01-17 17:31:24 +0900
categories: 
  - generativemodel
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

Our view is that, on a high level, there are two main approaches to acheive efficient exploration. The first one is to introduce the "curiosity" or exploration bonus as intrinsic reward for loss optimization. Pathak et al.[[2]]("https://proceedings.mlr.press/v70/pathak17a.html?ref=https://githubhelp.com") defined curiosity as a distance between the true next state feature vecotr and the predicted estimate of the next state feature vecotr. Thiede et al.[[3]](https://arxiv.org/abs/2012.11293) brought curiosity-driven learning into the molecular generation task. In Thiede et al., curiosity is defined as a distance between the true reward of the current state and the predicted estimate of the current state reward. However, these "curiosity-driven" intrinsic reward-based models sometimes fail to solve complex problems. The failures are explained as a result of the RL agent's dtachment or derailment from the optimal solutions. The other approach of solving hard exploratiton problmes is a sample-efficient use of experiences. Prioritized experience replay(PER) method introduced in schaul et al.[[4]](https://arxiv.org/abs/1511.05952) samples experience that can give more information to the RL agent and thus have more 'surprisal'-defined by the temporal-difference (TD) error- in higher probability. In a similar sense, self-imitation learning introduced  in Oh et al.[[5]](http://proceedings.mlr.press/v80/oh18b) samples only the 'good' experiences where the actual rewoard is larger than the agent's value estimate. However, prioritized sampling based on the agent's value estimate is susceptible to outliers and spikes, which may lead to destabilizing the agent itself. Moreover, our explorative algorithm aims to preserve sufficient diversity and find many possible soultions instead of finding the most efficient route to a single solution. 

## Methods

### Generation method

Given a molecular state, our model chooses following things
* where to attach a new fragment.
* What fragment to attach
* where on a new fragment to form a new chemical bond

Furthermore, they harness the predefined connectivity information of the fragments and initial molecules. This feature allows our model to leverage chemists' expert knowledge in several ways. The connectivity information arises in the fragmentation procedure: algorithm decomposes any arbitrary molecules into fragments while preserving the fragments' attachment sites. 

In the GNN embedding phase, the attachment sites are considered as nodes like any other atoms in the molecule, while an atom type is exclusively assigned to the attachement sites. First, Keep tracking the indices of the attachment sites as the states so that our policy can choose the next attachment site where a new fragment should be added. Similarly, we keep the indices of the attachment sites of the fragments and use them throughout the training so that our policy can choose the attachment site from the fragment side. 

![fig2](https://jasonkim8652.github.io/assets/images/FREED_2.png)

State embedding network and policy network are designed as Markov models so that generation steps can take any arbitrary molecule as a current state and predict the next state, making the model more plausible for a scaffold-based generation. Each state vectore represents a molecular structure at the t-th step, and each step is a sequence of three actions that define an augmentation of a fragment. A GCN-based network provides node embeddings, H, which are then sum-aggregated to produce a graph embedding. 

Our policy network is an autoregressive process where Action 3 depends on Action 1&2 and Action 2 depends on Action 1. For the first step of our policy network, first policy network takes the multiplicative interactions(MI) [[6]](https://openreview.net/pdf?id=rylnK6VtDH) of the node embedding of each attachment site and the rows of the graph embedding of the molecule as inputs and predicts which attachment site should be chosen as Action 1.  Since graph embeddings and node embeddings are defined in a heterogeneous space, we apply MI to fuse those two sources of information. 

Given action 1, second policy network takes the MI of first embedding vector and the RDKit ECFP(Extended Connectivity Fingerprint) representation of each candidate fragment as inputs, and predicts which fragment should be chosen as action 2. 

Finally, given action 1 and 2, third policy network takes the MI of secondary embedding vecotr and the node embeddings of the chosen fragment's attachment sites as inputs and predicts which fragment attachment site should be chosen as Action 3. Each of the three policy networks consists of three fully-connected layers with ReLU activations followed by a softmax layer to predict the probability of each action. In order to make gradient flow possible while sampling discrete actions from the probabilities, we implement the Gumbel-softmax reparametrization trick. 

### Explorative RL for the discovery of novel molecules

We employ soft actor-critic(SAC), an off-policy actor-critic RL algorithm based on maximum entropy reinforcement learning, which is known to explore the space of state-action pairs more effectively than predecessors. 

To encourage exploration, we prioritize novel experiences during sampling batches for RL updates. We regard an experience if the agent has not visited the state before. Defining priority estimate function in the state space and not in the state-action space has been introduced for the molecular generative task. For novel states, the reward estimator would yield a high predictive error or high variance. In this regard, we train an auxiliary reward predictor consisting of a graph encoder and fully-connected layers that estimate a given state's reward. Then, we use the predictor's predictive error or Bayesian uncertainty as a priority estimate. We name the former method PER(PE) and the latter method PER(BU).

We train the reward predictor network to estimate the reward's mean and variance. Every layer in the network is MC dropout layer so that the predictor can provide the epistemic uncertainty. We add aleatoric and epistemic uncertainty to obatain the total uncertainty of the estimate. 

The reward predictor is opimized for every docking step, and we only optimizae it based on final state transition since docking scores are only computed for the final states. The reward predictor predicts the reward of any state, both intermediate and final. For PER(PE), when we compute the priority of a transition including an intermediate state, we use Q value as a substitute for the true docking score. 
After updating the policy network and Q function with loss multiplied by importance sampling (IS) weight, we recalculate and update the priority values of the transition in the replay buffer. 

## Results and Analysis

### Quantative performance benchmark

![fig3](https://jasonkim8652.github.io/assets/images/FREED_3.png)

Uniqueness is the problem of library size.

Also they performed albation studies of algorithm to investigate the effect of explorative algorithms. 

![fig4](https://jasonkim8652.github.io/assets/images/FREED_4.png)

FREED with both PE and BU outperformed curiosity-driven models with PE and BU, showing the effectiveness of our methods in our task compared to curiosity-driven explorations. Moreover, our predictive error-PER method outperformed the TD error-PER method. We conjecture that such a result is due to 1) novelty-based experience prioritization ecourages better exploration 2) leveraging an auxiliary priority predictor network makes PER training more robust than internal value estimate functions. 

## What I've learned
* various RL techniques using multiple actions. 

## Reference
1. Ståhl, Niclas, et al. "Deep reinforcement learning for multiparameter optimization in de novo drug design." Journal of chemical information and modeling 59.7 (2019): 3166-3176.
2. Pathak, Deepak, et al. "Curiosity-driven exploration by self-supervised prediction." International conference on machine learning. PMLR, 2017.
3. Thiede, Luca A., et al. "Curiosity in exploring chemical space: Intrinsic rewards for deep molecular reinforcement learning." arXiv preprint arXiv:2012.11293 (2020).
4. Schaul, Tom, et al. "Prioritized experience replay." arXiv preprint arXiv:1511.05952 (2015).
5. Oh, Junhyuk, et al. "Self-imitation learning." International Conference on Machine Learning. PMLR, 2018.
6. Jayakumar, Siddhant M., et al. "Multiplicative interactions and where to find them." (2020).