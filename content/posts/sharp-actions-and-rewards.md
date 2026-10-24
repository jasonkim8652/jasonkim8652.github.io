---
{
  "title": "SHARP: design the actions before optimizing the policy",
  "slug": "sharp-actions-and-rewards",
  "category": "Paper notes",
  "summary": "Fragment-based reinforcement learning shaped how I think about agent workflows.",
  "paper": "sharp",
  "draft": false
}
---

My earlier SHARP work concerns small-molecule generation. It informs my current interest in protein design agents through a shared methodological question: how should an optimization agent act, and what feedback should guide it?

## Give the policy meaningful operations

SHARP uses hierarchical fragment-based actions for molecular generation and refinement. Addition, deletion, and substitution support different scales of change, while constraints on the available actions help keep the search connected to synthesizability.

The framework combines multiple objectives rather than treating one score as the complete design problem. The action space and reward design therefore shape which solutions the policy can reach.

## The connection to scientific agents

A protein design workflow also has actions at different levels. An agent might edit a sequence, generate a new backbone, switch a model, request a verifier, or choose an experiment. These actions differ in cost and in the evidence they can produce.

My experience developing an RL pipeline made me attentive to those choices. A policy cannot recover an action that its interface never exposes, and optimizing an imperfect reward can lead to convincing but unhelpful outputs.

## Bring this understanding into protein workflows

I want to study useful action abstractions and feedback for protein design agents. Which decisions should be learned? Which constraints belong in the tool interface? How should the agent balance competing objectives and revise an earlier choice?

SHARP gives me experience with the mechanics of constrained, multi-objective optimization. My next application is the protein engineering workflow, where experimental feedback can test whether the chosen objectives lead to useful designs.
