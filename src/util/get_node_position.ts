import type { MessageEntity } from "@grammyjs/types";
import indexToPosition from "index-to-position";
import type { Position } from "unist";

/**
 * Get position in text.
 *
 * Converts character offsets to line and column based positions.
 * @param text The input text.
 * @param options Offset or entity with start and end positions.
 * @returns Position in text.
 */
export function getNodePosition(
  text: string,
  options: { start: number; end: number } | MessageEntity,
): Position {
  let offset: number;
  let length: number;

  if ("start" in options && "end" in options) {
    // Options with explicit start and end
    offset = options.start;
    length = options.end;
  } else {
    // Options as MessageEntity with offset and length
    offset = options.offset;
    length = offset + options.length;
  }

  const ast: Position = {
    start: {
      ...indexToPosition(text, offset, { oneBased: true }),
      offset: offset,
    },
    end: {
      ...indexToPosition(text, length - 1, {
        oneBased: true,
      }),
      offset: length,
    },
  };

  ast.end.column++;

  return ast;
}
