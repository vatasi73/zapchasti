export function OffersCardList({ offers, formatPrice }) {
  return (
    <div className="offer-cards">
      {offers.map((offer, index) => (
        <article
          className="offer-card"
          key={`${offer.brand}-${offer.name}-${offer.warehouse}-${offer.price}-${offer.stock}-${index}`}
        >
          <div className="offer-card__top">
            <span className="brand-label">{offer.brand}</span>
            <span className="warehouse-label">{offer.warehouse || 'Склад не указан'}</span>
          </div>
          <h3>{offer.name}</h3>
          <div className="offer-card__bottom">
            <strong>{formatPrice(offer.price)} ₽</strong>
            <span>
              В наличии <b>{offer.stock} шт.</b>
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}
