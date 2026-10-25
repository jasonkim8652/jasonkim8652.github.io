// Website concept art. Original paper figures stay in Results and methods.
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const content = {
 'models-and-design-agents-v12.png': {
  meaning:'Biologically informed models learn to predict and generate proteins. Scientific agents use candidate designs and evidence to plan, compare, and refine research strategies.',
  stages:[
   ['Model development','Learn representations of biological variation and develop predictive and generative protein models.'],
   ['Agent reasoning','Interpret a design goal, compare candidates and evidence, and choose an informative next step.']
  ]
 },
 'llm-hypothesis-agent-v11.png': {
  meaning:'The agent investigates a failed assumption: it compares expectations with camera evidence, tests a possible cause with the robot, and revises the protocol from the results.',
  stages:[
   ['Question the assumption','Compare the expected observation with what the camera actually shows.'],
   ['Test an explanation','Propose a possible cause and design a physical experiment that can test it.'],
   ['Revise from evidence','Interpret the returned observations, update the protocol, and check whether the evidence is now informative.']
  ]
 },
 'pearl-assumption-testing-v10.png': {
  meaning:'When observations challenge a protocol’s assumptions, PEARL proposes a cause, tests it physically, and revises the protocol from the evidence.',
  stages:[
   ['Plan with assumptions','Design a protocol and predict what informative observations should look like.'],
   ['Diagnose and test a cause','Compare camera observations with expectations, identify a possible failed assumption, and run a robotic experiment to test the hypothesis.'],
   ['Revise and verify','Use new observations to update the protocol and re-evaluate whether the scientific objective has been met.']
  ]
 },
 'learning-mechanisms-v9.png': {
  meaning:'Experimental evidence can improve protein models as well as agent reasoning, memory, and workflows. Evaluate model quality and research decisions on new protein tasks.',
  stages:[
   ['Parameter learning','Train selected components: an LLM, a controller, or a predictor. Updating a predictor need not change the LLM.'],
   ['Context and memory','Use observations, retrieved experience, and reflection to adapt decisions without requiring a weight update.'],
   ['Workflow optimization','Optimize tool connections, verification gates, and execution structure. These mechanisms can be combined.']
  ]
 },
 'learning-overview-v8.png': {
  meaning:'Feedback should improve both which action the agent chooses and how it organizes a research workflow.',
  stages:[
   ['Two feedback sources','Verifiers provide predicted checks; experiments provide measured outcomes.'],
   ['Policy: choose actions','Learn which action is useful in the current context.'],
   ['Workflow: organize steps','Improve tool order, verification gates, and conditional retries.']
  ]
 },
 'experiment-followup-v8.png': {
  meaning:'Test a dilution hypothesis when an assay is saturated, then revise the protocol from the resulting observations.',
  stages:[
   ['Observe','Recognize that a saturated assay cannot distinguish the samples.'],
   ['Test','Run a controlled dilution to test the working-range hypothesis.'],
   ['Revise','Use the observed range to revise subsequent experiments.']
  ]
 },
 'llm-learning-feedback-v7.png': {
  whole:true,
  meaning:'The goal: learn from predicted checks and measured outcomes, update the agent’s action policy and workflow, and evaluate the changes on new protein tasks. The choices and measurements shown are illustrative.',
  stages:[
   ['Two sources of feedback','Verifiers return predicted scores and constraint checks. Experiments return measured function and assay observations.'],
   ['Policy: which action to choose','Feedback can change the preferred action in the same context, such as choosing an experiment instead of another computational check.'],
   ['Workflow: how actions are organized','Feedback can change tool order, insert a verifier gate, and add a redesign branch when a check fails.']
  ]
 },
 'llm-experiment-agent-v6.png': {
  whole:true,
  meaning:'The LLM agent uses shared experimental context to choose robot actions, interpret observations, and plan tests of its hypotheses.',
  stages:[
   ['Plan with context','Maintain experimental state and coordinate reasoning roles around the objective.'],
   ['Act and observe','Call the liquid handler and inspect the camera’s observations.'],
   ['Test and revise','Propose a cause, run a follow-up experiment, and revise the protocol from evidence.']
  ]
 },
 'llm-learning-agent-v6.png': {
  whole:true,
  meaning:'I want verifier and experimental feedback to change the LLM agent’s policy, memory, and workflow for future research.',
  stages:[
   ['Record experience','Collect tool-use traces, verifier diagnoses, and experimental outcomes.'],
   ['Update the agent','Use feedback to improve action policies, context, or workflow organization.'],
   ['Evaluate changed behavior','Test whether the updated agent makes better decisions on subsequent protein problems.']
  ]
 },
 'llm-design-agent-v5.png': {
  whole:true,
  meaning:'The LLM agent plans the workflow, selects tools, interprets their results, and decides what to do next.',
  stages:[
   ['Interpret the goal','Translate the desired protein function and constraints into a plan.'],
   ['Choose and call tools','Use MCP to invoke generation, co-folding, and evaluation tools.'],
   ['Read results and decide','Refine a candidate, request another check, or submit a design.']
  ]
 },
 'design-overview-v3.png': {
  meaning:'The agent turns a protein goal into a workflow, then uses evidence to choose what to refine.',
  stages:[
   ['Define the goal','Specify the target, function, and design constraints.',[0,70,490,730]],
   ['Compose the workflow','Connect generation, co-folding, and prediction tools.',[490,70,810,730]],
   ['Verify and refine','Compare candidates and revisit designs that fail checks.',[1300,70,474,730]]
  ]
 },
 'design-tools-v3.png': {
  meaning:'Generation and verification models define the design actions available to the agent.',
  stages:[
   ['Co-generation','Coordinate sequence and structure generation.',[0,25,650,600]],
   ['Co-folding','Evaluate complexes and structural compatibility.',[1050,15,724,445]],
   ['Sequence–function models','Score properties that support design and verification.',[1040,390,734,470]]
  ]
 },
 'design-future-v3.png': {
  meaning:'I want the agent to assemble alternative strategies for one goal and decide which candidates deserve further work.',
  stages:[
   ['One biological goal','Start from a target and the properties that matter.',[0,60,455,740]],
   ['Alternative strategies','Explore different generation and verification routes.',[455,60,890,740]],
   ['Evidence-guided selection','Refine weak candidates and select useful designs.',[1345,60,429,740]]
  ]
 },
 'experiment-system-v3.png': {
  meaning:'Shared experimental state connects organized reasoning to robot actions and physical observations.',
  stages:[
   ['Organize reasoning','Planning, prediction, knowledge, execution, and review share a persistent record.',[0,20,675,815]],
   ['Act and observe','The liquid handler acts; the camera returns observations.',[675,0,720,850]],
   ['Choose a follow-up','New evidence changes the plan and shared state.',[1395,55,379,755]]
  ]
 },
 'experiment-reasoning-v3.png': {
  meaning:'An illustrative follow-up: test a dilution hypothesis when an assay is uninformative, then revise the protocol from the evidence.',
  stages:[
   ['Recognize the problem','An observation challenges the protocol’s assumptions.',[0,40,570,770]],
   ['Propose and test a cause','Plan a controlled change, such as a dilution series.',[570,40,600,770]],
   ['Use the evidence','Check whether the follow-up resolves the problem.',[1170,40,604,770]]
  ]
 },
 'experiment-future-v3.png': {
  meaning:'I want experimental agents to carry unresolved hypotheses through longer campaigns and select experiments that distinguish competing explanations.',
  stages:[
   ['Keep the context','Retain designs, observations, and unresolved hypotheses.',[0,35,590,795]],
   ['Distinguish explanations','Test an assay limitation versus a poor protein design.',[590,35,590,795]],
   ['Plan the next experiment','Use the comparison to choose an informative follow-up.',[1180,35,594,795]]
  ]
 },
 'learning-change-v4.png': {
  meaning:'Verifier and experimental evidence should change how the agent chooses tools, checks assumptions, and organizes later work.',
  stages:[
   ['Earlier behavior','A fixed workflow can repeat an unhelpful sequence of actions.',[240,0,510,660]],
   ['Learn from evidence','Use verifier and experimental feedback to update the policy.',[620,430,530,440]],
   ['Revised behavior','Change checking, redesign, and follow-up decisions; evaluate the next outcomes.',[1030,0,600,710]]
  ]
 }
};

