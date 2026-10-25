// Conceptual model-development schematic; plots illustrate measurements and predictions.
// Keep labels as SVG text and the scientific explanation in responsive HTML.
const ink='#375573',blue='#477fac',teal='#368c92',purple='#8b73b4';
const curve=(d,color=blue,width=1.8,extra='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const panel=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#fff" stroke="#d9e4ed" stroke-width="1.2"/>`;
const label=(x,y,text,size=14,color=ink)=>`<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-family="ui-sans-serif,system-ui,sans-serif" font-size="${size}" font-weight="550">${text}</text>`;
const tiles=(x,y,letters,step=18,highlight=-1)=>letters.map((letter,i)=>`<rect x="${x+i*step}" y="${y}" width="${step-2}" height="19" rx="3" fill="${i===highlight?'#f7e8b4':'#edf4fa'}" stroke="${i===highlight?'#d7b461':'#d6e3ee'}" stroke-width=".8"/><text x="${x+i*step+(step-2)/2}" y="${y+13.5}" text-anchor="middle" fill="${i===highlight?'#87652b':ink}" font-family="ui-monospace,monospace" font-size="11">${letter}</text>`).join('');
const dot=(x,y,r=3.8,color=blue)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;

function network(){
 const columns=[[161,[96,122,148]],[196,[84,109,134,159]],[231,[96,122,148]]];
 const edges=columns.slice(0,-1).flatMap(([x,ys],i)=>ys.flatMap(y=>columns[i+1][1].map(next=>curve(`M${x} ${y}L${columns[i+1][0]} ${next}`,'#c4d7e6',1)))).join('');
 const nodes=columns.flatMap(([x,ys],i)=>ys.map(y=>`<circle cx="${x}" cy="${y}" r="5.3" fill="${i===1?'#eee8f7':'#e4eff8'}" stroke="${i===1?purple:blue}" stroke-width="1.3"/>`)).join('');
 return edges+curve('M161 122L196 109L231 122',teal,2.5)+nodes;
}

function ribbon(x,y){
 return `<g transform="translate(${x} ${y})">
  ${curve('M4 29C-5 9 19-4 28 10S8 37 24 45S52 37 43 20S58 3 67 15',teal,3)}
  ${curve('M13 16C29 5 36 32 20 34S11 9 29 14S39 43 26 43',blue,5)}
  <path d="M40 12l12 12-5 5 10 1-1-10-4 4-9-15z" fill="#8b73b4"/>
  <path d="M52 38 40 26l5-5-10-1 1 10 4-4 9 15z" fill="#b4a2d0"/>
  ${curve('M57 40c11 2 13-17 5-20',blue,2)}
 </g>`;
}

export const biologicalModelIcon=`<svg class="motivation-icon biological-model-icon" viewBox="0 0 420 240" role="img" aria-label="Biological knowledge and experimental measurements inform a learned protein representation, which supports both property prediction and joint sequence–structure generation." xmlns="http://www.w3.org/2000/svg">
 ${label(57,20,'Biology')}${panel(6,29,103,79)}
 ${tiles(15,39,['E','V','Q','L','R'],17,3)}
 ${ribbon(20,61)}
 ${label(57,133,'Measurements')}${panel(6,141,103,83)}
 ${curve('M21 202v-43m0 43h72','#b7c8d8',1.2)}
 ${curve('M27 191 42 184 57 177 73 170 88 161','#b5cedd',1.3)}
 ${[[27,193],[42,182],[57,180],[73,168],[88,163]].map(([x,y],i)=>curve(`M${x} ${y-5}v10m-3-10h6m-6 10h6`,'#99b5c9',1)+dot(x,y,3.3,i===3?purple:teal)).join('')}

 ${curve('M111 70c15 0 14 24 28 29','#91aec7',1.8)}<path d="m135 93 6 8-10-1" fill="none" stroke="#91aec7" stroke-width="1.8"/>
 ${curve('M111 180c15 0 14-25 28-32','#91aec7',1.8)}<path d="m131 147 10-1-6 8" fill="none" stroke="#91aec7" stroke-width="1.8"/>
 ${label(196,55,'Protein model',15)}
 <rect x="141" y="66" width="110" height="111" rx="13" fill="#f3f7fb" stroke="#c7d9e8" stroke-width="1.4"/>
 ${network()}
 ${label(196,200,'Learn representations',12.5,'#687f94')}

 ${curve('M253 107c20 0 20-40 40-40',blue,1.9)}<path d="m288 63 6 4-6 4" fill="none" stroke="${blue}" stroke-width="1.8"/>
 ${curve('M253 139c20 0 20 40 40 40',teal,1.9)}<path d="m288 175 6 4-6 4" fill="none" stroke="${teal}" stroke-width="1.8"/>

 ${label(354,20,'Predict properties')}${panel(300,29,112,79)}
 ${curve('M314 90h83M314 90V43','#b7c8d8',1.2)}
 <rect x="325" y="61" width="14" height="29" rx="2" fill="#9bbfd9"/><rect x="350" y="49" width="14" height="41" rx="2" fill="#78b4b6"/><rect x="375" y="69" width="14" height="21" rx="2" fill="#b7a5d2"/>
 ${[[332,55],[357,43],[382,63]].map(([x,y])=>curve(`M${x} ${y-4}v8m-4-8h8m-8 8h8`,ink,1.2)).join('')}

 ${label(354,133,'Generate designs')}${panel(300,141,112,83)}
 ${ribbon(322,149)}${tiles(311,200,['M','A','T','L','K'],18,2)}
</svg>`;
