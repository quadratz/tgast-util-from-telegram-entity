import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../src/from_telegram_entity";

test("should parse multiple entities.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "This is bold italic strikethrough monospace",
	entities: [
		{
			offset: 8,
			length: 4,
			type: "bold",
		},
		{
			offset: 13,
			length: 6,
			type: "italic",
		},
		{
			offset: 20,
			length: 13,
			type: "strikethrough",
		},
		{
			offset: 34,
			length: 9,
			type: "code",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "text",
			value: "This is ",
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 1,
					column: 9,
					offset: 8,
				},
			},
		},
		{
			type: "bold",
			position: {
				start: {
					line: 1,
					column: 9,
					offset: 8,
				},
				end: {
					line: 1,
					column: 13,
					offset: 12,
				},
			},
			children: [
				{
					type: "text",
					value: "bold",
					position: {
						start: {
							line: 1,
							column: 9,
							offset: 8,
						},
						end: {
							line: 1,
							column: 13,
							offset: 12,
						},
					},
				},
			],
		},
		{
			type: "text",
			value: " ",
			position: {
				start: {
					line: 1,
					column: 13,
					offset: 12,
				},
				end: {
					line: 1,
					column: 14,
					offset: 13,
				},
			},
		},
		{
			type: "italic",
			position: {
				start: {
					line: 1,
					column: 14,
					offset: 13,
				},
				end: {
					line: 1,
					column: 20,
					offset: 19,
				},
			},
			children: [
				{
					type: "text",
					value: "italic",
					position: {
						start: {
							line: 1,
							column: 14,
							offset: 13,
						},
						end: {
							line: 1,
							column: 20,
							offset: 19,
						},
					},
				},
			],
		},
		{
			type: "text",
			value: " ",
			position: {
				start: {
					line: 1,
					column: 20,
					offset: 19,
				},
				end: {
					line: 1,
					column: 21,
					offset: 20,
				},
			},
		},
		{
			type: "strikethrough",
			position: {
				start: {
					line: 1,
					column: 21,
					offset: 20,
				},
				end: {
					line: 1,
					column: 34,
					offset: 33,
				},
			},
			children: [
				{
					type: "text",
					value: "strikethrough",
					position: {
						start: {
							line: 1,
							column: 21,
							offset: 20,
						},
						end: {
							line: 1,
							column: 34,
							offset: 33,
						},
					},
				},
			],
		},
		{
			type: "text",
			value: " ",
			position: {
				start: {
					line: 1,
					column: 34,
					offset: 33,
				},
				end: {
					line: 1,
					column: 35,
					offset: 34,
				},
			},
		},
		{
			type: "code",
			value: "monospace",
			position: {
				start: {
					line: 1,
					column: 35,
					offset: 34,
				},
				end: {
					line: 1,
					column: 44,
					offset: 43,
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
			column: 44,
			offset: 43,
		},
	},
};
