# Function: shouldTriggerNextRequest()

> **shouldTriggerNextRequest**(`messages`, `messageCount`, `maxSteps`, `currentStep`): `boolean`

Defined in: [packages/core/src/llm/vercelai.ts:60](https://github.com/GeoDaCenter/openassistant/blob/bc4037be52d89829440fcc4aaa1010be73719d16/packages/core/src/llm/vercelai.ts#L60)

Checks if another request should be triggered based on the current message state

## Parameters

### messages

`CoreMessage`[]

Current message array

### messageCount

`number`

Previous message count before last request

### maxSteps

`number`

Maximum number of allowed steps

### currentStep

`number`

Current maximum tool invocation step

## Returns

`boolean`

boolean indicating if another request should be triggered
