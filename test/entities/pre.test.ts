import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse pre.", () => {
  expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
  text: 'console.log("This is a monowidth block.");',
  entities: [
    {
      offset: 0,
      length: 42,
      type: "pre",
      language: "JavaScript",
    },
  ],
};

const expectation: Root = {
  type: "root",
  children: [
    {
      type: "pre",
      value: 'console.log("This is a monowidth block.");',
      language: "JavaScript",
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 43,
          offset: 42,
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
      column: 43,
      offset: 42,
    },
  },
};
