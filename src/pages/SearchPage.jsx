import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrandsSection } from '../components/BrandsSection.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { OffersSection } from '../components/OffersSection.jsx'
import { SearchPanel } from '../components/SearchPanel.jsx'
import { StatusMessage } from '../components/StatusMessage.jsx'
import { searchBrands, searchOffers } from '../search/searchSlice.js'

export function SearchPage() {
  const dispatch = useDispatch()
  const [articleInput, setArticleInput] = useState('')

  const article = useSelector((state) => state.search.article)
  const brands = useSelector((state) => state.search.brands)
  const brandsStatus = useSelector((state) => state.search.brandsStatus)
  const brandsError = useSelector((state) => state.search.brandsError)
  const selectedBrand = useSelector((state) => state.search.selectedBrand)
  const offers = useSelector((state) => state.search.offers)
  const offersStatus = useSelector((state) => state.search.offersStatus)
  const offersError = useSelector((state) => state.search.offersError)

  const isSearchingBrands = brandsStatus === 'loading'
  const isSearchingOffers = offersStatus === 'loading'

  function handleSearch() {
    const nextArticle = articleInput.trim()

    if (!nextArticle) {
      return
    }

    dispatch(searchBrands(nextArticle))
  }

  function handleSelectBrand(brand) {
    dispatch(searchOffers({ article, brand }))
  }

  return (
    <div className="app-shell">
      <main>
        <SearchPanel
          article={articleInput}
          isLoading={isSearchingBrands}
          onArticleChange={setArticleInput}
          onSearch={handleSearch}
        />

        <div className="page-container results-area">
          {brandsError && (
            <StatusMessage
              variant="error"
              title="Не удалось выполнить поиск"
              text={brandsError}
            />
          )}

          {isSearchingBrands && (
            <StatusMessage
              title="Ищем производителей"
              text="Это обычно занимает несколько секунд"
            />
          )}

          {brandsStatus === 'success' && brands.length === 0 && (
            <EmptyState
              title="Ничего не найдено"
              text="Проверьте артикул и попробуйте выполнить поиск ещё раз."
            />
          )}

          {brands.length > 0 && (
            <BrandsSection
              brands={brands}
              selectedBrand={selectedBrand}
              onSelect={handleSelectBrand}
            />
          )}

          {offersError && (
            <StatusMessage
              variant="error"
              title="Не удалось загрузить предложения"
              text={offersError}
            />
          )}

          {isSearchingOffers && (
            <StatusMessage
              title="Подбираем аналоги и предложения"
              text="Собираем актуальные цены и остатки"
            />
          )}

          {offersStatus === 'success' && offers.length === 0 && (
            <EmptyState
              compact
              title="Нет предложений с остатком"
              text="Выберите другого производителя или попробуйте другой артикул."
            />
          )}

          {offers.length > 0 && (
            <OffersSection
              offers={offers}
              selectedBrand={selectedBrand}
            />
          )}
        </div>
      </main>
    </div>
  )
}
