'use client';
import { useState } from 'react';

const phoneDisplay = '087 225 3983';
const phoneHref = 'tel:+353872253983';
const services = [
  'Emergency electrician call-outs',
  'Electrical repairs',
  'Sockets and switches',
  'Indoor lighting',
  'Outdoor lighting',
  'Fuse board upgrades and repairs',
  'Tripping circuits and electrical issues',
  'Smoke alarm installation and replacement',
  'Shower electrical connections',
  'Cooker and oven electrical connections',
  'Domestic electrical work',
  'Commercial electrical work',
  'Landlord electrical work',
  'Electrical maintenance',
  'Small electrical jobs and repairs'
];

export default function Home() {
  const [status, setStatus] = useState('');
  async function submit(e){
    e.preventDefault();
    setStatus('Sending...');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const j = await r.json();
    if(r.ok){ e.currentTarget.reset(); setStatus('Thanks — your enquiry has been sent.'); }
    else setStatus(j.error || 'Unable to send. Please call instead.');
  }
  return <main>
    <header><div className="brand">⚡ Quick Electrician Cork</div><a className="call" href={phoneHref}>Call {phoneDisplay}</a></header>
    <section className="hero">
      <div><span className="tag">LOCAL ELECTRICIAN • CORK</span><h1>Electrical problem?<br/><em>Get it sorted quickly.</em></h1><p>Fast, straightforward electrical help for homes, landlords and businesses across Cork City and surrounding areas.</p><div className="actions"><a className="primary" href={phoneHref}>Call Now — {phoneDisplay}</a><a className="secondary" href="#contact">Send an Enquiry</a></div></div>
      <aside><strong>Need help today?</strong><span>Call for availability</span><a href={phoneHref}>{phoneDisplay}</a></aside>
    </section>
    <section className="services"><span className="tag dark">SERVICES</span><h2>Electrical services in Cork</h2><div className="grid">{services.map((s,i)=><article key={s}><b>{String(i+1).padStart(2,'0')}</b><h3>{s}</h3></article>)}</div></section>
    <section className="coverage"><span className="tag">LOCAL COVERAGE</span><h2>Cork City and surrounding areas.</h2><p>Not sure if your location is covered? Call and we’ll let you know.</p><a href={phoneHref}>{phoneDisplay}</a></section>
    <section className="contact" id="contact"><div><span className="tag dark">CONTACT</span><h2>Tell us what you need.</h2><p>Send a short description of the job and your location. The destination email stays private.</p><a className="bigphone" href={phoneHref}>{phoneDisplay}</a></div><form onSubmit={submit}><input name="name" required placeholder="Name"/><input name="phone" required placeholder="Phone"/><input name="email" type="email" placeholder="Email (optional)"/><input name="area" placeholder="Area"/><textarea name="message" required placeholder="What do you need help with?" rows="6"/><input className="hp" name="website" tabIndex="-1" autoComplete="off"/><button>Send Enquiry</button><p>{status}</p></form></section>
    <footer><strong>Quick Electrician Cork</strong><a href={phoneHref}>{phoneDisplay}</a><span>Cork City and surrounding areas</span></footer>
    <a className="mobile" href={phoneHref}>Call Now — {phoneDisplay}</a>
  </main>;
    }
