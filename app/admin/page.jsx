// app/admin/page.jsx
'use client';
import { useEffect, useState } from 'react';

export default function Admin(){
  const [ok,setOk]=useState(false);
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({title:'',brand:'',category:'Hazır Sistem',condition:'Yeni',price:0,stock:0,img:''});
  const [cloud,setCloud]=useState(''); const [preset,setPreset]=useState(''); const [file,setFile]=useState(null);

  useEffect(()=>{ setOk(localStorage.getItem('admin')==='1'); },[]);
  const login=()=>{ const p=prompt('Şifre (demo: 123456)'); if(p==='123456'){ localStorage.setItem('admin','1'); setOk(true);} };

  const add=()=>{ if(!form.title||!form.brand) return alert('Başlık/marka gerekli'); setItems(prev=>[{id:Date.now(),...form},...prev]); setForm({...form, title:'',brand:'',price:0,stock:0,img:''}); };
  const upload=async()=>{ if(!file) return alert('Dosya seç'); if(!cloud||!preset) return alert('Cloud ve preset gir'); const fd=new FormData(); fd.append('file',file); fd.append('upload_preset',preset); const r=await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`,{method:'POST',body:fd}); const j=await r.json(); if(j.secure_url) setForm(f=>({...f,img:j.secure_url})); else alert('Yükleme başarısız'); };

  if(!ok) return <div style={{padding:40,textAlign:'center'}}><h2>Admin</h2><button onClick={login} style={{background:'#2563eb',color:'#fff',padding:'10px 14px',border:'none',borderRadius:10}}>Giriş Yap</button></div>;

  return (
    <main style={{maxWidth:1000, margin:'0 auto', padding:16}}>
      <h1 style={{fontSize:24,fontWeight:800,margin:'16px 0'}}>Yönetim Paneli</h1>

      <div style={{background:'#111826',border:'1px solid #1f2937',borderRadius:14,padding:16}}>
        <div style={{fontWeight:700, marginBottom:8}}>Yeni Ürün</div>
        <div style={{display:'grid',gap:16, gridTemplateColumns:'1fr 1fr'}}>
          <div><div>Başlık</div><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={inp}/></div>
          <div><div>Marka</div><input value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})} style={inp}/></div>
          <div><div>Kategori</div><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={inp}><option>Hazır Sistem</option><option>Laptop</option><option>Aksesuar</option><option>İkinci El</option></select></div>
          <div><div>Durum</div><select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})} style={inp}><option>Yeni</option><option>İkinci El</option></select></div>
          <div><div>Fiyat</div><input type="number" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)||0})} style={inp}/></div>
          <div><div>Stok</div><input type="number" value={form.stock} onChange={e=>setForm({...form,stock:Number(e.target.value)||0})} style={inp}/></div>
          <div style={{gridColumn:'1 / -1'}}><div>Görsel URL</div><input value={form.img} onChange={e=>setForm({...form,img:e.target.value})} placeholder="https://..." style={inp}/></div>

          <div><div>Cloud name</div><input value={cloud} onChange={e=>setCloud(e.target.value)} placeholder="örn: demo" style={inp}/></div>
          <div><div>Unsigned preset</div><input value={preset} onChange={e=>setPreset(e.target.value)} placeholder="örn: unsigned_preset" style={inp}/></div>
          <div><div>Dosya</div><input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} style={inp}/></div>
          <div style={{display:'flex',alignItems:'end'}}><button onClick={upload} style={btn}>Cloudinary Yükle</button></div>
        </div>

        {form.img && <div style={{position:'relative',paddingTop:'56%',marginTop:10}}><img src={form.img} alt="Önizleme" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',borderRadius:12}}/></div>}
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}><button onClick={add} style={btn}>Kaydet</button></div>
      </div>

      <div style={{marginTop:16, background:'#111826',border:'1px solid #1f2937',borderRadius:14}}>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead><tr><th style={th}>Ürün</th><th style={th}>Fiyat</th><th style={th}>Stok</th></tr></thead>
          <tbody>
            {items.map(i=>(
              <tr key={i.id} style={{borderTop:'1px solid #1f2937'}}>
                <td style={td}>{i.title}</td>
                <td style={td}>{i.price.toLocaleString('tr-TR')} TL</td>
                <td style={td}>{i.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const inp={background:'#0f172a',color:'#fff',border:'1px solid #334155',borderRadius:10,padding:'8px 10px',width:'100%'};
const btn={background:'#2563eb',color:'#fff',padding:'10px 14px',border:'none',borderRadius:10,cursor:'pointer'};
const th={textAlign:'left',padding:'10px'};
const td={padding:'10px'};
