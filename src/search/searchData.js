const EMPTY_GOODS_ID = '00000000-0000-0000-0000-000000000000'

function isMissingGood(good) {
  if (!good) {
    return true
  }

  const hasEmptyId = !good.goodsID || good.goodsID === EMPTY_GOODS_ID
  const hasEmptyText = !good.brand && !good.name && !good.number

  return hasEmptyId && hasEmptyText
}

function hasPositiveStock(good) {
  return (good.warehouses ?? []).some((warehouse) => warehouse.stock > 0)
}

export function getBrandChoices(goods) {
  return goods
    .filter((good) => !isMissingGood(good) && hasPositiveStock(good))
    .map((good) => ({
      brand: good.brand,
      name: good.name,
    }))
}

export function getWarehouseOffers(goods) {
  const selectedGood = goods[0]

  if (!selectedGood || isMissingGood(selectedGood)) {
    return []
  }

  const items = [selectedGood, ...(selectedGood.analogues ?? [])]
  const offers = []

  for (const item of items) {
    for (const warehouse of item.warehouses ?? []) {
      if (warehouse.stock > 0) {
        offers.push({
          name: item.name,
          brand: item.brand,
          warehouse: warehouse.code || '',
          price: warehouse.price,
          stock: warehouse.stock,
        })
      }
    }
  }

  return offers
}

export function getOffersCacheKey(article, brand) {
  return `${article}::${brand}`
}

export function getCachedOffers(cache, article, brand) {
  return cache[getOffersCacheKey(article, brand)]
}

export function sortOffers(offers, field, direction) {
  const multiplier = direction === 'asc' ? 1 : -1

  return [...offers].sort((firstOffer, secondOffer) => {
    const firstValue = firstOffer[field]
    const secondValue = secondOffer[field]

    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return (firstValue - secondValue) * multiplier
    }

    return String(firstValue).localeCompare(String(secondValue), 'ru', {
      sensitivity: 'base',
    }) * multiplier
  })
}
