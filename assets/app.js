const stocks={
 NVDA:{name:"NVIDIA",price:"$181.42",change:"+2.31%",trend:"positive",sector:"Semiconductors",summary:"AI infrastructure demand remains a central driver in this demo dataset.",drivers:["Data-center and AI accelerator demand","Strong ecosystem around CUDA and accelerated computing","Investor focus on AI infrastructure spending"],risks:["High expectations can increase valuation sensitivity","Semiconductor cycles can change quickly","Large-cap technology remains sensitive to rates"],confidence:"Moderate"},
 AAPL:{name:"Apple",price:"$248.71",change:"+0.64%",trend:"positive",sector:"Consumer Technology",summary:"Services and ecosystem strength are the main themes in this sample research set.",drivers:["Services ecosystem","Large installed device base","Recurring customer relationships"],risks:["Hardware replacement cycles","Regulatory scrutiny","Premium valuation sensitivity"],confidence:"Moderate"},
 TSLA:{name:"Tesla",price:"$421.18",change:"-1.26%",trend:"negative",sector:"Automotive & Energy",summary:"The sample data points to a more mixed near-term picture.",drivers:["EV scale and manufacturing footprint","Energy-storage opportunity","Software/autonomy optionality"],risks:["Demand and pricing pressure","Execution risk","High sensitivity to expectations"],confidence:"Low"},
 MSFT:{name:"Microsoft",price:"$512.34",change:"+0.91%",trend:"positive",sector:"Software & Cloud",summary:"Cloud and AI adoption are the primary research themes in this demo.",drivers:["Cloud platform scale","Enterprise AI adoption","Recurring software revenue"],risks:["AI infrastructure costs","Competition in cloud and AI","Regulatory scrutiny"],confidence:"Moderate"},
 AMZN:{name:"Amazon",price:"$233.09",change:"+1.48%",trend:"positive",sector:"Commerce & Cloud",summary:"Cloud growth and operating leverage are the dominant sample themes.",drivers:["AWS cloud platform","Advertising business","Retail efficiency initiatives"],risks:["Consumer demand changes","Cloud competition","Regulatory scrutiny"]}
};
let selected="NVDA";
let watch=JSON.parse(localStorage.getItem("stockpilot-watch")||'["NVDA","MSFT"]');

function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));document.getElementById(id).classList.add("active-page");document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===id));window.scrollTo(0,0)}
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>showPage(n.dataset.page));
document.getElementById("menu").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");

function stockCard(t){let s=stocks[t];return `<div class="stock-card"><div class="stock-top"><div><div class="symbol">${t}</div><div class="company">${s.name}</div></div><span class="${s.trend}">${s.change}</span></div><div class="price">${s.price}</div><div class="muted">${s.sector}</div><button class="ghost" onclick="research('${t}')">Research with AI →</button></div>`}
document.getElementById("stockGrid").innerHTML=Object.keys(stocks).map(stockCard).join("");

document.getElementById("insightCards").innerHTML=["NVDA","MSFT","AAPL"].map(t=>{let s=stocks[t];return `<div class="card"><div class="stock-top"><div><b>${t}</b><div class="company">${s.name}</div></div><span class="${s.trend}">${s.change}</span></div><p class="muted" style="margin-top:18px;line-height:1.6">${s.summary}</p><button class="ghost" onclick="research('${t}')">Open AI brief →</button></div>`}).join("");

function research(t){selected=t;document.getElementById("selectedTicker").textContent=`${t} · ${stocks[t].name}`;document.getElementById("prompt").value=`Analyze ${stocks[t].name}'s recent performance`;showPage("research");runResearch()}
function setPrompt(v){document.getElementById("prompt").value=v}

function runResearch(){
 const s=stocks[selected], q=document.getElementById("prompt").value;
 const report=document.getElementById("report");
 report.innerHTML=`<div><span class="eyebrow">AI RESEARCH BRIEF</span><h3>${s.name} (${selected})</h3><div class="meta">Question: ${q} · Demo dataset · ${new Date().toLocaleDateString()}</div>
 <div class="report-section"><h4>EXECUTIVE VIEW</h4><p>${s.summary} StockPilot's demo reasoning finds a <b>${s.confidence.toLowerCase()}</b>-confidence research signal based on the included evidence. This is an analytical summary, not a prediction or investment recommendation.</p></div>
 <div class="report-section"><h4>KEY DRIVERS</h4><ul>${s.drivers.map(x=>`<li>${x}</li>`).join("")}</ul></div>
 <div class="report-section"><h4>RISK & CONTRADICTORY EVIDENCE</h4><ul>${s.risks.map(x=>`<li>${x}</li>`).join("")}</ul></div>
 <div class="report-section"><h4>RESEARCH SIGNAL</h4><div class="score"><b>${s.confidence}</b><div class="bar"><i></i></div></div><p>Signal strength represents the completeness/consistency of the demo evidence, not a probability of future returns.</p></div>
 <div class="report-section"><h4>WHAT COULD INVALIDATE THIS?</h4><p>A material change in company fundamentals, demand, guidance, regulation, macro conditions, or the assumptions behind the evidence could change the analysis. The next research step should verify current primary-source information.</p></div>
 <div class="report-section"><h4>SOURCES</h4><p>Demo data bundled with StockPilot. Production version should attach live source citations to every material claim.</p></div>
 </div>`;
}

function renderWatch(){
 document.getElementById("watchList").innerHTML=watch.map(t=>`<div class="watch-row"><div><b>${t}</b><span class="company"> · ${stocks[t].name}</span></div><div><span class="${stocks[t].trend}">${stocks[t].change}</span> <span class="watch-actions"><button onclick="research('${t}')">Research</button><button onclick="removeWatch('${t}')">×</button></span></div></div>`).join("") || '<div class="card">Your watchlist is empty.</div>'
}
function removeWatch(t){watch=watch.filter(x=>x!==t);localStorage.setItem("stockpilot-watch",JSON.stringify(watch));renderWatch()}
renderWatch();

document.getElementById("globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){let q=e.target.value.trim().toUpperCase();let t=Object.keys(stocks).find(x=>x===q)||Object.keys(stocks).find(x=>stocks[x].name.toUpperCase().includes(q));if(t)research(t);else alert("Demo supports: NVDA, AAPL, TSLA, MSFT, AMZN");}});
runResearch();
