# Type Alias: CustomFunctions

> **CustomFunctions**: `object`

Defined in: [packages/core/src/types.ts:255](https://github.com/GeoDaCenter/openassistant/blob/7dec66552ed2da789768e26aca21ecb2918b5d3b/packages/core/src/types.ts#L255)

Type of Custom functions, a dictionary of functions e.g. createMap, createPlot etc.
key is the name of the function, value is the function itself.

The function should return a CustomFunctionOutputProps object, or a Promise of CustomFunctionOutputProps object if it is a async function.

## Index Signature

\[`key`: `string`\]: `object`
