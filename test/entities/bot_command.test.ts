import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../../src/from_telegram_entity";

test("should parse bot_command.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "/start@entityparser_qz_bot",
	entities: [
		{
			offset: 0,
			length: 26,
			type: "bot_command",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "bot_command",
			value: "/start@entityparser_qz_bot",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 27,
					offset: 26,
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
			column: 27,
			offset: 26,
		},
	},
};
