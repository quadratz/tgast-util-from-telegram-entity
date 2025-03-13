import { expect, test } from "bun:test";
import type { Message } from "@grammyjs/types";
import type { Root } from "tgast";
import { fromTelegramEntity } from "../src/from_telegram_entity";

test("should parse nested entities.", () => {
	expect(fromTelegramEntity(sample)).toEqual(expectation);
});

const sample: Pick<Message, "text" | "entities"> = {
	text: "Nobody is coming to save you. Get up. Be your own hero.",
	entities: [
		{
			offset: 10,
			length: 2,
			type: "bold",
		},
		{
			offset: 12,
			length: 8,
			type: "bold",
		},
		{
			offset: 12,
			length: 8,
			type: "italic",
		},
		{
			offset: 20,
			length: 10,
			type: "italic",
		},
		{
			offset: 20,
			length: 9,
			type: "bold",
		},
		{
			offset: 20,
			length: 4,
			type: "underline",
		},
		{
			offset: 30,
			length: 8,
			type: "spoiler",
		},
		{
			offset: 30,
			length: 7,
			type: "italic",
		},
	],
};

const expectation: Root = {
	type: "root",
	children: [
		{
			type: "text",
			value: "Nobody is ",
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 11, offset: 10 },
			},
		},
		{
			type: "bold",
			position: {
				start: { line: 1, column: 11, offset: 10 },
				end: { line: 1, column: 13, offset: 12 },
			},
			children: [
				{
					type: "text",
					value: "co",
					position: {
						start: { line: 1, column: 11, offset: 10 },
						end: { line: 1, column: 13, offset: 12 },
					},
				},
			],
		},
		{
			type: "bold",
			position: {
				start: { line: 1, column: 13, offset: 12 },
				end: { line: 1, column: 21, offset: 20 },
			},
			children: [
				{
					type: "italic",
					position: {
						start: { line: 1, column: 13, offset: 12 },
						end: { line: 1, column: 21, offset: 20 },
					},
					children: [
						{
							type: "text",
							value: "ming to ",
							position: {
								start: { line: 1, column: 13, offset: 12 },
								end: { line: 1, column: 21, offset: 20 },
							},
						},
					],
				},
			],
		},
		{
			type: "italic",
			position: {
				start: { line: 1, column: 21, offset: 20 },
				end: { line: 1, column: 31, offset: 30 },
			},
			children: [
				{
					type: "bold",
					position: {
						start: { line: 1, column: 21, offset: 20 },
						end: { line: 1, column: 30, offset: 29 },
					},
					children: [
						{
							type: "underline",
							position: {
								start: { line: 1, column: 21, offset: 20 },
								end: { line: 1, column: 25, offset: 24 },
							},
							children: [
								{
									type: "text",
									value: "save",
									position: {
										start: { line: 1, column: 21, offset: 20 },
										end: { line: 1, column: 25, offset: 24 },
									},
								},
							],
						},
						{
							type: "text",
							value: " you.",
							position: {
								start: { line: 1, column: 25, offset: 24 },
								end: { line: 1, column: 30, offset: 29 },
							},
						},
					],
				},
				{
					type: "text",
					value: " ",
					position: {
						start: { line: 1, column: 30, offset: 29 },
						end: { line: 1, column: 31, offset: 30 },
					},
				},
			],
		},
		{
			type: "spoiler",
			position: {
				start: { line: 1, column: 31, offset: 30 },
				end: { line: 1, column: 39, offset: 38 },
			},
			children: [
				{
					type: "italic",
					position: {
						start: { line: 1, column: 31, offset: 30 },
						end: { line: 1, column: 38, offset: 37 },
					},
					children: [
						{
							type: "text",
							value: "Get up.",
							position: {
								start: { line: 1, column: 31, offset: 30 },
								end: { line: 1, column: 38, offset: 37 },
							},
						},
					],
				},
				{
					type: "text",
					value: " ",
					position: {
						start: { line: 1, column: 38, offset: 37 },
						end: { line: 1, column: 39, offset: 38 },
					},
				},
			],
		},
		{
			type: "text",
			value: "Be your own hero.",
			position: {
				start: { line: 1, column: 39, offset: 38 },
				end: { line: 1, column: 56, offset: 55 },
			},
		},
	],
	position: {
		start: { line: 1, column: 1, offset: 0 },
		end: { line: 1, column: 56, offset: 55 },
	},
};
