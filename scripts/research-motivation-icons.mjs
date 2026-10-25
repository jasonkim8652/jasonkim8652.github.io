// Consistent schematic icons. Plots and molecular shapes are conceptual illustrations.
import {biologicalModelIcon} from './biological-model-icon.mjs';
const paper='var(--motivation-paper,#fff)';
const wash='var(--motivation-wash,#edf2f6)';
const line=(d,extra='')=>`<path d="${d}" ${extra}/>`;
const rect=(x,y,w,h,r=4,fill=paper,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const dot=(x,y,r,fill=paper,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const arrow=(x,y,w)=>line(`M${x} ${y}h${w}m-4-4 4 4-4 4`);
const check=(x,y)=>line(`m${x} ${y} 4 4 8-9`);
const cross=(x,y)=>line(`m${x} ${y} 7 7m0-7-7 7`);
const base=line('M20 114h140','stroke-opacity=".18"');
function svg(body,label){
 return `<svg class="motivation-icon" viewBox="0 0 180 120" role="img" aria-label="${label}" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}${base}</g></svg>`;
}
function software(x,y,w,h,label='LLM'){
 return `${rect(x,y,w,h,5)}${line(`M${x} ${y+10}h${w}`)}${dot(x+6,y+5,1,'currentColor','stroke="none"')}<text x="${x+w/2}" y="${y+10+(h-10)/2+5}" text-anchor="middle" fill="currentColor" stroke="none" font-family="ui-sans-serif,system-ui,sans-serif" font-size="16" font-weight="600">${label}</text>`;
}
function plate(x,y,w=91,h=43){
 const wellWidth=(w-15)/12,wellHeight=(h-12)/8;
 return `${rect(x,y,w,h,5)}${rect(x+4,y+4,w-8,h-8,3,wash,'stroke-opacity=".3"')}${Array.from({length:8},(_,r)=>Array.from({length:12},(_,c)=>dot(x+8+c*wellWidth,y+6+r*wellHeight,1.35,'currentColor','stroke="none" opacity=".72"')).join('')).join('')}`;
}
function person(x,y){
 return `${dot(x,y,10)}${line(`M${x-8} ${y-7}q8-7 16 0`,'stroke-opacity=".4"')}${line(`M${x-22} ${y+50}v-24c0-16 44-16 44 0v24`)}${line(`m${x-8} ${y+16} 8 11 8-11m-8 11v23`)}${rect(x+9,y+32,8,10,1,wash,'stroke-width="1.5"')}`;
}

export const motivationIcons={
 biological:biologicalModelIcon,
 rigid:svg(
  `${line('M26 65V42h50m28 0h50v23')}
   ${line('M82 30v-6a8 8 0 0 1 16 0v6')}${rect(76,30,28,22,4,wash)}${dot(90,40,2)}${line('M90 42v4')}
   ${software(9,65,34,34,'A')}${software(73,65,34,34,'B')}${software(137,65,34,34,'C')}
   ${arrow(43,82,30)}${arrow(107,82,30)}`,
  'Tools A, B and C must run in one locked, preset order'),
 adaptive:svg(
  `${software(9,42,66,44)}${software(134,14,36,36,'A')}${software(134,76,36,36,'B')}
   ${line('M75 56h27V32h32m-4-4 4 4-4 4')}
   ${line('M75 80h27v14h32m-4-4 4 4-4 4')}
   ${line('M152 50v18H75m4-4-4 4 4 4')}`,
  'An LLM agent can choose tool A or B; a separate return arrow brings tool evidence back to the agent'),
 unstructured:svg(
  `${software(10,37,66,46)}${arrow(77,60,18)}
   ${rect(104,23,63,76,5)}${line('M104 35h63')}
   ${rect(115,46,39,12,2,wash,'stroke-opacity=".6"')}${line('M122 52h17','stroke-opacity=".55"')}
   ${rect(115,68,39,16,2,paper,'stroke-dasharray="3 4" stroke-opacity=".7"')}
   ${dot(157,27,12)}${cross(153.5,23.5)}`,
  'An LLM calls a tool with a missing input field, so the call fails'),
 protocol:svg(
  `${rect(45,13,87,91,6,wash,'stroke-opacity=".3"')}${rect(39,8,87,91,6)}
   ${rect(65,5,34,12,3,wash)}
   ${dot(53,35,5,wash)}${line('M65 35h43m-43 7h27','stroke-opacity=".65"')}
   ${dot(53,57,5,wash)}${line('M65 57h43m-43 7h34','stroke-opacity=".65"')}
   ${dot(53,79,5,wash)}${line('M65 79h29m-29 7h24','stroke-opacity=".65"')}
   ${rect(107,66,35,34,6,wash)}${line('M118 77c0-9 16-9 12 0-2 4-7 3-7 10')}${dot(123,93,1,'currentColor','stroke="none"')}`,
  'A written assay protocol contains ordered steps and an assumption that may be wrong'),
 observation:svg(
  `${line('M141 101V25h-23')}${rect(137,98,24,7,2,wash)}
   ${rect(86,12,46,27,4,wash)}${rect(98,35,20,12,3)}${dot(108,41,6,wash)}
   ${line('m101 48-19 17m33-17 18 17','stroke-opacity=".3"')}
   ${plate(25,66,107,39)}
   ${rect(25,12,45,39,4)}${line('M32 42V22m0 20h30','stroke-opacity=".4"')}${line('M35 29h22')}`,
  'A camera observes uniformly saturated assay wells, producing a flat, uninformative response'),
 diagnosis:svg(
  `${person(44,36)}${rect(78,67,52,36,4,wash)}${line('M87 77h21m-21 8h15','stroke-opacity=".55"')}
   ${dot(124,48,23,paper)}${dot(124,48,16,wash,'stroke-opacity=".25"')}
   ${line('m141 65 17 17','stroke-width="5"')}
   ${dot(124,39,3)}${line('M124 42v8m0 0-9 8m9-8 9 8')}${dot(115,60,2.5)}${dot(133,60,2.5)}`,
  'A scientist examines the experimental record and investigates competing causal explanations'),
 manual:svg(
  `${person(35,37)}${rect(63,57,57,39,4,wash)}${line('M59 101h66m-51-34h24m-24 9h15','stroke-opacity=".5"')}
   ${software(94,13,66,39,'Agent')}
   ${line('m143 67 14-14 7 7-14 14-10 3 3-10','fill="var(--motivation-paper,#fff)"')}${line('m154 56 7 7')}`,
  'A researcher reads traces on a laptop and manually edits the agent before another run'),
 optimize:svg(
  `${dot(28,51,19,wash)}${dot(28,51,12)}${dot(28,51,4,'currentColor','stroke="none"')}
   ${arrow(49,51,14)}${software(67,29,57,45,'Agent')}${arrow(126,51,12)}
   ${rect(143,35,28,32,5,wash)}${check(150,51)}
   ${line('M157 71v28H95V80')}${line('m91 84 4-4 4 4')}`,
  'A defined objective guides agent changes, evaluation, and a feedback loop for another improvement cycle')
};
