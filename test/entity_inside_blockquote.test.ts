import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../src/from_telegram_entity";

test("should parse entity inside blockquote.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "This is a bold text inside a blockquote.",
	entities: [
		{
			offset: 0,
			length: 40,
			type: "blockquote",
		},
		{
			offset: 10,
			length: 9,
			type: "bold",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "blockquote",
			children: [
				{
					type: "text",
					value: "This is a ",
					position: {
						start: {
							line: 1,
							column: 1,
							offset: 0,
						},
						end: {
							line: 1,
							column: 11,
							offset: 10,
						},
					},
				},
				{
					type: "bold",
					children: [
						{
							type: "text",
							value: "bold text",
							position: {
								start: {
									line: 1,
									column: 11,
									offset: 10,
								},
								end: {
									line: 1,
									column: 20,
									offset: 19,
								},
							},
						},
					],
					position: {
						start: {
							line: 1,
							column: 11,
							offset: 10,
						},
						end: {
							line: 1,
							column: 20,
							offset: 19,
						},
					},
				},
				{
					type: "text",
					value: " inside a blockquote.",
					position: {
						start: {
							line: 1,
							column: 20,
							offset: 19,
						},
						end: {
							line: 1,
							column: 41,
							offset: 40,
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
					column: 41,
					offset: 40,
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
			column: 41,
			offset: 40,
		},
	},
};
