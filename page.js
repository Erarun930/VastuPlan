"use client";
import {useMemo,useState} from "react";

const rate={basic:1800,standard:2300,premium:3200};
const terrainFactor={Flat:1,Sloping:1.08,Hilly:1.20,"Irregular / Rocky":1.15};

function calc(v){
 const plot=Number(v.w)*Number(v.l)||0;
 const built=plot*.78*Number(v.floors);
 const material=built*rate[v.quality]*terrainFactor[v.terrain];
 const labour=material*Number(v.labour);
 const finishing=material*.16;
 const contingency=(material+labour)*.05;
 return {plot,built,material,labour,finishing,contingency,total:material+labour+finishing+contingency};
}
function money(n){return "₹"+Math.round(n).toLocaleString("en-IN")}

export default function Home(){
 const [v,setV]=useState({w:30,l:50,road:"East",terrain:"Flat",slope:0,floors:1,bed:2,bath:2,kitchen:"Yes",parking:"Car",quality:"standard",labour:.28});
 const [generated,setGenerated]=useState(false);
 const [tab,setTab]=useState("planner");
 const c=useMemo(()=>calc(v),[v]);
 const set=(k,x)=>setV({...v,[k]:x});
 const rooms=[
  ["Puja / Quiet","4%","4%","22%","18%","n"],
  ["Living","28%","4%","40%","28%","n"],
  ["Kitchen (SE)","70%","4%","26%","25%","e"],
  ["Master Bedroom (SW)","4%","52%","34%","42%","s"],
  ["Bedroom","39%","60%","27%","34%","s"],
  ["Dining","39%","34%","27%","22%","w"],
  ["Stair / Lobby","70%","34%","26%","22%","w"],
  ["Bath","70%","60%","12%","28%","e"],
  ["Bath","84%","60%","12%","28%","e"],
  ...(v.parking!=="None"?[["Parking","4%","30%","22%","18%","w"]]:[])
 ];
 return <main>
  <header><div><b>🏠 VastuPlan</b><span>Vastu • Terrain • Plan • Estimate</span></div><a href="#planner">Start Planning</a></header>
  <section className="hero">
   <div><div className="pill">SMART HOUSE PLANNING</div><h1>Vastu ke hisaab se apna house plan banaye</h1>
   <p>Plot, direction, terrain, rooms aur budget enter karke conceptual 2D plan aur indicative construction estimate generate karein.</p>
   <a className="cta" href="#planner">Create My Plan →</a></div>
   <div className="heroCard"><strong>Example</strong><div>30 × 50 ft • East Road</div><div>2 Bedrooms • G+1</div><div className="big">{money(c.total)}</div><small>Indicative project estimate</small></div>
  </div></section>

  <section id="planner" className="section">
   <div className="sectionTitle"><div><small>STEP 1</small><h2>Plot & Terrain</h2></div><span className="tag">Mobile friendly</span></div>
   <div className="formGrid">
    {[
     ["Plot width (ft)","w",30],["Plot length (ft)","l",50],["Slope (%)","slope",0],
    ].map(([lab,k,ph])=><label key={k}>{lab}<input type="number" value={v[k]} onChange={e=>set(k,e.target.value)}/></label>)}
    <label>Road / entry side<select value={v.road} onChange={e=>set("road",e.target.value)}>{["East","North","West","South"].map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Terrain<select value={v.terrain} onChange={e=>set("terrain",e.target.value)}>{Object.keys(terrainFactor).map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Floors<select value={v.floors} onChange={e=>set("floors",e.target.value)}><option value="1">Ground</option><option value="2">G+1</option><option value="3">G+2</option></select></label>
   </div>
  </section>

  <section className="section">
   <div className="sectionTitle"><div><small>STEP 2</small><h2>Requirements</h2></div></div>
   <div className="formGrid">
    <label>Bedrooms<input type="number" min="1" max="8" value={v.bed} onChange={e=>set("bed",e.target.value)}/></label>
    <label>Bathrooms<input type="number" min="1" max="8" value={v.bath} onChange={e=>set("bath",e.target.value)}/></label>
    <label>Kitchen<select value={v.kitchen} onChange={e=>set("kitchen",e.target.value)}><option>Yes</option><option>No</option></select></label>
    <label>Parking<select value={v.parking} onChange={e=>set("parking",e.target.value)}><option>Car</option><option>2 Cars</option><option>None</option></select></label>
    <label>Construction quality<select value={v.quality} onChange={e=>set("quality",e.target.value)}><option value="basic">Basic</option><option value="standard">Standard</option><option value="premium">Premium</option></select></label>
    <label>Labour factor<select value={v.labour} onChange={e=>set("labour",e.target.value)}><option value=".28">Standard</option><option value=".35">Difficult terrain</option></select></label>
   </div>
   <button className="generate" onClick={()=>{setGenerated(true);setTab("plan")}}>Generate Plan & Estimate</button>
  </section>

  <section className="section" id="results">
   <div className="tabs"><button className={tab==="plan"?"active":""} onClick={()=>setTab("plan")}>2D Plan</button><button className={tab==="vastu"?"active":""} onClick={()=>setTab("vastu")}>Vastu</button><button className={tab==="estimate"?"active":""} onClick={()=>setTab("estimate")}>Estimate</button></div>
   {tab==="plan" && <div className="resultGrid"><div><h2>Conceptual Floor Plan</h2><p className="muted">North ↑ • Road: {v.road}</p><div className="canvas">{rooms.map((r,i)=><div key={i} className={"room "+r[5]} style={{left:r[1],top:r[2],width:r[3],height:r[4]}}>{r[0]}</div>)}</div><p className="warning">Conceptual layout only. Final architectural/structural drawings require site measurements, soil data, local rules and qualified professionals.</p></div>
   <aside className="summary"><h3>Project Summary</h3><p>Plot <b>{v.w} × {v.l} ft</b></p><p>Built-up approx. <b>{Math.round(c.built)} sq ft</b></p><p>Terrain <b>{v.terrain}</b></p><p>Floors <b>{v.floors}</b></p><div className="total">{money(c.total)}</div><small>Indicative total</small></aside></div>}
   {tab==="vastu" && <div className="info"><h2>Vastu guidance</h2><ul><li>NE zone is commonly preferred for lighter/open or prayer-related use.</li><li>SE is commonly suggested for kitchen placement.</li><li>SW is commonly suggested for master bedroom/heavier use.</li><li>Exact entrance and room placement should also consider plot access, setbacks, ventilation and local rules.</li>{v.terrain!=="Flat"&&<li>Uneven terrain needs contour survey, drainage and foundation/retaining-wall engineering.</li>}</ul></div>}
   {tab==="estimate" && <div><h2>Indicative construction estimate</h2><table><tbody><tr><td>Material + masonry allowance</td><td>{money(c.material)}</td></tr><tr><td>Labour</td><td>{money(c.labour)}</td></tr><tr><td>Finishing allowance</td><td>{money(c.finishing)}</td></tr><tr><td>Terrain/contingency allowance</td><td>{money(c.contingency)}</td></tr><tr className="grand"><td>Total</td><td>{money(c.total)}</td></tr></tbody></table><p className="muted">Rates are illustrative. A production version should use city-wise verified rates and a detailed BOQ.</p></div>}
  </section>

  <section className="features"><div><b>📐 Plot Planner</b><span>Regular & irregular plot workflows</span></div><div><b>⛰️ Terrain Aware</b><span>Sloping/hilly planning inputs</span></div><div><b>🧱 BOQ & Labour</b><span>Detailed construction costing</span></div><div><b>📄 Project Report</b><span>Shareable plan & estimate</span></div></section>
  <footer>© 2026 VastuPlan • Concept planning tool • Not a substitute for structural/architectural approval.</footer>
 </main>
}