export function createResearchIllustrations({url,dimensions}) {
 const source=file=>url('/assets/research/'+file);
 function art(file,alt) {
  const [w,h]=dimensions[file];
  return `<img src="${source(file)}" alt="${escape(alt)}" width="${w}" height="${h}" loading="lazy">`;
 }
 function figure(file,alt) {
  const d=content[file];
  if(!d)throw new Error('Missing scientific illustration meaning: '+file);
  const stageCopy=(stage,i)=>`${d.stages.length===2?'':`<span class="concept-stage-number">${String(i+1).padStart(2,'0')}</span>`}<h3>${stage[0]}</h3><p>${stage[1]}</p>`;
  return `<figure class="concept-figure concept-whole-mobile${d.stages.length===2?' concept-two-part':''}"><a class="concept-desktop-art" href="${source(file)}" target="_blank" rel="noopener noreferrer" aria-label="Open the illustration at full resolution">${art(file,alt)}</a><figcaption><p class="concept-meaning">${d.meaning}</p><div class="concept-desktop-stages">${d.stages.map((s,i)=>`<div>${stageCopy(s,i)}</div>`).join('')}</div></figcaption></figure>`;
 }
 function story(title,file,alt,body,cls='') {
  const caption=file==='design-strategies-v8.png'?'Compare alternative computational routes.':'Choose a follow-up that tests the explanation.';
  return `<section class="illustrated-story focused-future ${cls}"><figure class="story-illustration"><a href="${source(file)}" target="_blank" rel="noopener noreferrer" aria-label="Open the future research illustration">${art(file,alt)}</a><figcaption>${caption}</figcaption></figure><div class="story-copy"><h2>${title}</h2>${body}</div></section>`;
 }
 function tile(file,alt) {
  return `<a class="concept-signal-art" href="${source(file)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(alt)}">${art(file,alt)}</a>`;
 }
 return {figure,story,tile};
}
