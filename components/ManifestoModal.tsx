'use client';
import {useEffect, useRef} from 'react';

export default function ManifestoModal({ open, onClose }: {open:boolean; onClose:()=>void;}){
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    const d=dialogRef.current; if(!d) return;
    if(open && !d.open){ d.showModal(); setTimeout(()=>closeBtnRef.current?.focus(),0); }
    else if(!open && d.open){ d.close(); }
  },[open]);

  useEffect(()=>{
    const d=dialogRef.current; if(!d) return;
    const onCancel=(e:Event)=>{ e.preventDefault(); onClose(); };
    d.addEventListener('cancel', onCancel);
    return ()=> d.removeEventListener('cancel', onCancel);
  },[onClose]);

  const onBackdrop=(e:React.MouseEvent<HTMLDialogElement>)=>{
    const d=dialogRef.current; if(!d) return;
    const r=d.getBoundingClientRect();
    const inside = e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom;
    if(!inside) onClose();
  };

  return (
    <dialog ref={dialogRef} onMouseDown={onBackdrop} className="p-0 bg-transparent">
      <div className="card w-[min(920px,92vw)] max-h-[84vh] overflow-auto p-6">
        <header className="flex items-center justify-between gap-3">
          <h2 className="m-0 text-xl font-semibold">SYNDA Manifesto</h2>
          <button ref={closeBtnRef} onClick={onClose} className="btn-outline px-3 py-1.5">✕</button>
        </header>
        <p className="mt-3 text-slate-700"><b>Neurodivergence as the next step of human evolution.</b></p>
        <p className="text-slate-700">We explore biology, resonance and collective intelligence as levers to transform difference into creative power.</p>
      </div>
      <style jsx>{`dialog::backdrop{backdrop-filter:blur(4px);background:rgba(0,0,0,.35);}`}</style>
    </dialog>
  );
}
