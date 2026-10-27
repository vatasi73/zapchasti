import { ArticleForm } from "./ArticleForm.jsx";

export function SearchPanel({ article, isLoading, onArticleChange, onSearch }) {
  return (
    <section className="search-hero">
      <div className="page-container">
        <div className="search-panel">
          <h1 className="search-title">Поиск деталей</h1>
          <ArticleForm
            article={article}
            isLoading={isLoading}
            onArticleChange={onArticleChange}
            onSearch={onSearch}
          />
          <p className="search-panel__hint">
            Артикул указан на упаковке или корпусе детали
          </p>
        </div>
      </div>
    </section>
  );
}
