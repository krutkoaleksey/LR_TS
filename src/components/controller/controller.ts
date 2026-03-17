import AppLoader from './appLoader';
import type { Article, NewsApiResponse, Source } from '../../types/news-api';
import type { Callback } from './loader';

type SourcesResponse = NewsApiResponse<'sources', Source[]>;
type NewsResponse = NewsApiResponse<'articles', Article[]>;

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<NewsResponse>): void {
        const newsContainer: HTMLElement | null = e.currentTarget as HTMLElement | null;
        if (!newsContainer) return;

        let target: HTMLElement | null = e.target as HTMLElement | null;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (!sourceId) return;

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
