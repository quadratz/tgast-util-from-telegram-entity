import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse text mention.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "Qz",
	entities: [
		{
			offset: 0,
			length: 2,
			type: "text_mention",
			user: {
				id: 423623658,
				is_bot: false,
				first_name: "Qz",
				language_code: "en",
			},
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "text_mention",
			value: "Qz",
			user: {
				id: 423623658,
				is_bot: false,
				first_name: "Qz",
				language_code: "en",
			},
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 3,
					offset: 2,
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
			column: 3,
			offset: 2,
		},
	},
};
