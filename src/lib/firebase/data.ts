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

const posts=collection(db,"learningPosts"),resources=collection(db,"resources"),enquiries=collection(db,"enquiries"),providers=collection(db,"providers");

export async function createEnquiry(input:Omit<Enquiry,"id"|"status">){const ref=doc(enquiries);const writePromise=setDoc(ref,{...input,status:"New"}).then(()=>waitForPendingWrites(db));return{id:ref.id,writePromise};}
export async function getPublishedPosts(){const s=await getDocs(query(posts,where("published","==",true),orderBy("createdAt","desc"),limit(30)));return s.docs.map(d=>({id:d.id,...d.data()} as LearningPost))}
export async function getPublishedProviders(){const s=await getDocs(query(providers,where("published","==",true),orderBy("featured","desc"),orderBy("createdAt","desc"),limit(100)));return s.docs.map(d=>({id:d.id,...d.data()} as Provider))}
export async function getAllProviders(){const s=await getDocs(query(providers,orderBy("createdAt","desc"),limit(200)));return s.docs.map(d=>({id:d.id,...d.data()} as Provider))}
export async function saveProvider(input:Omit<Provider,"id"|"createdAt"|"updatedAt">,id?:string){const now=new Date().toISOString();const ref=id?doc(db,"providers",id):doc(providers);await setDoc(ref,{...input,createdAt:id?undefined:now,updatedAt:now},{merge:true});return ref.id}
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
