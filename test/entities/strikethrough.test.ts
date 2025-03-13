import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse strikethrough.", () => {
  expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
  text: "This is a strikethrough text.",
  entities: [
    {
      offset: 0,
      length: 29,
      type: "strikethrough",
    },
  ],
};

const expectation: Root = {
  type: "root",
  children: [
    {
      type: "strikethrough",
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 30,
          offset: 29,
        },
      },
      children: [
        {
          type: "text",
          value: "This is a strikethrough text.",
          position: {
            start: {
              line: 1,
              column: 1,
              offset: 0,
            },
            end: {
              line: 1,
              column: 30,
              offset: 29,
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
      column: 30,
      offset: 29,
    },
  },
};
