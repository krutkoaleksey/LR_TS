import './sources.css';
import type { Source } from '../../../types/news-api';

class Sources {
    public draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null =
            document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!sourceItemTemp) return;

        data.forEach((item: Source): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl: HTMLElement | null = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (nameEl) nameEl.textContent = item.name;

            const itemEl: HTMLElement | null = sourceClone.querySelector<HTMLElement>('.source__item');
            if (itemEl) itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesRoot: HTMLElement | null = document.querySelector<HTMLElement>('.sources');
        if (!sourcesRoot) return;
        sourcesRoot.append(fragment);
    }
}

export default Sources;
