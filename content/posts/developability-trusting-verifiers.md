---
{
  "title": "Antibody developability: can the agent trust its verifier?",
  "slug": "developability-trusting-verifiers",
  "category": "Paper notes",
  "summary": "A blinded experimental benchmark tests whether property scores generalize.",
  "paper": "ginkgo",
  "draft": false
}
---

A protein design agent can call a property predictor correctly and still receive a misleading recommendation. Before using a score to guide optimization, we need evidence about how it behaves on new experimental data.

## Test outside the familiar split

The Ginkgo Datapoints antibody developability competition evaluates predictions against held-out measurements from a shared experimental platform. The outcomes expose gaps between cross-validation and test-set performance across developability properties.

I contributed as a co-author to the competition manuscript. For my agent research, the study informs how to evaluate a property predictor before using it to select or optimize antibodies.

## Verification needs its own evaluation

For agent workflows, the benchmark raises a practical question: when is a tool informative enough to change a candidate-selection decision?

A strong score on a familiar dataset does not establish that a predictor will rank a new antibody family well. Assay definitions, sequence distribution, and the property being measured all affect that interpretation.

The same issue matters when a predictor becomes a reward function. An optimizer can repeatedly exploit what the score favors, making its limits consequential for the whole workflow.

## Connect tool choice to evidence

I want agents to retain the evaluation context behind their tools. They should know which biological question a predictor addresses, where its evidence comes from, and when an experiment or an alternative model is needed.

This benchmark complements my work developing verifiers: useful protein design agents need both better tools and a disciplined way to decide how much to trust them.
