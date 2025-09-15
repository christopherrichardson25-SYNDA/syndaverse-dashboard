"use client";
import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ManifestoModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Open/close controlled <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // ESC key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => { e.preventDefault(); onClose(); };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  // Click outside closes
  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top  && e.clientY <= rect.bottom;
    if (!inside) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onMouseDown={onBackdropClick}
      aria-labelledby="manifesto-title"
      className="s-modal"
    >
      <div className="s-card">
        <header className="s-header">
          <h2 id="manifesto-title">SYNDA Manifesto</h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close manifesto"
            className="s-close"
          >
            ✕
          </button>
        </header>

        <p className="s-kicker">
          <strong>Neurodiversity as the next leap in human evolution</strong>
        </p>

        <section className="s-block">
          <h3>1. Biological basis: DNA as an open system</h3>
          <ul>
            <li><strong>DNA is not static</strong>: it responds to environmental, epigenetic and vibrational factors.</li>
            <li><strong>Neurodivergence</strong> (autism, ADHD, giftedness, etc.) can be seen as <strong>adaptive variations</strong> that let the species explore alternative cognitive processing.</li>
            <li>Recent <strong>epigenetics</strong> shows that stress, nutrition, social context and even electromagnetic fields can influence gene expression.</li>
          </ul>
        </section>

        <section className="s-block">
          <h3>2. Brain and resonance</h3>
          <ul>
            <li>The human brain <strong>operates in frequency bands</strong> (delta, theta, alpha, beta, gamma).</li>
            <li><strong>Harmonic leaps</strong> —coherences across multiple frequencies— may favor novel neural connections.</li>
            <li>In neurodivergent people, distinct <strong>electrical and synaptic patterns</strong> suggest sensitivity to shifts in the environment’s <strong>vibrational coherence</strong>.</li>
          </ul>
        </section>

        <section className="s-block">
          <h3>3. Evolutionary transition</h3>
          <ul>
            <li>If over <strong>25% of the population</strong> shows neurodivergent traits, it may signal an <strong>evolutionary transition</strong>: integrating variants as new capabilities.</li>
            <li>In <strong>TRU-e</strong> terms:
              <ul>
                <li><strong>Harmonic leaps</strong> act as <em>collective resonances</em> opening new mental configurations.</li>
                <li><strong>DNA</strong> behaves like a <em>biological antenna</em>, tuning to frequencies that favor these variants.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="s-block">
          <h3>4. Integrative hypothesis</h3>
          <ul>
            <li>Neurodivergence may not be a “disorder” but an <strong>advance in brain plasticity</strong> in a changing planet.</li>
            <li>“Harmonic leaps” —Schumann resonance, technological environment, social convergence— work as <strong>evolutionary catalysts</strong>.</li>
            <li>Humanity evolves not only by genetic randomness but also by <strong>collective resonance</strong>.</li>
          </ul>
        </section>

        <aside className="s-note">
          💡 At SYNDAverse, <strong>neurodivergent people</strong> are the species’ <strong>“sensitive antennas”</strong> — ahead of a pattern the rest of humanity will integrate in the next stage.
        </aside>
      </div>

      <style jsx>{`
        .s-modal { padding: 0; border: none; background: transparent; }
        .s-modal::backdrop { backdrop-filter: blur(4px); background: rgba(0,0,0,.35); }
        .s-card {
          width: min(920px, 92vw);
          max-height: 84vh;
          overflow: auto;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,.15);
          padding: 24px 24px 28px;
        }
        .s-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .s-header h2 { margin: 0; font-size: 1.4rem; letter-spacing: .2px; }
        .s-close {
          border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb;
          padding: 6px 10px; cursor: pointer; font-size: 1rem;
        }
        .s-close:hover { background:#f3f4f6; }
        .s-kicker { margin: 6px 0 18px; color: #374151; }
        .s-block { margin: 18px 0; }
        .s-block h3 { margin: 0 0 8px; font-size: 1.05rem; }
        .s-block ul { margin: 0; padding-left: 18px; line-height: 1.55; }
        .s-note {
          margin-top: 16px; padding: 12px 14px; border-radius: 12px;
          background: #f0f9ff; color: #0c4a6e; border: 1px solid #bae6fd;
        }
        @media (prefers-color-scheme: dark) {
          .s-card { background: #0b0f14; color: #e5e7eb; }
          .s-close { background:#0f141a; border-color:#1f2937; color:#e5e7eb; }
          .s-close:hover { background:#131923; }
          .s-note { background:#0b2230; border-color:#134d63; color:#cfe9f7; }
        }
      `}</style>
    </dialog>
  );
}
