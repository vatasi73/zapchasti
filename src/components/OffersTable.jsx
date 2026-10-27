import { useState } from 'react'
import { sortOffers } from '../search/searchData.js'
import { OffersCardList } from './OffersCardList.jsx'
import { OffersDesktopTable } from './OffersDesktopTable.jsx'
import { OffersSortToolbar } from './OffersSortToolbar.jsx'

const priceFormat = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const columns = [
  { field: 'name', label: 'Название' },
  { field: 'brand', label: 'Производитель' },
  { field: 'warehouse', label: 'Склад' },
  { field: 'price', label: 'Цена', align: 'end' },
  { field: 'stock', label: 'Остаток', align: 'end' },
]

function formatPrice(price) {
  return priceFormat.format(price)
}

export function OffersTable({ offers }) {
  const [sort, setSort] = useState({ field: 'price', direction: 'asc' })
  const sortedOffers = sortOffers(offers, sort.field, sort.direction)

  function handleSort(field) {
    setSort((currentSort) => ({
      field,
      direction:
        currentSort.field === field && currentSort.direction === 'asc'
          ? 'desc'
          : 'asc',
    }))
  }

  return (
    <>
      <OffersSortToolbar
        columns={columns}
        sort={sort}
        onSort={handleSort}
      />
      <OffersDesktopTable
        columns={columns}
        offers={sortedOffers}
        sort={sort}
        onSort={handleSort}
        formatPrice={formatPrice}
      />
      <OffersCardList
        offers={sortedOffers}
        formatPrice={formatPrice}
      />
    </>
  )
}
