import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse italic.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "This is an italic text.",
	entities: [
		{
			offset: 0,
			length: 23,
			type: "italic",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "italic",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 24,
					offset: 23,
				},
			},
			children: [
				{
					type: "text",
					value: "This is an italic text.",
					position: {
						start: {
							line: 1,
							column: 1,
							offset: 0,
						},
						end: {
							line: 1,
							column: 24,
							offset: 23,
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
			column: 24,
			offset: 23,
		},
	},
};
