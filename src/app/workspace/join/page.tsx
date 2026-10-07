"use client";
import{Suspense,useEffect,useState}from"react";
import{createUserWithEmailAndPassword,signInWithEmailAndPassword}from"firebase/auth";
import{auth}from"@/lib/firebase/client";
import{acceptWorkspaceInvite,getWorkspaceInviteByCode,saveWorkspaceMember,type WorkspaceInvite}from"@/lib/firebase/data";
import{useSearchParams,useRouter}from"next/navigation";

function JoinWorkspaceForm(){
 const params=useSearchParams();const router=useRouter();const code=params.get("code")||"";const[invite,setInvite]=useState<WorkspaceInvite|null>(null);const[mode,setMode]=useState<"create"|"signin">("create");const[form,setForm]=useState({name:"",email:"",password:""});const[error,setError]=useState("");
 useEffect(()=>{if(code)getWorkspaceInviteByCode(code).then(setInvite).catch(e=>setError(e instanceof Error?e.message:"Could not load invite."))},[code]);
 async function submit(e:React.FormEvent){e.preventDefault();if(!invite)return;setError("");try{const cred=mode==="create"?await createUserWithEmailAndPassword(auth,invite.email,form.password):await signInWithEmailAndPassword(auth,invite.email,form.password);await saveWorkspaceMember({uid:cred.user.uid,workspaceId:invite.workspaceId,role:invite.role,name:form.name||invite.name,email:invite.email,status:"active",inviteCode:invite.code});await acceptWorkspaceInvite(invite.id);router.push("/workspace/"+invite.workspaceId)}catch(e){setError(e instanceof Error?e.message:"Could not join workspace.")}}
 return <main className="adminPage"><div className="adminShell"><section className="adminPanel authPanel"><span className="eyebrow">TutorMe invitation</span>{invite?<><h1>Join {invite.role==="parent"?"your student’s tuition workspace":"the tuition workspace"}.</h1><p>Invitation for {invite.email}. This link is valid for the centre’s invitation window.</p><div className="tabs"><button className={mode==="create"?"active":""} onClick={()=>setMode("create")}>Create account</button><button className={mode==="signin"?"active":""} onClick={()=>setMode("signin")}>I already have an account</button></div><form className="adminForm compact" onSubmit={submit}>{mode==="create"&&<input placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>}<input type="password" minLength={6} placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/><button className="button primary">{mode==="create"?"Join workspace":"Sign in & join"}</button>{error&&<p className="error">{error}</p>}</form></>:<><h1>Invitation not found.</h1><p>Check the invite link/code supplied by the tuition centre.</p></>}</section></div></main>
}
export default function JoinWorkspace(){
 return <Suspense fallback={<main className="adminPage"><div className="adminShell"><section className="adminPanel authPanel"><span className="eyebrow">TutorMe invitation</span><h1>Loading invitation.</h1><p>Checking the invitation link…</p></section></div></main>}><JoinWorkspaceForm/></Suspense>
}
