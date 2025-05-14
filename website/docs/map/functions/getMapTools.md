# Function: getMapTools()

> **getMapTools**(`toolContext`, `onToolCompleted`, `isExecutable`): `object`

Defined in: [packages/map/src/register-tools.ts:137](https://github.com/GeoDaCenter/openassistant/blob/2c7e2a603db0fcbd6603996e5ea15006191c5f7f/packages/map/src/register-tools.ts#L137)

Get all keplergl tools.

## Parameters

### toolContext

[`KeplerglToolContext`](../type-aliases/KeplerglToolContext.md)

The tool context, which is required for some tools e.g. routing, isochrone, etc.

### onToolCompleted

`OnToolCompleted`

The callback function to handle the tool completion and get the output data from the tool call

### isExecutable

`boolean` = `true`

Whether the tool is executable e.g. on the server side, default to true. If false, you need to execute the tool on the client side.

## Returns

`object`

The tools
