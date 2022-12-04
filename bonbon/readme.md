# Bonbon server

A deno-based app server that serves entirely with Bonbons.

## Data Model

```typescript
interface IBonbon {
  id: string;
  dbname: string;
  popular: boolean;
  count: number;
}
```

## Further development

Update lock file

```shell
deno cache --import-map=deps.json --unstable --lock=lock.json --lock-write --reload src/app.ts
```

## Testings

```shell
deno test --import-map=./deps.json ./src/tests
```
