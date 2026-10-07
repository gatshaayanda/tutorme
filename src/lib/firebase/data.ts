"use client";
import{collection,deleteDoc,doc,getDocs,limit,orderBy,query,setDoc,updateDoc,waitForPendingWrites,where}from"firebase/firestore";
import{db}from"./client";

export const POST_TYPES=["Study Move","Challenge","Parent Move","Today at TutorMe","Student Life","Celebrate"] as const;
export type PostType=typeof POST_TYPES[number];
export type LearningPost={id:string;type:PostType;title:string;body:string;published:boolean;createdAt:string;updatedAt:string};
export type Resource={id:string;title:string;description:string;type:"PDF"|"Image"|"Link";url:string;published:boolean;createdAt:string};
export type ProviderKind="Tutor"|"Tuition Centre"|"Academic Support";
export type Provider={id:string;kind:ProviderKind;name:string;tagline:string;description:string;location:string;modes:string[];subjects:string[];levels:string[];verified:boolean;featured:boolean;contactLabel:string;phone?:string;priceLabel?:string;imageUrl?:string;published:boolean;createdAt:string;updatedAt:string};
export type Enquiry={id:string;createdAt:string;name:string;phone:string;studentName:string;educationLevel:string;tuitionNeeds:string;notes:string;status:"New"|"Contacted"|"Enrolled"|"Closed"};
export type Workspace={id:string;name:string;slug:string;ownerUid:string;contactEmail:string;phone:string;location:string;description:string;status:"Pending"|"Active"|"Paused";createdAt:string;updatedAt:string};
export type WorkspaceMember={id:string;uid:string;workspaceId:string;role:"owner"|"staff"|"tutor"|"parent"|"student";name:string;email:string;status:"active"|"invited";inviteCode?:string;createdAt:string};
export type WorkspaceStudent={id:string;workspaceId:string;name:string;level:string;parentName:string;parentPhone:string;parentEmail:string;status:"active"|"paused"|"completed";createdAt:string;updatedAt:string};
export type TuitionSession={id:string;workspaceId:string;title:string;subject:string;level:string;scheduledAt:string;durationMinutes:number;mode:"Online"|"In person";meetingLink?:string;tutorName:string;studentIds:string[];status:"Scheduled"|"Completed"|"Cancelled";createdAt:string;updatedAt:string};
export type Fee={id:string;workspaceId:string;studentId:string;description:string;amount:number;dueDate:string;status:"Due"|"Paid"|"Waived";paidAt?:string;createdAt:string;updatedAt:string};
export type WorkspaceInvite={id:string;workspaceId:string;email:string;role:"staff"|"tutor"|"parent"|"student";name:string;code:string;status:"Pending"|"Accepted"|"Cancelled";createdAt:string;expiresAt:string};

const posts=collection(db,"learningPosts"),resources=collection(db,"resources"),enquiries=collection(db,"enquiries"),providers=collection(db,"providers"),workspaces=collection(db,"workspaces"),members=collection(db,"workspaceMembers"),students=collection(db,"workspaceStudents"),sessions=collection(db,"tuitionSessions"),fees=collection(db,"workspaceFees"),invites=collection(db,"workspaceInvites");

export async function createEnquiry(input:Omit<Enquiry,"id"|"status">){const ref=doc(enquiries);const writePromise=setDoc(ref,{...input,status:"New"}).then(()=>waitForPendingWrites(db));return{id:ref.id,writePromise};}
export async function getPublishedPosts(){const s=await getDocs(query(posts,where("published","==",true),orderBy("createdAt","desc"),limit(30)));return s.docs.map(d=>({id:d.id,...d.data()} as LearningPost))}
export async function getPublishedProviders(){const s=await getDocs(query(providers,where("published","==",true),orderBy("createdAt","desc"),limit(100)));return s.docs.map(d=>({id:d.id,...d.data()} as Provider)).sort((a,b)=>Number(b.featured)-Number(a.featured));}
export async function getAllProviders(){const s=await getDocs(query(providers,orderBy("createdAt","desc"),limit(200)));return s.docs.map(d=>({id:d.id,...d.data()} as Provider))}
export async function saveProvider(input:Omit<Provider,"id"|"createdAt"|"updatedAt">,id?:string){const now=new Date().toISOString();const ref=id?doc(db,"providers",id):doc(providers);await setDoc(ref,id?{...input,updatedAt:now}:{...input,createdAt:now,updatedAt:now},{merge:true});return ref.id}
export async function deleteProvider(id:string){await deleteDoc(doc(db,"providers",id))}
export async function getPublishedResources(){const s=await getDocs(query(resources,where("published","==",true),orderBy("createdAt","desc"),limit(50)));return s.docs.map(d=>({id:d.id,...d.data()} as Resource))}
export async function getAllEnquiries(){const s=await getDocs(query(enquiries,orderBy("createdAt","desc"),limit(100)));return s.docs.map(d=>({id:d.id,...d.data()} as Enquiry))}
export async function getAllPosts(){const s=await getDocs(query(posts,orderBy("createdAt","desc"),limit(100)));return s.docs.map(d=>({id:d.id,...d.data()} as LearningPost))}
export async function getAllResources(){const s=await getDocs(query(resources,orderBy("createdAt","desc"),limit(100)));return s.docs.map(d=>({id:d.id,...d.data()} as Resource))}
export async function savePost(input:Omit<LearningPost,"id"|"createdAt"|"updatedAt">,id?:string){const now=new Date().toISOString();const ref=id?doc(db,"learningPosts",id):doc(posts);await setDoc(ref,{...input,createdAt:now,updatedAt:now},{merge:true});return ref.id}
export async function deletePost(id:string){await deleteDoc(doc(db,"learningPosts",id))}
export async function saveResource(input:Omit<Resource,"id"|"createdAt">,id?:string){const ref=id?doc(db,"resources",id):doc(resources);await setDoc(ref,{...input,createdAt:new Date().toISOString()},{merge:true});return ref.id}
export async function deleteResource(id:string){await deleteDoc(doc(db,"resources",id))}
export async function updateEnquiryStatus(id:string,status:Enquiry["status"]){await updateDoc(doc(db,"enquiries",id),{status})}

