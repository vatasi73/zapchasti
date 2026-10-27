export function OffersSortToolbar({ columns, sort, onSort }) {
  return (
    <div className="sort-toolbar" aria-label="Сортировка предложений">
      <span className="sort-toolbar__label">Сортировать:</span>
      {columns.map((column) => (
        <button
          key={column.field}
          type="button"
          className={`sort-chip ${sort.field === column.field ? 'sort-chip--active' : ''}`}
          onClick={() => onSort(column.field)}
        >
          {column.label}
          {sort.field === column.field && (
            <span aria-hidden="true">{sort.direction === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      ))}
    </div>
  )
}
