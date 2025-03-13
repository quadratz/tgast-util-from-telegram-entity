import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import { fromTelegramEntity } from "../src/from_telegram_entity";

test("should error on unknown entity type.", () => {
  expect(() => fromTelegramEntity(sample)).toThrowError(
    `Unknown entity type 'unknown'. Received entity: {
  "offset": 0,
  "length": 20,
  "type": "unknown"
}`,
  );
});

const sample: Pick<Message, "text" | "entities"> = {
  text: "This is an unknown entity.",
  entities: [
    {
      offset: 0,
      length: 20,
      // @ts-expect-error
      type: "unknown",
    },
  ],
};
