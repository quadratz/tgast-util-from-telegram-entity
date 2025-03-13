import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse cashtag.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "$IDR",
	entities: [
		{
			offset: 0,
			length: 4,
			type: "cashtag",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "cashtag",
			value: "$IDR",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 5,
					offset: 4,
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
			column: 5,
			offset: 4,
		},
	},
};
