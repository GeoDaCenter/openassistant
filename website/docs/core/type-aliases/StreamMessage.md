# Type Alias: StreamMessage

> **StreamMessage**: `object`

Defined in: [packages/core/src/types.ts:324](https://github.com/GeoDaCenter/openassistant/blob/2cb8f20a901f3385efeb40778248119c5e49db78/packages/core/src/types.ts#L324)

Type of StreamMessage. The structure of the stream message is:

```
------------------
| reasoning      |
------------------
| toolCallMessage |
| toolCallMessage |
| toolCallMessage |
------------------
| text           |
------------------
```

## Type declaration

### ~~analysis?~~

> `optional` **analysis**: `string`

The analysis of the message

#### Deprecated

Use parts instead

### parts?

> `optional` **parts**: [`StreamMessagePart`](StreamMessagePart.md)[]

The parts of the message. It is used for storing the returning result from LLM.

### ~~reasoning?~~

> `optional` **reasoning**: `string`

The reasoning of the assistant

#### Deprecated

Use parts instead

### text?

> `optional` **text**: `string`

The text of the message. Normally, it is used for storing user's prompting text.

### ~~toolCallMessages?~~

> `optional` **toolCallMessages**: [`ToolCallMessage`](ToolCallMessage.md)[]

The tool call messages

#### Deprecated

Use parts instead

## Param

(deprecated. use parts instead) The reasoning of the assistant

## Param

(deprecated. use parts instead) The array of tool call messages. See [ToolCallMessage](ToolCallMessage.md) for more details.

## Param

(deprecated. use parts instead) The analysis of the message. This is the text that happens before the tool calls.

## Param

(deprecated. use parts instead) The text of the message. This is the text that happens after the tool calls.

## Param

The parts of the message. This is the text that happens after the tool calls.
