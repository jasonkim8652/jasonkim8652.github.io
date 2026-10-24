// Explanatory study schematic. Source and illustration provenance live in docs/.
export function bioDesignOverview(url) {
 const svg=(label,body)=>`<svg viewBox="0 0 300 230" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><g font-family="Arial,sans-serif" fill="#263e52">${body}</g></svg>`;
 const tasks=svg('A protein design task specifies the target, the desired function, and molecular constraints.',`
 <rect x="27" y="22" width="246" height="184" rx="10" fill="#f0f6f8"/>
 <text x="47" y="53" font-size="16" font-weight="600">Design objective</text><path d="M47 67H251" stroke="#c8dce3"/>
 <svg x="42" y="80" width="87" height="96" viewBox="270 390 1450 1260"><image href="${url('/assets/research/protein-gfp.png')}" width="2000" height="2000"/></svg>
 <g font-size="13"><text x="143" y="104">Target protein</text><text x="143" y="135">Desired function</text><text x="143" y="166">Design constraints</text></g>`);
 const tools=svg('The agent generates candidate sequences, predicts structures, scores evidence, and chooses its next step.',`
 <rect x="95" y="13" width="110" height="36" rx="18" fill="#e4ecf8"/><text x="150" y="37" text-anchor="middle" font-size="16" font-weight="600">LLM agent</text>
 <path d="M150 49V65M54 65H246M54 65V82M150 65V82M246 65V82" stroke="#91aacb" fill="none" stroke-width="2"/>
 <g fill="#f1f5fb"><rect x="12" y="82" width="84" height="77" rx="7"/><rect x="108" y="82" width="84" height="77" rx="7"/><rect x="204" y="82" width="84" height="77" rx="7"/></g>
 <g font-size="13" text-anchor="middle"><text x="54" y="106">Generate</text><text x="150" y="106">Predict</text><text x="246" y="106">Evaluate</text></g>
 <text x="54" y="139" font-size="13" text-anchor="middle" fill="#3c7885">EVQL…</text><path d="M131 138q7-25 14-4t15-6q4-13 10-6" fill="none" stroke="#3c7885" stroke-width="3"/>
 <g stroke="#3c7885" stroke-width="2"><path d="M227 126l4 4 6-8m-10 16 4 4 6-8m5-7h18m-18 11h18" fill="none"/></g>
 <path d="M54 159v19h192v-19M150 178v12" stroke="#91aacb" stroke-width="2" fill="none"/><text x="150" y="214" text-anchor="middle" font-size="14">MCP tool workflow</text>`);
 const trace=svg('Verify candidates with predicted function, structural evidence, and immunogenicity scores.',`
 <rect x="24" y="22" width="252" height="184" rx="10" fill="#f0f7f4"/>
 <text x="43" y="53" font-size="16" font-weight="600">Candidate verification</text>
 <g font-size="13"><text x="65" y="88">Sequence–function</text><text x="65" y="121">Structural evidence</text><text x="65" y="154">Immunogenicity</text></g>
 <g stroke="#458974" stroke-width="2" fill="none"><path d="M42 81l5 5 9-10M42 114l5 5 9-10M42 147l5 5 9-10"/></g>
 <text x="43" y="190" font-size="13" fill="#377c68">Filter · score · provide feedback</text>`);
 return `<div class="study-overview-stages literal-overview">${[[tasks,'Define the task','Specify the biological goal.'],[tools,'Compose the workflow','Choose and connect protein tools.'],[trace,'Evaluate alternatives','Use evidence to refine or select.']].map(([g,h,p])=>`<div class="study-stage">${g}<div><h2>${h}</h2><p>${p}</p></div></div>`).join('')}</div>`;
}
