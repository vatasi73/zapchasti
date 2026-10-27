import { OffersTable } from './OffersTable.jsx'

export function OffersSection({ offers, selectedBrand }) {
  return (
    <section className="result-section result-section--offers">
      <div className="section-heading">
        <div>
          <p className="section-heading__step">Результаты</p>
          <h2>Аналоги и предложения</h2>
          <p className="section-heading__description">
            Производитель: <strong>{selectedBrand}</strong>
          </p>
        </div>
        <span className="result-count">{offers.length} предложений</span>
      </div>
      <OffersTable offers={offers} />
    </section>
  )
}
