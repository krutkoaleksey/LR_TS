export type NewsApiResponse<TPayloadKey extends string, TPayload> = {
    status?: string;
    totalResults?: number;
} & Partial<Record<TPayloadKey, TPayload>>;

export interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface ArticleSource {
    id?: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author?: string | null;
    title: string;
    description?: string | null;
    url: string;
    urlToImage?: string | null;
    publishedAt: string;
    content?: string | null;
}
