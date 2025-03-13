import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse underline.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "This is an underlined text.",
	entities: [
		{
			offset: 0,
			length: 27,
			type: "underline",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "underline",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 28,
					offset: 27,
				},
			},
			children: [
				{
					type: "text",
					value: "This is an underlined text.",
					position: {
						start: {
							line: 1,
							column: 1,
							offset: 0,
						},
						end: {
							line: 1,
							column: 28,
							offset: 27,
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
			column: 28,
			offset: 27,
		},
	},
};
