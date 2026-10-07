"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {getPublishedProviders,type Provider} from "@/lib/firebase/data";
import {providerSeed} from "@/lib/firebase/provider-seed";

const filters=["All","Tutor","Tuition Centre","Academic Support"];

export default function FindSupport(){
 const [providers,setProviders]=useState<Provider[]>(providerSeed);
 const [query,setQuery]=useState("");
 const [kind,setKind]=useState("All");
 const [mode,setMode]=useState("All");
 const [level,setLevel]=useState("All");
 useEffect(()=>{getPublishedProviders().then(items=>{if(items.length)setProviders(items)}).catch(()=>{})},[]);
 const levels=useMemo(()=>["All",...Array.from(new Set(providers.flatMap(p=>p.levels)))],[providers]);
 const filtered=useMemo(()=>providers.filter(p=>{
   const hay=[p.name,p.tagline,p.description,p.location,...p.subjects,...p.levels].join(" ").toLowerCase();
   return (!query||hay.includes(query.toLowerCase()))&&(kind==="All"||p.kind===kind)&&(mode==="All"||p.modes.includes(mode))&&(level==="All"||p.levels.includes(level));
 }),[providers,query,kind,mode,level]);
 return <main className="marketPage">
  <header className="marketHeader"><div className="marketContainer"><Link href="/" className="brand"><span className="brandMark">T</span><span><strong>TutorMe</strong><small>ACADEMIC SUPPORT</small></span></Link><nav><Link href="/find" className="active">Find support</Link><Link href="/feed">Study</Link><Link href="/resources">Resources</Link><Link href="/enrol">Post a need</Link></nav></div></header>
  <section className="marketHero"><div className="marketContainer"><span className="eyebrow">Find academic support</span><h1>Find the right<br/><em>kind of help.</em></h1><p>Explore tutors, tuition centres and academic-support providers. Start with what the student needs, compare the fit, then make a direct enquiry.</p><div className="marketActions"><Link className="button primary" href="/enrol">Tell us what you need</Link><a className="button ghost" href="https://wa.me/26772281640">WhatsApp TutorMe</a></div></div></section>
  <section className="marketContainer previewNote"><strong>Marketplace preview</strong><span>Some listings below are sample data so the customer experience can be reviewed before real providers are published.</span></section>
  <section className="marketContainer directory">
   <div className="searchBox"><div><span className="eyebrow">Directory</span><h2>Who can help?</h2></div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search maths, biology, Gaborone…" aria-label="Search providers"/></div>
   <div className="filterRow">{filters.map(f=><button key={f} className={kind===f?"selected":""} onClick={()=>setKind(f)}>{f}</button>)}<select value={mode} onChange={e=>setMode(e.target.value)}><option>All</option><option>In person</option><option>Online</option></select><select value={level} onChange={e=>setLevel(e.target.value)}>{levels.map(l=><option key={l}>{l}</option>)}</select></div>
   <div className="resultMeta"><span>{filtered.length} options</span><span>Choose based on fit, not just a name.</span></div>
   <div className="providerGrid">{filtered.map(p=><Link href={"/find/"+p.id} className="providerCard" key={p.id}><div className="providerTop"><span className="providerAvatar">{p.kind==="Tutor"?"T":p.kind==="Tuition Centre"?"C":"A"}</span><div><span className="tag">{p.kind}</span>{p.verified&&<span className="verified">✓ Verified</span>}</div></div><h3>{p.name}</h3><strong>{p.tagline}</strong><p>{p.description}</p><div className="chips">{p.subjects.slice(0,3).map(s=><span key={s}>{s}</span>)}</div><div className="providerBottom"><span>{p.location} · {p.modes.join(" / ")}</span><b>View →</b></div></Link>)}</div>
   {!filtered.length&&<div className="emptyState"><h3>No close matches yet.</h3><p>Tell TutorMe what the student needs and the team can help find the right direction.</p><Link className="button primary" href="/enrol">Post a need</Link></div>}
  </section>
  <section className="marketCta"><div className="marketContainer"><span className="eyebrow">Not sure where to start?</span><h2>Describe the need.<br/><em>We can take it from there.</em></h2><p>You do not need to know the perfect tutor or provider before you ask. Start with the student, subject, level and goal.</p><Link className="button primary" href="/enrol">Post a tutoring need →</Link></div></section>
 </main>
}
