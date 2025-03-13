import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse url.", () => {
  expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
  text: "https://t.me/quadratz",
  entities: [
    {
      offset: 0,
      length: 21,
      type: "url",
    },
  ],
};

const expectation: Root = {
  type: "root",
  children: [
    {
      type: "url",
      value: "https://t.me/quadratz",
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 22,
          offset: 21,
        },
      },
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
      column: 22,
      offset: 21,
    },
  },
};
