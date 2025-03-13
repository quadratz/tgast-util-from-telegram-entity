import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse email.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "quadratz@proton.me",
	entities: [
		{
			offset: 0,
			length: 18,
			type: "email",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "email",
			value: "quadratz@proton.me",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 19,
					offset: 18,
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
			column: 19,
			offset: 18,
		},
	},
};
