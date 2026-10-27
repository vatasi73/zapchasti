import { BrandList } from './BrandList.jsx'

export function BrandsSection({ brands, selectedBrand, onSelect }) {
  return (
    <section className="result-section">
      <div className="section-heading">
        <div>
          <h2>Выберите нужную деталь</h2>
          <p className="section-heading__description">
            Сверьте название и производителя
          </p>
        </div>
        <span className="result-count">{brands.length} вариантов</span>
      </div>
      <BrandList
        brands={brands}
        selectedBrand={selectedBrand}
        onSelect={onSelect}
      />
    </section>
  )
}
