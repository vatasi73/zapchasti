export function StatusMessage({ variant = 'loading', title, text }) {
  if (variant === 'error') {
    return (
      <div className="status-message status-message--error" role="alert">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    )
  }

  return (
    <div className="status-message" role="status">
      <span className="spinner-border text-warning" aria-hidden="true" />
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
    </div>
  )
}
