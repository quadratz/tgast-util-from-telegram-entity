import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import type { VFile } from "vfile";
import { getNodePosition } from "./util/get_node_position";
import { processEntity } from "./util/process_entity";

/**
 * Turn Telegram message into a syntax tree.
 *
 * @param {VFile | Partial<Message>} value Message to parse.
 * @returns {Root} tgast tree.
 */
export function fromTelegramEntity(value: VFile | Partial<Message>): Root {
  const message = {
    text:
      "text" in value ? value.text : "caption" in value ? value.caption : "",
    entities:
      "entities" in value
        ? value.entities
        : "caption_entities" in value
          ? value.caption_entities
          : [],
  };

  message.text ??= "";
  message.entities ??= [];

  // Ensure entities are in offset order.
  // (Defensive measure, Telegram API should provide this)
  message.entities.sort((a, b) => a.offset - b.offset);

  const text = message.text.normalize("NFC");
  const children = processEntity({
    textMsg: text,
    entities: message.entities,
    position: {
      start: 0,
      end: text.length,
    },
  });
  const position = getNodePosition(text, { start: 0, end: text.length });

  return {
    type: "root",
    children,
    position,
  };
}
