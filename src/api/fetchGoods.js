const API_URL = 'http://api.favorit-parts.ru/hs/hsprice/'

export async function fetchGoods({ number, brand, analogues = false }) {
  const params = new URLSearchParams()
  params.set('key', import.meta.env.FAVORIT_API_KEY)
  params.set('number', number)

  if (brand) {
    params.set('brand', brand)
  }

  if (analogues) {
    params.set('analogues', 'on')
  }

  const response = await fetch(`${API_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Не удалось выполнить запрос')
  }

  const data = await response.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return data.goods ?? []
}
