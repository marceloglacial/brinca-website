---
title: Localization
description: Rules and best practices for implementing localization
tags: [payload, localization, i18n, cms]
---

# Payload CMS Localization Rules

You are an expert Payload CMS developer. When working with localization, follow these rules:

## Core Principles

1. **Field-Level Localization**: Localization applies per field, not per document
2. **Single Source of Truth**: One document per entity, never duplicate per locale
3. **Explicit Locale Handling**: Always pass locale in API requests
4. **Fallback Awareness**: Understand and control fallback behavior
5. **Consistent Locale Codes**: Use ISO-standard locale codes across the stack

---

## Global Configuration

1. ALWAYS define `localization` in `payload.config.ts`
2. MUST include:
   - `locales`
   - `defaultLocale`
3. Prefer object-based locales over strings
4. Keep `fallback: true` unless strict localization is required

### Example

```ts
localization: {
  locales: [
    { code: 'en', label: 'English' },
    { code: 'pt-BR', label: 'Português (Brasil)' },
  ],
  defaultLocale: 'en',
  fallback: true,
}
```

---

## Field Localization

1. Add `localized: true` to every translatable field
2. Only localized fields support multiple languages
3. Do NOT assume entire documents are translated
4. Applies to:
   - text
   - richText
   - array
   - blocks
   - nested fields

### Example

```ts
{
  name: 'title',
  type: 'text',
  localized: true,
}
```

### Stored Format

```ts
title: {
  en: "Hello",
  pt: "Olá"
}
```

---

## API Usage

1. ALWAYS pass `locale` in requests
2. NEVER rely on default locale in production
3. Use `fallback-locale` when needed

### REST

```ts
/api/pages?locale=pt-BR&fallback-locale=en
```

### Local API

```ts
payload.find({
  collection: 'pages',
  locale: 'pt-BR',
  fallbackLocale: 'en',
})
```

---

## Fallback Strategy

1. Fallback is enabled by default
2. Missing translations return fallback locale
3. Disable with:
   - `fallback-locale=none`
4. Use fallback for:
   - SEO stability
   - incomplete translations

---

## Data Modeling

1. Keep ONE document per entity
2. Store translations inside fields
3. NEVER duplicate documents per language

### ❌ Incorrect

```
/page-en
/page-pt
```

### ✅ Correct

```
/page
  title: { en, pt }
```

---

## Admin UI

1. Locale selector is automatic
2. Can restrict locales using `filterAvailableLocales`
3. Useful for:
   - multi-tenant systems
   - role-based access

### Example

```ts
filterAvailableLocales: ({ req, locales }) => {
  return locales.filter(...)
}
```

---

## Locale Strategy

1. Use consistent ISO codes (`en`, `pt-BR`)
2. Prefer regional locales when needed
3. Avoid mixing formats (`en` vs `en-US`)

---

## Advanced: Localized Status

1. Enable only if needed

### Global

```ts
experimental: {
  localizeStatus: true,
}
```

### Collection

```ts
versions: {
  drafts: {
    localizeStatus: true,
  },
}
```

2. Use only when publish state differs per locale

---

## Frontend Architecture

1. Payload handles content localization
2. UI translations must be handled separately

### Separation

- UI text → i18n (e.g. next-intl)
- CMS content → Payload CMS

---

## Common Pitfalls

1. Missing `localized: true`
2. Forgetting `locale` in API requests
3. Expecting full document translation
4. Over-nesting localized fields

---

## Checklist

- [ ] localization configured globally  
- [ ] locales use consistent ISO codes  
- [ ] defaultLocale defined  
- [ ] fields use `localized: true`  
- [ ] frontend sends `locale`  
- [ ] fallback strategy defined  
- [ ] no duplicated documents  
- [ ] UI i18n separated from CMS  