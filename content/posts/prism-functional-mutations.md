---
{
  "title": "PRISM: represent functional antibody variation",
  "slug": "prism-functional-mutations",
  "category": "Paper notes",
  "summary": "Separating residue origin from amino-acid identity addresses germline bias in antibody language models.",
  "paper": "prism",
  "draft": false
}
---

Antibody language models learn strong germline sequence patterns. Those patterns are useful, but they can bias a model against rare non-germline mutations that matter for binding. PRISM asks how a representation should distinguish residue origin from amino-acid identity.

## Separate conservation from functional variation

Antibody sequences contain germline-derived residues and non-germline changes introduced during maturation. Treating them as one statistical distribution can obscure the difference between a conserved germline residue and a useful functional mutation.

I developed and tested a solution based on factorized residue-origin and amino-acid representations with an origin-conditioned prediction head. The model makes these distinctions available for antibody scoring and controlled generation.

![PRISM model architecture](../../assets/research/prism-main.png)

## Biological knowledge changes the learning problem

The modeling question is how explicit knowledge of antibody variation should change a language model’s representation and predictions. A candidate can be unusual relative to germline sequence statistics while containing useful mutations; a single undifferentiated likelihood may miss that distinction.

Functional measurements provide a direct way to evaluate whether the representation improves antibody scoring. Better scores and controlled generation can also help a design agent compare and propose candidates.

## What I want to connect next

I want to study how biological priors can improve antibody prediction and generation when experimental data are limited, including their role in joint sequence–structure design. In an AI scientist, these advances would complement agents that combine model predictions with experimental evidence and choose informative next steps. The downstream objective still needs validation for the function and setting being investigated.
