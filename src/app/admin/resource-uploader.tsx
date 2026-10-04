"use client";
import {useState} from "react";
import {auth} from "@/lib/firebase/client";
import {uploadFiles} from "@/lib/uploadthing";

export default function ResourceUploader({onUploaded}:{onUploaded:(url:string,type:"PDF"|"Image")=>void}) {
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  async function choose(file:File|null){
    if(!file)return;
    if(!auth.currentUser){setError("Sign in to Operations first.");return}
    setBusy(true);setError("");
    try{
      const token=await auth.currentUser.getIdToken();
      const result=await uploadFiles("learningResource",{files:[file],headers:{Authorization:`Bearer ${token}`}});
      const data=result[0]?.serverData as {url?:string}|undefined;
      if(!data?.url)throw new Error("Upload completed without a file URL.");
      onUploaded(data.url,file.type==="application/pdf"?"PDF":"Image");
    }catch(err){setError(err instanceof Error?err.message:"Upload failed.")}
    finally{setBusy(false)}
  }
  return <div><label>Upload PDF or image<input type="file" accept="image/*,.pdf,application/pdf" disabled={busy} onChange={e=>void choose(e.target.files?.[0]||null)}/></label>{busy&&<p className="truth">Uploading…</p>}{error&&<p className="error">{error}</p>}</div>;
}