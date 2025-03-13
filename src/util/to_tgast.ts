import type { MessageEntity } from "@grammyjs/types";
import type {
	Blockquote,
	Bold,
	BotCommand,
	Cashtag,
	Code,
	CustomEmoji,
	Email,
	ExpandableBlockquote,
	Hashtag,
	Italic,
	Mention,
	PhoneNumber,
	Pre,
	RootContent,
	Spoiler,
	Strikethrough,
	Text,
	TextLink,
	TextMention,
	Underline,
	Url,
} from "tgast";
import { getNodePosition } from "./get_node_position";

export { toTgast };

const toTgast = {
	fromText,
	fromTelegramEntity,
};

/**
 * Converts a Telegram message entity to a tgast node.
 *
 * @param textMsg The text message.
 * @param entity Telegram message entity.
 * @returns RootContent node representing the entity.
 */
function fromTelegramEntity(
	textMsg: string,
	entity: MessageEntity,
): RootContent {
	const ast = { position: getNodePosition(textMsg, entity) };
	const text = textMsg.substring(entity.offset, entity.offset + entity.length);

	switch (entity.type) {
		case "blockquote":
			return Object.assign({ type: "blockquote" } as Blockquote, ast);

		case "bold":
			return Object.assign({ type: "bold" } as Bold, ast);

		case "bot_command":
			return Object.assign(
				{ type: "bot_command", value: text } as BotCommand,
				ast,
			);

		case "cashtag":
			return Object.assign({ type: "cashtag", value: text } as Cashtag, ast);

		case "code":
			return Object.assign({ type: "code", value: text } as Code, ast);

		case "custom_emoji":
			return Object.assign(
				{
					type: "custom_emoji",
					emojiId: entity.custom_emoji_id,
					value: text,
				} as CustomEmoji,
				ast,
			);

		case "email":
			return Object.assign({ type: "email", value: text } as Email, ast);

		case "expandable_blockquote":
			return Object.assign(
				{ type: "expandable_blockquote" } as ExpandableBlockquote,
				ast,
			);

		case "hashtag":
			return Object.assign({ type: "hashtag", value: text } as Hashtag, ast);

		case "italic":
			return Object.assign({ type: "italic" } as Italic, ast);

		case "mention":
			return Object.assign({ type: "mention", value: text } as Mention, ast);

		case "phone_number":
			return Object.assign(
				{ type: "phone_number", value: text } as PhoneNumber,
				ast,
			);

		case "pre":
			return Object.assign(
				{ type: "pre", language: entity.language, value: text } as Pre,
				ast,
			);

		case "spoiler":
			return Object.assign({ type: "spoiler" } as Spoiler, ast);

		case "strikethrough":
			return Object.assign({ type: "strikethrough" } as Strikethrough, ast);

		case "text_link":
			return Object.assign(
				{ type: "text_link", value: text, url: entity.url } as TextLink,
				ast,
			);

		case "text_mention":
			return Object.assign(
				{ type: "text_mention", value: text, user: entity.user } as TextMention,
				ast,
			);

		case "underline":
			return Object.assign({ type: "underline" } as Underline, ast);

		case "url":
			return Object.assign({ type: "url", value: text } as Url, ast);

		default: {
			// Safeguard: Handle unknown entity types.
			// @ts-expect-error
			const type = entity.type;
			throw new TypeError(
				`Unknown entity type '${type}'. Received entity: ${JSON.stringify(
					entity,
					null,
					2,
				)}`,
			);
		}
	}
}

/**
 * Creates a tgast text node.
 *
 * @param textMsg The text message.
 * @param position Start and end position of text node.
 * @returns Text node.
 */
function fromText(
	textMsg: string,
	position: { start: number; end: number },
): Text {
	const text = textMsg.substring(position.start, position.end);
	return {
		type: "text",
		value: text,
		position: getNodePosition(textMsg, position),
	};
}
