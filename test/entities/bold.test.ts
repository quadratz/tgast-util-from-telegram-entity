import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse bold.", () => {
  expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
  text: "This is a bold text.",
  entities: [
    {
      offset: 0,
      length: 20,
      type: "bold",
    },
  ],
};

const expectation: Root = {
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
};
