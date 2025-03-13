# tgast-util-from-telegram-entity

**[tgast][github-tgast]** utility that turns [telegram entity][tg-entity] into a
syntax tree.

## What is this?

This package is a utility that takes [telegram entity][tg-entity] input and
turns it into an [tgast][github-tgast] syntax tree.

This package is used inside [`regram-parse`][github-regram-parse], which focuses
on making it easier to transform content by abstracting these internals away.

## When should I use this?

If you want to handle syntax trees manually, use this. For an easier time
processing content, use the **[regram][github-regram]** ecosystem instead.

## Install

```sh
npm install tgast-util-from-telegram-entity
```

## Use

Say we have the following [telegram entity][tg-entity]:

```json
{
  "text": "This is a bold text.",
  "entities": [
    {
      "offset": 0,
      "length": 20,
      "type": "bold"
    }
  ]
}
```

…and our module `example.ts` looks as follows:

```ts
import type { Message } from "@grammyjs/types";
import { fromTelegramEntity } from "tgast-util-from-telegram-entity";

const telegramEntity = {
  text: "This is a bold text.",
  entities: [
    {
      offset: 0,
      length: 20,
      type: "bold",
    },
  ],
};

const tree = fromTelegramEntity(telegramEntity as Partial<Message>);

console.log(tree);
```

…now the `console.log(tree)` will yield:

```ts
{
  type: "root",
  children: [
    {
      type: "bold",
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 21,
          offset: 20,
        },
      },
      children: [
        {
          type: "text",
          value: "This is a bold text.",
          position: {
            start: {
              line: 1,
              column: 1,
              offset: 0,
            },
            end: {
              line: 1,
              column: 21,
              offset: 20,
            },
          },
        },
      ],
    },
  ],
  position: {
    start: {
      line: 1,
      column: 1,
      offset: 0,
    },
    end: {
      line: 1,
      column: 21,
      offset: 20,
    },
  },
}
```

## Related

- [`regram`][github-regram] — process telegram entity

[github-regram]: https://github.com/quadratz/regram
[github-regram-parse]: https://github.com/quadratz/regram-parse
[github-tgast]: https://github.com/quadratz/tgast
[tg-entity]: https://core.telegram.org/bots/api#messageentity
