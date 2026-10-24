---
{
  "title": "A benchmark should help us improve the agent",
  "slug": "why-benchmarks-should-improve-agents",
  "category": "Idea notes",
  "summary": "Why I connect task design, tool-use traces, and controlled interventions when evaluating agents for protein design.",
  "draft": false
}
---

I became interested in benchmarking protein design agents because I wanted to build better agents.

A benchmark is useful when it helps explain what should change next. That requires looking at how an agent approaches a scientific problem, the evidence it gathers, and the decisions it makes along the way.

## Start with the scientific task

Protein design tasks have different objectives and different kinds of evidence. A structure score can help evaluate one aspect of a candidate while leaving other properties unresolved. An agent can successfully run a tool and still draw a conclusion the result does not justify.

In [BioDesignBench](https://doi.org/10.64898/2026.05.06.723381), I built protein design tasks and MCP-based agents, then examined their behavior. The aim was to make failures concrete enough that we could test an improvement.

## Inspect the workflow

One behavior I focused on was shallow candidate evaluation. The agent's ability to generate an answer is different from its ability to investigate alternatives carefully.

Looking at tool-use traces helps connect these behaviors to specific decisions. Which candidates received attention? What measurements or predictions supported the final choice? Did the agent consider evidence from more than one metric?

These questions are useful because they suggest interventions that can be compared experimentally.

For protein design agents, this includes how much structure to place around the LLM. I want benchmarks to test whether a prescribed workflow remains useful when the goal changes, and whether a more flexible agent can choose and use its tools reliably.

## Close the loop between diagnosis and improvement

A behavioral diagnosis becomes more valuable when it leads to a testable change. If the issue is limited evaluation, an intervention can encourage broader or deeper checks. The next step is to measure whether that change improves the outcomes that matter.

The interpretation needs care. Better benchmark performance is evidence about the evaluated tasks. It does not automatically establish better experimental binding or generalization to every design problem.

Resource use matters as well. A strategy that calls more tools may improve results because it spends more computation. Controlled comparisons help identify what came from the strategy and what came from additional resources.

## Evaluation as a foundation for learning

The same environment can support the next research question: can experience teach an agent a better workflow?

For that question, I want benchmarks that connect decisions to meaningful feedback and test whether improvements transfer to new protein tasks. The benchmark then becomes a place to diagnose behavior, develop an intervention, and evaluate what the agent has learned.
