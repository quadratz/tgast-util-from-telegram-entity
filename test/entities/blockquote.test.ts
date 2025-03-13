import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse blockquote.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "This is a blockquote.",
	entities: [
		{
			offset: 0,
			length: 21,
			type: "blockquote",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "blockquote",
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
			children: [
				{
					type: "text",
					value: "This is a blockquote.",
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
