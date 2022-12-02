# Bonbon server

A deno-based app server.

## Data Model

(TODO)

## Further development

Update lock file

```shell
deno cache --import-map=deps.json --unstable --lock=lock.json --lock-write --reload src/app.ts
```

## Testings

```shell
deno test --import-map=./deps.json ./src/tests
```