export async function createWorkspace(input:Omit<Workspace,"id"|"createdAt"|"updatedAt"|"status">){const now=new Date().toISOString();const ref=doc(workspaces);await setDoc(ref,{...input,status:"Pending",createdAt:now,updatedAt:now});await setDoc(doc(members,ref.id+"_"+input.ownerUid),{uid:input.ownerUid,workspaceId:ref.id,role:"owner",name:input.name,email:input.contactEmail,status:"active",createdAt:now});return ref.id}
export async function getMyWorkspaces(uid:string){const s=await getDocs(query(members,where("uid","==",uid),where("role","in",["owner","staff","tutor"])));const ids=s.docs.map(d=>String(d.data().workspaceId));if(!ids.length)return[];const ws=await getDocs(query(workspaces,where("__name__","in",ids.slice(0,10))));return ws.docs.map(d=>({id:d.id,...d.data()} as Workspace))}
export async function getWorkspaceMembers(workspaceId:string){const s=await getDocs(query(members,where("workspaceId","==",workspaceId),orderBy("createdAt","desc"),limit(200)));return s.docs.map(d=>({id:d.id,...d.data()} as WorkspaceMember))}
export async function saveWorkspaceMember(input:Omit<WorkspaceMember,"id"|"createdAt">,id?:string){const ref=id?doc(db,"workspaceMembers",id):doc(members);await setDoc(ref,{...input,createdAt:new Date().toISOString()},{merge:true});return ref.id}
export async function getWorkspaceStudents(workspaceId:string){const s=await getDocs(query(students,where("workspaceId","==",workspaceId),orderBy("createdAt","desc"),limit(200)));return s.docs.map(d=>({id:d.id,...d.data()} as WorkspaceStudent))}
export async function saveWorkspaceStudent(input:Omit<WorkspaceStudent,"id"|"createdAt"|"updatedAt">,id?:string){const now=new Date().toISOString();const ref=id?doc(db,"workspaceStudents",id):doc(students);await setDoc(ref,{...input,...(id?{}:{createdAt:now}),updatedAt:now},{merge:true});return ref.id}
export async function getWorkspaceSessions(workspaceId:string){const s=await getDocs(query(sessions,where("workspaceId","==",workspaceId),orderBy("scheduledAt","asc"),limit(200)));return s.docs.map(d=>({id:d.id,...d.data()} as TuitionSession))}
export async function saveWorkspaceSession(input:Omit<TuitionSession,"id"|"createdAt"|"updatedAt">,id?:string){const now=new Date().toISOString();const ref=id?doc(db,"tuitionSessions",id):doc(sessions);await setDoc(ref,{...input,...(id?{}:{createdAt:now}),updatedAt:now},{merge:true});return ref.id}
export async function getWorkspaceFees(workspaceId:string){const s=await getDocs(query(fees,where("workspaceId","==",workspaceId),orderBy("dueDate","asc"),limit(200)));return s.docs.map(d=>({id:d.id,...d.data()} as Fee))}
export async function saveWorkspaceFee(input:Omit<Fee,"id"|"createdAt"|"updatedAt">,id?:string){const now=new Date().toISOString();const ref=id?doc(db,"workspaceFees",id):doc(fees);await setDoc(ref,{...input,...(id?{}:{createdAt:now}),updatedAt:now},{merge:true});return ref.id}
export async function updateFeeStatus(id:string,status:Fee["status"]){await updateDoc(doc(fees,id),{status,...(status==="Paid"?{paidAt:new Date().toISOString()}:{})})}
export async function createWorkspaceInvite(input:Omit<WorkspaceInvite,"id"|"createdAt"|"expiresAt"|"status"|"code">){const now=new Date();const code=Math.random().toString(36).slice(2,8).toUpperCase();const ref=doc(invites,code);await setDoc(ref,{...input,code,status:"Pending",createdAt:now.toISOString(),expiresAt:new Date(now.getTime()+7*86400000).toISOString()});return{...input,id:ref.id,code}}
export async function getWorkspaceInvites(workspaceId:string){const s=await getDocs(query(invites,where("workspaceId","==",workspaceId),orderBy("createdAt","desc"),limit(100)));return s.docs.map(d=>({id:d.id,...d.data()} as WorkspaceInvite))}
export async function deleteWorkspace(id:string){await deleteDoc(doc(db,"workspaces",id))}
