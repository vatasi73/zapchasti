export function BrandList({ brands, selectedBrand, onSelect }) {
  return (
    <div className="brand-grid">
      {brands.map((item) => {
        const isSelected = item.brand === selectedBrand

        return (
          <button
            key={`${item.brand}-${item.name}`}
            type="button"
            className={`brand-card ${isSelected ? 'brand-card--selected' : ''}`}
            onClick={() => onSelect(item.brand)}
            aria-pressed={isSelected}
          >
            <span className="brand-card__mark">{item.brand.slice(0, 2)}</span>
            <span className="brand-card__content">
              <strong>{item.brand}</strong>
              <span>{item.name}</span>
            </span>
            <svg className="brand-card__arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
