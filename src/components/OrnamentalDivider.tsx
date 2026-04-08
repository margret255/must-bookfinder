export function OrnamentalDivider({ symbol = "◆" }: { symbol?: string }) {
  return (
    <div className="ornamental-divider" aria-hidden="true">
      <span className="text-primary/40 text-xs tracking-[0.3em] font-serif select-none">
        {symbol}
      </span>
    </div>
  );
}
