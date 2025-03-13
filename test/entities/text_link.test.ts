import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse text link.", () => {
  expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
  text: "Click me!",
  entities: [
    {
      offset: 0,
      length: 9,
      type: "text_link",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
};

const expectation: Root = {
  type: "root",
  children: [
    {
      type: "text_link",
      value: "Click me!",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 10,
          offset: 9,
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
      column: 10,
      offset: 9,
    },
  },
};
