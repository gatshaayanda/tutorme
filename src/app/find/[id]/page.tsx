"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {getPublishedProviders,type Provider} from "@/lib/firebase/data";
import {providerSeed} from "@/lib/firebase/provider-seed";

export default function ProviderDetail({params}:{params:Promise<{id:string}>}){
 const [provider,setProvider]=useState<Provider|null>(null);
 useEffect(()=>{void params.then(({id})=>{const seed=providerSeed.find(p=>p.id===id);if(seed)setProvider(seed);getPublishedProviders().then(items=>{const live=items.find(p=>p.id===id);if(live)setProvider(live)}).catch(()=>{})})},[params]);
 if(!provider)return <main className="simplePage"><div className="simpleCard"><span className="eyebrow">Provider</span><h1>Listing not found.</h1><p>This provider may no longer be published.</p><Link className="button primary" href="/find">Back to support directory</Link></div></main>;
 const demo=!provider.verified;
 return <main className="providerPage">
  <header className="marketHeader"><div className="marketContainer"><Link href="/find" className="back">← Find support</Link><Link className="button ghost" href="/enrol">Post a need</Link></div></header>
  <section className="providerHero"><div className="marketContainer providerHeroGrid"><div><div className="providerTop"><span className="providerAvatar large">{provider.kind==="Tutor"?"T":provider.kind==="Tuition Centre"?"C":"A"}</span><div><span className="tag">{provider.kind}</span>{provider.verified?<span className="verified">✓ Verified</span>:<span className="unverified">Unverified</span>}</div></div><h1>{provider.name}</h1><p className="providerTagline">{provider.tagline}</p><p>{provider.description}</p><div className="chips">{provider.subjects.map(s=><span key={s}>{s}</span>)}</div></div><aside className="contactCard"><span className="eyebrow">Next step</span><h2>Interested?</h2><p>Start with a simple enquiry. You can describe the student&apos;s level, subject and what help is needed.</p>{provider.phone?<a className="button primary" href={"https://wa.me/"+provider.phone.replace(/\D/g,"")}>WhatsApp {provider.contactLabel}</a>:<Link className="button primary" href="/enrol">{provider.contactLabel}</Link>}<Link className="button ghost" href="/enrol">Post a tutoring need</Link>{provider.kind==="Tuition Centre"&&<Link className="button ghost" href={"/connect/"+provider.id}>Request to connect</Link>}{provider.priceLabel&&<small>{provider.priceLabel}</small>}</aside></div></section>
  <section className="marketContainer providerDetails"><div className="detailGrid"><article><span className="eyebrow">Fit</span><h2>What this listing offers</h2><div className="detailRows"><div><strong>Levels</strong><span>{provider.levels.join(" · ")}</span></div><div><strong>Subjects</strong><span>{provider.subjects.join(" · ")}</span></div><div><strong>Location</strong><span>{provider.location}</span></div><div><strong>Delivery</strong><span>{provider.modes.join(" · ")}</span></div></div></article><article className="trustPanel"><span className="eyebrow">Trust</span><h2>{provider.verified?"Verified listing":"Preview listing"}</h2><p>{provider.verified?"This provider has been marked as verified by the TutorMe team.":"This is sample data used while the customer marketplace experience is being designed. It is not a real provider claim."}</p>{demo&&<span className="demoBadge">SAMPLE DATA</span>}</article></div></section>
 </main>
}
