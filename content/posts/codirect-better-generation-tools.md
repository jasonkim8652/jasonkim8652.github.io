---
{
  "title": "Co-DIRECT: better agents need better generation tools",
  "slug": "codirect-better-generation-tools",
  "category": "Paper notes",
  "summary": "Coordinating sequence and structure improves the tool an agent uses to propose proteins.",
  "paper": "codirect",
  "draft": false
}
---

A protein design agent can choose a sensible workflow and still be limited by the generator it calls. Improving the agent therefore includes improving the models that determine which candidates it can explore.

## More interaction is not automatically more useful

Joint protein generators update sequence and structure together. That coupling is attractive because a useful protein needs both representations to agree. But a response to another prediction can also increase local error.

In Co-DIRECT, I examined that distinction and developed anticipation with residue-wise directional routing. The method probes a tentative response and controls which representation leads and which receives the resulting correction.

![Co-DIRECT anticipation and directional routing](../../assets/research/codirect-main.png)

The study evaluates binder design, enzyme scaffolding, and antibody CDR redesign. It compares generated and refolded designs under common candidate and evaluation budgets.

## Develop the agent’s generation capability

Co-DIRECT develops an agent’s candidate-generation capability at the level of coupled sequence–structure updates. Those updates determine which candidates the agent can explore and how well its design constraints can be expressed.

I approach this as agent development across levels: improve the generated candidates, decide when and how to invoke generation, and establish what evidence the agent needs before accepting an output.

## What I want to connect next

I want to examine generation and verification together. An agent should compare candidates using function-relevant evidence, recognize a recurring failure mode, and change its strategy accordingly. Better internal coordination in the generator and better external orchestration by the agent can address different bottlenecks in the same design pipeline.
