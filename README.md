# BB610 Hub

Преміальна версія головного сайту екосистеми BB610: Garden, Water, Market та Berry.

- `index.html`, `_next`, `media`, `fonts` — готова статична версія для GitHub Pages.
- `source` — React/Vinext-проєкт з Motion, shadcn/ui та локальними бренд-медіа.
- `CNAME` — підключення домену `bb610.com.ua`.

## Локальна розробка

```bash
cd source
npm ci
npm run dev
```

## Перевірка та збірка

```bash
npm run lint
npm run build
```

Статичний шар сформовано з production-рендера, тому інтерактивна карта, анімації та мобільне меню працюють і на GitHub Pages.
