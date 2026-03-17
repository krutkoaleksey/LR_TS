import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { Article, NewsApiResponse, Source } from '../../types/news-api';

type SourcesResponse = NewsApiResponse<'sources', Source[]>;
type NewsResponse = NewsApiResponse<'articles', Article[]>;

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesEl: HTMLElement | null = document.querySelector<HTMLElement>('.sources');
        if (!sourcesEl) return;

        sourcesEl.addEventListener('click', (e: MouseEvent): void => {
            this.controller.getNews(e, (data: NewsResponse): void => this.view.drawNews(data));
        });

        this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;
