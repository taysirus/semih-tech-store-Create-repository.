// app/page.jsx
'use client';
import { useMemo, useState } from 'react';

const DEMO = [
  { id:1, title:'Oyun PC RTX 4060', brand:'SemihTech', category:'Hazır Sistem', condition:'Yeni', price:38999, stock:6, img:'https://picsum.photos/seed/pc1/960/540' },
  { id:2, title:'İkinci El Gaming Laptop', brand:'MSI', category:'Laptop', condition:'İkinci El', price:21999, stock:2, img:'https://picsum.photos/seed/lap1/960/540' },
  { id:3, title:'Ofis Bilgisayarı i5', brand:'SemihTech', category:'Hazır Sistem', condition:'Yeni', price:15999, stock:10, img:'https://picsum.photos/seed/pc2/960/540' },
];

export default function Home(){
  const [products, setProducts] = useState(DEMO);
  const [cart, setCart] = useState([]);
  const add = (id)=> setCart(c=>{const ex=c.find(i=>i.id===id); return ex? c.map(i=>i.id===id?{...i,qty:i.qty+1}:i):[...c,{id,qty:1}]});
  const remove = (id)=> setCart(c=>c.filter(i=>i.id!==id));
  const update = (id,qty)=> setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,qty)}:i));
  const lines = cart.map(l=> ({...products.find(p=>p.id===l.id), qty:l.qty}));
  const total = lines.reduce((s,l)=>s+l.price*l.qty,0);

  return (
    <div>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',borderBottom:'1px solid #1f2937'}}>
        <div style={{fontWeight:800}}>Semih <span style={{color:'#60a5fa'}}>Tech</span> Bilgisayar</div>
        <a href="/admin" style={{background:'#2563eb',color:'#fff',padding:'8px 12px',borderRadius:10,textDecoration:'none'}}>Admin</a>
      </header>

      <main style={{maxWidth:1000, margin:'0 auto', padding:16}}>
        <h1 style={{fontSize:28,fontWeight:800,margin:'16px 0'}}>Vitrin</h1>

        <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'}}>
          {products.map(p=>(
            <div key={p.id} style={{background:'#111826',border:'1px solid #1f2937',borderRadius:14,padding:16}}>
              <div style={{position:'relative',paddingTop:'56%'}}><img src={p.img} alt={p.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',borderRadius:12}}/></div>
              <div style={{marginTop:10,fontWeight:700}}>{p.title}</div>
              <div style={{color:'#9ca3af',fontSize:14}}>{p.brand} • {p.condition} • {p.category}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                <div>
                  <div style={{fontWeight:800,fontSize:18}}>{p.price.toLocaleString('tr-TR')} TL</div>
                  <div style={{fontSize:12,color:p.stock>0?'#10b981':'#ef4444'}}>{p.stock>0? `${p.stock} stok`:'Stok yok'}</div>
                </div>
                <button onClick={()=>add(p.id)} disabled={p.stock===0} style={{background:'#2563eb',color:'#fff',padding:'8px 12px',border:'none',borderRadius:10,cursor:'pointer',opacity:p.stock===0?.6:1}}>Sepete Ekle</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#111826',border:'1px solid #1f2937',borderRadius:14,padding:16,marginTop:16}}>
          <div style={{fontWeight:700,marginBottom:8}}>Sepet</div>
          {lines.length===0 && <div style={{color:'#9ca3af'}}>Sepet boş</div>}
          {lines.map(l=>(
            <div key={l.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid #1f2937',paddingTop:10,marginTop:10}}>
              <div>
                <div style={{fontWeight:600}}>{l.title}</div>
                <div style={{fontSize:12,color:'#9ca3af'}}>{l.price.toLocaleString('tr-TR')} TL</div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <input type="number" value={l.qty} onChange={e=>update(l.id, Number(e.target.value)||1)} style={{width:70,background:'#0f172a',color:'#fff',border:'1px solid #334155',borderRadius:10,padding:'6px 8px'}}/>
                <button onClick={()=>remove(l.id)} style={{background:'#334155',color:'#fff',padding:'8px 12px',border:'none',borderRadius:10,cursor:'pointer'}}>Kaldır</button>
              </div>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
            <div>Toplam</div><div style={{fontWeight:800}}>{total.toLocaleString('tr-TR')} TL</div>
          </div>
          <a href={`/odeme?total=${total}`} style={{display:'inline-block',marginTop:10,background:'#2563eb',color:'#fff',padding:'10px 14px',borderRadius:10,textDecoration:'none'}}>Ödemeye Geç</a>
        </div>
      </main>

      <footer style={{borderTop:'1px solid #1f2937',color:'#94a3b8',textAlign:'center',padding:18}}>© 2025 Semih Tech Bilgisayar</footer>
    </div>
  );
}
