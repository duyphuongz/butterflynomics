export function Scorebar({
  score,
  kind,
}: {
  score: number
  kind: 'positive' | 'negative' | 'speculative'
}) {
  const pct = Math.min(100, Math.round(Math.abs(score) * 100))
  const cls = kind === 'speculative' ? 'bn-scorebar' : `bn-scorebar bn-scorebar--${kind}`
  return (
    <span className={cls} aria-hidden="true">
      <i style={{ width: `${pct}%` }} className={kind === 'speculative' ? 'bg-faint' : undefined} />
    </span>
  )
}
