export function EmptyState({ title, text, compact = false }) {
  return (
    <div className={`empty-state${compact ? ' empty-state--compact' : ''}`}>
      {!compact && (
        <span className="empty-state__icon" aria-hidden="true">?</span>
      )}
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}
