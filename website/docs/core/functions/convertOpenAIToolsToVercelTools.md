# Function: convertOpenAIToolsToVercelTools()

> **convertOpenAIToolsToVercelTools**(`tools`): `ToolSet`

Defined in: [packages/core/src/lib/tool-utils.ts:9](https://github.com/GeoDaCenter/openassistant/blob/2cb8f20a901f3385efeb40778248119c5e49db78/packages/core/src/lib/tool-utils.ts#L9)

Converts OpenAI tool format to Vercel AI SDK tool format

## Parameters

### tools

`ToolSet`

Object containing OpenAI function tools

## Returns

`ToolSet`

Converted tools in Vercel AI SDK format

## Throws

If any tool is not of type 'function'
