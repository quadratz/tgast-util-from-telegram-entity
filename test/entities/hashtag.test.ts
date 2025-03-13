import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse hashtag.", () => {
  expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
  text: "#DontBeEvil",
  entities: [
    {
      offset: 0,
      length: 11,
      type: "hashtag",
    },
  ],
};

const expectation: Root = {
  type: "root",
  children: [
    {
      type: "hashtag",
      value: "#DontBeEvil",
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 12,
          offset: 11,
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
      column: 12,
      offset: 11,
    },
  },
};
