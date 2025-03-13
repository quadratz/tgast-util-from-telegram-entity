import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse spoiler.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "This is a spoiler text.",
	entities: [
		{
			offset: 0,
			length: 23,
			type: "spoiler",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "spoiler",
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
					value: "This is a spoiler text.",
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
