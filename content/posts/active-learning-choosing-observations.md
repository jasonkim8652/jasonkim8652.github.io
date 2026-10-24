---
{
  "title": "Active learning: decide which observation is worth its cost",
  "slug": "active-learning-choosing-observations",
  "category": "Paper notes",
  "summary": "Acquisition policies for expensive docking evaluations inform how I choose feedback for protein design agents.",
  "paper": "active-learning",
  "draft": false
}
---

A research agent has limited opportunities to obtain new information. Choosing the next observation determines what evidence it can learn from. Acquisition is a decision within the larger learning loop.

## Understand the selection policy

In our work on active learning for molecular docking, I implemented acquisition policies and analyzed surrogate behavior to understand efficient selection of expensive docking evaluations. The goal was to examine why the pipeline works, alongside its performance.

That experience taught me to separate the surrogate's prediction task from the decision made using those predictions. A model can be imperfect across the full search space while still helping a selection policy find useful candidates.

## Connect the loop to protein engineering

The analogous protein workflow repeatedly selects variants, obtains labels, updates a model, and chooses another batch. Each acquisition changes both the current candidate set and the information available for later decisions.

For an agent, the policy is one component of a larger system. The agent also needs to choose a relevant measurement, interpret its outcome, and recognize when the surrogate no longer supports the intended decision.

## Study learning through decisions

I want to connect acquisition policies to experimental reasoning and model selection. A useful comparison should hold the query budget and information access fixed, then examine which observations improve discovery and why.

This earlier docking research gives me practical experience implementing the learning loop and analyzing its behavior. It also motivates my current interest in agents whose workflows improve as evidence accumulates.
