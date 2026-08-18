import { NextResponse } from 'next/server';

function clean(v,m=2000){return String(v||'').trim().slice(0,m)}
function esc(v){return v.replace(/[&'\"<>]/g,c=>({'&':'&amp;',"'":'&#39;','\"':'&quot;','<':'&lt;','>':'&gt;'}[c]))}

export async function POST(req){
  try{
    const b=await req.json();
    if(b.website) return NextResponse.json({ok:true});
    const name=clean(b.name,80), phone=clean(b.phone,30), email=clean(b.email,120), area=clean(b.area,100), message=clean(b.message,2000);
    if(!name||!phone||!message) return NextResponse.json({error:'Please complete name, phone and message.'},{status:400});
    const key=process.env.RESEND_API_KEY;
    const to=process.env.CONTACT_TO_EMAIL;
    const from=process.env.CONTACT_FROM_EMAIL || 'Quick Electrician Cork <onboarding@resend.dev>';
    if(!key||!to) return NextResponse.json({error:'Contact form is not configured yet. Please call instead.'},{status:503});
    const rr=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],subject:`Website enquiry from ${name}`,reply_to:email||undefined,html:`<h2>New website enquiry</h2><p><b>Name:</b> ${esc(name)}</p><p><b>Phone:</b> ${esc(phone)}</p><p><b>Email:</b> ${esc(email||'Not provided')}</p><p><b>Area:</b> ${esc(area||'Not provided')}</p><p><b>Message:</b><br>${esc(message).replace(/\n/g,'<br>')}</p>`})});
    if(!rr.ok) return NextResponse.json({error:'Unable to send. Please call instead.'},{status:502});
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:'Something went wrong. Please call instead.'},{status:500})}
}
