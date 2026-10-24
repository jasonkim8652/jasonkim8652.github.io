---
{
  "title": "What should a protein design agent learn from an experiment?",
  "slug": "experimental-feedback-and-agent-learning",
  "category": "Idea notes",
  "summary": "The loop I want to close: experimental outcomes should change how an agent designs, verifies, and decides what to do next.",
  "draft": false
}
---

An experiment should change the next decision.

That is the starting point for how I think about protein design agents. An agent can propose a sequence, run a structure predictor, rank candidates, and write a convincing explanation. The question that interests me is what happens after a measurement disagrees with that explanation.

Does the agent simply try another sequence? Does it question the tool it trusted? Can it identify an assumption worth testing, plan a useful follow-up, and carry what it learns into the next design round?

## A design workflow is a research object

Protein design depends on a chain of choices. We choose a model, decide which candidates deserve more computation, interpret uncertain scores, and select experiments. Improving a single model matters. Improving how these pieces work together matters too.

My interest is in agents that can improve this workflow. I want experimental feedback to influence which tools an agent uses, which evidence it seeks, and how it allocates its next round of work.

This makes the agent's decisions part of what we should evaluate. A final score cannot tell us everything about why a campaign succeeded or failed.

## Feedback needs an interpretation

I use computational verifier for a model or procedure that scores or checks a candidate. Structure predictions and property scores can serve that role, but they are evidence about a design, not experimental confirmation of its function. [ProtDBench](https://arxiv.org/abs/2605.04118) explicitly studies structure-prediction models as evaluation verifiers and shows how their choices affect apparent design performance.

A failed candidate does not provide a complete diagnosis. The proposed sequence may be poor. A predictor may be unreliable for the current case. An experimental assumption may be wrong. The observation may be inconclusive.

These possibilities imply different next actions. A useful agent needs to connect observations to hypotheses, then choose an action that can distinguish among them.

In [PEARL](https://www.biorxiv.org/content/10.64898/2026.10.20.760214v1), I worked on connecting LLMs to a robot and organizing the context and agent roles needed for biochemical experimentation. One of the questions behind that work is whether agents can respond to faulty assumptions by planning further experiments and revising their protocols.

That experimental reasoning is one part of the larger protein design loop I want to build.

## Where experience changes the agent

I want to study three compatible mechanisms, rather than equating learning with training the base LLM.

**Parameter learning** updates selected components. Fine-tuning or reinforcement learning may train an LLM or controller, while new protein measurements may update a property predictor. Training that predictor does not require changing the LLM's weights.

**Context and memory adaptation** changes what the agent conditions its decisions on. Observations, retrieved examples, reflection, and persistent memory can improve subsequent behavior without requiring a weight update. [Reflexion](https://arxiv.org/abs/2303.11366) provides an example of feedback and episodic memory improving later agent decisions without updating model weights.

**Workflow optimization** changes the organization of execution: prompts, tool connections, verification gates, and role orchestration. It can use search or program edits with a fixed LLM, and it can be combined with trainable components. [AFlow](https://arxiv.org/abs/2410.10762), for example, optimizes code-represented workflows through search and execution feedback.

Policy and workflow describe aspects of behavior that may change through these mechanisms. They do not distinguish weight training from in-context adaptation.

## Active learning determines which feedback to acquire

Active learning addresses the acquisition of informative data, as described in [Settles' survey](https://minds.wisconsin.edu/handle/1793/60660). It is not automatically training the agent's action policy.

A protein design agent might keep its LLM fixed, select variants for an assay, and update a property predictor with the measurements. Alternatively, the resulting trajectories could contribute to training an agent or optimizing its workflow. Acquiring evidence and deciding how to learn from it are related but distinct research questions.

## Evaluate what persists and transfers

An update may help within one campaign, carry into another through memory, or persist in learned parameters or workflow code. I want to test what transfers, under what biological conditions, and at what cost.

These are goals for future work. Demonstrating them requires comparisons that control resources and information access, followed by evaluation on protein problems not used to develop the method. A successful retry alone does not establish improvement across tasks.

## Developing the agent's learning capabilities

A biased score can encourage a poor decision. A slow verifier can limit how many alternatives an agent considers. A generator constrains the space of possible designs. Developing these models changes what the agent can generate, verify, and learn from.

The direction I want to pursue is an end-to-end protein design pipeline in which verifier and experimental feedback improve the agent's future research decisions through a tested combination of parameter learning, context and memory adaptation, and workflow optimization.
