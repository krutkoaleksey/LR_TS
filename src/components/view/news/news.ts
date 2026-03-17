import './news.css';
import type { Article } from '../../../types/news-api';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item: Article, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (!newsItemTemp) return;

        news.forEach((item: Article, idx: number): void => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__item');
            if (newsItem && idx % 2) newsItem.classList.add('alt');

            const photoEl: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photoEl) {
                photoEl.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const authorEl: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (authorEl) authorEl.textContent = item.author || item.source.name;

            const dateEl: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (dateEl) {
                dateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const titleEl: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (titleEl) titleEl.textContent = item.title;

            const sourceEl: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (sourceEl) sourceEl.textContent = item.source.name;

            const contentEl: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (contentEl) contentEl.textContent = item.description ?? '';

            const linkEl: HTMLAnchorElement | null = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (linkEl) linkEl.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsRoot: HTMLElement | null = document.querySelector('.news');
        if (!newsRoot) return;
        newsRoot.innerHTML = '';
        newsRoot.appendChild(fragment);
    }
}

export default News;