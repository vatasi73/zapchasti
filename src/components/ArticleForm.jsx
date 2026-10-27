export function ArticleForm({ article, isLoading, onArticleChange, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="article">
        Артикул автозапчасти
      </label>
      <div className="search-control">
        <svg
          className="search-control__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
        </svg>
        <input
          id="article"
          className={`search-control__input${article ? " search-control__input--clearable" : ""}`}
          value={article}
          onChange={(event) => onArticleChange(event.target.value)}
          placeholder="Введите артикул, например 01089"
          autoComplete="off"
          spellCheck="false"
          disabled={isLoading}
          required
        />
        {article ? (
          <button
            className="search-control__clear"
            type="button"
            aria-label="Очистить артикул"
            disabled={isLoading}
            onClick={() => onArticleChange("")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>
        ) : null}
      </div>
      <button
        className="search-form__button"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            />
            Ищем
          </>
        ) : (
          "Найти запчасть"
        )}
      </button>
    </form>
  );
}
