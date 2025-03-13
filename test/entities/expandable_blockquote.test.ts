import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse expandable blockquote.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "This\nis\nan\nexpandable\nblockquote.",
	entities: [
		{
			offset: 0,
			length: 33,
			type: "expandable_blockquote",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "expandable_blockquote",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 5,
					column: 12,
					offset: 33,
				},
			},
			children: [
				{
					type: "text",
					value: "This\nis\nan\nexpandable\nblockquote.",
					position: {
						start: {
							line: 1,
							column: 1,
							offset: 0,
						},
						end: {
							line: 5,
							column: 12,
							offset: 33,
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
			line: 5,
			column: 12,
			offset: 33,
		},
	},
};
