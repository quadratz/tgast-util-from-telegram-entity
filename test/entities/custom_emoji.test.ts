import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse custom_emoji.", () => {
  expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
  text: "👀",
  entities: [
    {
      offset: 0,
      length: 2,
      type: "custom_emoji",
      custom_emoji_id: "5269436882302811645",
    },
  ],
};

const expectation: Root = {
  type: "root",
  children: [
    {
      type: "custom_emoji",
      emojiId: "5269436882302811645",
      value: "👀",
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 3,
          offset: 2,
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
      column: 3,
      offset: 2,
    },
  },
};
