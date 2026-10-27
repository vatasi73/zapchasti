function getAriaSort(sort, field) {
  if (sort.field !== field) {
    return 'none'
  }

  return sort.direction === 'asc' ? 'ascending' : 'descending'
}

function getSortIcon(sort, field) {
  if (sort.field !== field) {
    return '↕'
  }

  return sort.direction === 'asc' ? '↑' : '↓'
}

export function OffersDesktopTable({ columns, offers, sort, onSort, formatPrice }) {
  return (
    <div className="offers-table-wrap">
      <table className="offers-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className={column.align === 'end' ? 'text-end' : ''}
                aria-sort={getAriaSort(sort, column.field)}
              >
                <button
                  type="button"
                  className={`table-sort ${column.align === 'end' ? 'table-sort--end' : ''}`}
                  onClick={() => onSort(column.field)}
                >
                  {column.label}
                  <span className="table-sort__icon" aria-hidden="true">
                    {getSortIcon(sort, column.field)}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr
              key={`${offer.brand}-${offer.name}-${offer.warehouse}-${offer.price}-${offer.stock}-${index}`}
            >
              <td className="offers-table__name">{offer.name}</td>
              <td>
                <span className="brand-label">{offer.brand}</span>
              </td>
              <td>
                <span className="warehouse-label">{offer.warehouse || 'Не указан'}</span>
              </td>
              <td className="offers-table__price">
                {formatPrice(offer.price)} <span>₽</span>
              </td>
              <td className="offers-table__stock">
                <span>{offer.stock}</span> шт.
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
