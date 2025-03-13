import type { MessageEntity } from "@grammyjs/types";
import type { Literal, RootContent } from "tgast";
import { toTgast } from "./to_tgast";

export { processEntity };

/**
 * Processes text and Telegram entities to build a Telegram AST.
 *
 * This is the core recursive function that iterates through message
 * entities, generating corresponding AST nodes, and recursively
 * processing nested entities.
 */
/**
 * Processes text and Telegram entities to build a Telegram AST.
 *
 * @param options Options for processing entities.
 * @param options.textMsg The text message.
 * @param options.entities Array of Telegram {@linkcode MessageEntity}.
 * @param options.position Start and end position for processing.
 * @returns Array of RootContent nodes representing the processed entities
 * and text.
 */
function processEntity(options: {
	textMsg: string;
	entities: MessageEntity[];
	position: { start: number; end: number };
}): RootContent[] {
	const { textMsg, entities, position } = options;
	let cursor = position.start; // Tracks current position in text
	const result: RootContent[] = []; // Accumulates resulting tgast nodes

	for (let index = 0; index < entities.length; index++) {
		const entity = entities[index];

		if (!entity || entity.offset < cursor) {
			continue; // Skip invalid or already processed entities
		}

		// Handle text segment before current entity
		if (cursor < entity.offset) {
			const textNode = toTgast.fromText(textMsg, {
				start: cursor,
				end: entity.offset,
			});
			result.push(textNode);
		}

		// Extract entities nested within current entity
		const innerEntities: MessageEntity[] = [];
		const outerStart = entity.offset;
		const outerEnd = entity.offset + entity.length;
		let innerIndex = index + 1;

		while (true) {
			const innerEntity = entities.at(innerIndex);
			if (!innerEntity) break; // No more entities to check

			const innerStart = innerEntity.offset;
			const innerEnd = innerStart + innerEntity.length;

			// Inner entity extends beyondcurrent entity
			if (innerEnd > outerEnd) break;

			innerEntities.push(innerEntity);
			innerIndex++;
		}

		// Create tgast node for the current entity
		const currentNode: RootContent = toTgast.fromTelegramEntity(
			textMsg,
			entity,
		);

		/**
		 * Skip processing inner entities if the current node is of
		 * type {@linkcode Literal}. Literal nodes should not have children.
		 */
		if (!Object.hasOwn(currentNode, "value")) {
			// Recursively process inner entities
			const processedInnerEntities = processEntity({
				textMsg,
				entities: innerEntities,
				position: { start: outerStart, end: outerEnd },
			});

			// Add processed children to current node
			Object.assign(currentNode, { children: processedInnerEntities });
		}

		result.push(currentNode); // Add current node to result
		cursor = outerEnd; // Update cursor to end of current entity
	}

	// Handle remaining text after last entity
	if (cursor < position.end) {
		const textNode = toTgast.fromText(textMsg, {
			start: cursor,
			end: position.end,
		});
		result.push(textNode);
	}

	return result;
}
