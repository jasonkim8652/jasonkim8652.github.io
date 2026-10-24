---
{
  "title": "T-SCAPE: add biological evidence to a design verifier",
  "slug": "tscape-immunogenicity-verifier",
  "category": "Paper notes",
  "summary": "Immunogenicity prediction expands the criteria a protein design agent can consider.",
  "paper": "tscape",
  "draft": false
}
---

A protein can satisfy a structural objective and still be unsuitable for its intended use. For therapeutic proteins, immune responses introduce another biological question that an agent's workflow needs to address.

## Learn from related immunological evidence

Direct immunogenicity labels are limited. In T-SCAPE, I developed a framework using multitask pretraining and adversarial domain adaptation to draw on related immunological data before immunogenicity-specific fine-tuning.

The study evaluates peptide–MHC immunogenicity and antibody-level antidrug-antibody risk. The modeling contribution is to make better use of heterogeneous evidence when the target labels are scarce.

![T-SCAPE framework and training strategy](../../assets/research/tscape-main.png)

## A callable tool, a verifier, and a scoring component

For a design agent, this kind of model can answer a specific question about a candidate. Its predicted score can inform filtering or contribute to a multi-objective optimization objective alongside function and structural criteria.

I use “verifier” here to describe its role in a workflow: supplying model-based evidence about a specified design criterion. A predicted immunogenicity score does not establish clinical safety. The workflow needs to preserve the biological context and the uncertainty behind the estimate.

## Build the evidence into the decision

I want agents to choose verifiers because of the question they need to resolve. That means recording why a model was called, what part of the candidate it assessed, and how the result changed the next action.

T-SCAPE develops a biological evaluation capability for protein design agents. I want that capability to improve which candidates the agent accepts, what it optimizes, and when it requests more evidence.
