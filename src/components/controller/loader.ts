export type LoaderConstructorOptions = Record<string, string | undefined>;
export type RequestOptions = Record<string, string | undefined>;

export type GetRespParams = {
    endpoint: string;
    options?: RequestOptions;
};

export type Callback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: LoaderConstructorOptions;

    constructor(baseLink: string | undefined, options: LoaderConstructorOptions) {
        this.baseLink = baseLink ?? '';
        this.options = options;
    }

    public getResp<TResponse>(
        { endpoint, options = {} }: GetRespParams,
        callback: Callback<TResponse> = (): void => {
            // eslint-disable-next-line no-console
            console.error('No callback for GET response');
        }
    ): void {
        this.load<TResponse>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                // eslint-disable-next-line no-console
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: Record<string, string | undefined> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            const value: string | undefined = urlOptions[key];
            if (value === undefined) return;
            url += `${key}=${encodeURIComponent(value)}&`;
        });

        return url.slice(0, -1);
    }

    private load<TResponse>(
        method: 'GET',
        endpoint: string,
        callback: Callback<TResponse>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response): Response => this.errorHandler(res))
            .then((res: Response): Promise<TResponse> => res.json() as Promise<TResponse>)
            .then((data: TResponse): void => callback(data))
            .catch((err: unknown): void => {
                // eslint-disable-next-line no-console
                console.error(err);
            });
    }
}

export default Loader;
