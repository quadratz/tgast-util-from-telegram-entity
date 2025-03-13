import { describe, expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { VFile } from "vfile";
import { fromTelegramEntity } from "../src/from_telegram_entity";

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "bold",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 21,
					offset: 20,
				},
			},
			children: [
				{
					type: "text",
					value: "This is a bold text.",
					position: {
						start: {
							line: 1,
							column: 1,
							offset: 0,
						},
						end: {
							line: 1,
							column: 21,
							offset: 20,
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
			column: 21,
			offset: 20,
		},
	},
};

describe("Partial text message.", () => {
	const sample: Pick<Message, "text" | "entities"> = {
		text: "This is a bold text.",
		entities: [
			{
				offset: 0,
				length: 20,
				type: "bold",
			},
		],
	};
	test("vFile as the input.", () => {
		const vFile = new VFile(sample);
		expect(fromTelegramEntity(vFile)).toEqual(expectation);
	});
	test("Object as the input.", () => {
		expect(fromTelegramEntity(sample)).toEqual(expectation);
	});
});

describe("Full text message.", () => {
	const sample = {
		update_id: 936589613,
		message: {
			message_id: 1778287,
			from: {
				id: 423623658,
				is_bot: false,
				first_name: "Qz",
				username: "quadratz",
				language_code: "en",
			},
			chat: {
				id: 423623658,
				first_name: "Qz",
				username: "quadratz",
				type: "private",
			},
			date: 1725958989,
			text: "This is a bold text.",
			entities: [
				{
					offset: 0,
					length: 20,
					type: "bold",
				},
			],
		},
	};
	test("vFile as the input.", () => {
		const vFile = new VFile(sample.message);
		expect(fromTelegramEntity(vFile)).toEqual(expectation);
	});
	test("Object as the input.", () => {
		expect(fromTelegramEntity(sample.message as Message)).toEqual(expectation);
	});
});

describe("Partial caption message.", () => {
	const sample: Pick<Message, "caption" | "caption_entities"> = {
		caption: "This is a bold text.",
		caption_entities: [
			{
				offset: 0,
				length: 20,
				type: "bold",
			},
		],
	};
	test("vFile as the input.", () => {
		const vFile = new VFile(sample);
		expect(fromTelegramEntity(vFile)).toEqual(expectation);
	});
	test("Object as the input.", () => {
		expect(fromTelegramEntity(sample)).toEqual(expectation);
	});
});

describe("Full caption message.", () => {
	const sample = {
		update_id: 937071323,
		message: {
			message_id: 1931206,
			from: {
				id: 423623658,
				is_bot: false,
				first_name: "Qz",
				username: "quadratz",
				language_code: "en",
			},
			chat: {
				id: 423623658,
				first_name: "Qz",
				username: "quadratz",
				type: "private",
			},
			date: 1741800220,
			photo: [
				{
					file_id:
						"AgACAgUAAxkBAAEdd8Zn0cMb-H6Hhy1_PxVsqhW8dYsokgACQsAxG-TgkVaSmFwUsqg3EgEAAwIAA3MAAzYE",
					file_unique_id: "AQADQsAxG-TgkVZ4",
					file_size: 755,
					width: 90,
					height: 34,
				},
				{
					file_id:
						"AgACAgUAAxkBAAEdd8Zn0cMb-H6Hhy1_PxVsqhW8dYsokgACQsAxG-TgkVaSmFwUsqg3EgEAAwIAA20AAzYE",
					file_unique_id: "AQADQsAxG-TgkVZy",
					file_size: 9219,
					width: 320,
					height: 120,
				},
				{
					file_id:
						"AgACAgUAAxkBAAEdd8Zn0cMb-H6Hhy1_PxVsqhW8dYsokgACQsAxG-TgkVaSmFwUsqg3EgEAAwIAA3gAAzYE",
					file_unique_id: "AQADQsAxG-TgkVZ9",
					file_size: 11404,
					width: 400,
					height: 150,
				},
			],
			caption: "This is a bold text.",
			caption_entities: [
				{
					offset: 0,
					length: 20,
					type: "bold",
				},
			],
		},
	};
	test("vFile as the input.", () => {
		const vFile = new VFile(sample.message);
		expect(fromTelegramEntity(vFile)).toEqual(expectation);
	});
	test("Object as the input.", () => {
		expect(fromTelegramEntity(sample.message as Message)).toEqual(expectation);
	});
});
