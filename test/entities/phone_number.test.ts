import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse phone number.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "+1-212-555-0123",
	entities: [
		{
			offset: 0,
			length: 15,
			type: "phone_number",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "phone_number",
			value: "+1-212-555-0123",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 16,
					offset: 15,
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
			column: 16,
			offset: 15,
		},
	},
};
