import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse mention.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "@quadratz",
	entities: [
		{
			offset: 0,
			length: 9,
			type: "mention",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "mention",
			value: "@quadratz",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 10,
					offset: 9,
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
			column: 10,
			offset: 9,
		},
	},
};
