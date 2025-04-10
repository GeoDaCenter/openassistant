# Function: histogramFunctionDefinition()

> **histogramFunctionDefinition**(`context`): `RegisterFunctionCallingProps`

Defined in: [histogram/definition.ts:63](https://github.com/GeoDaCenter/openassistant/blob/a1bcfdf89aac2d64b3bda9cf92b96ead076def28/packages/echarts/src/histogram/definition.ts#L63)

Define the histogram function for tool calling. This function can assist user to create a histogram plot using the values of a variable in the dataset.
The values should be retrieved using the getValues() callback function.

User can select the bars in the histogram plot, and the selections can be synced back to the original dataset using the onSelected() callback.
See [OnSelectedCallback](../type-aliases/OnSelectedCallback.md) for more details.

## Parameters

### context

`CustomFunctionContext`\<`HistogramFunctionContextValues`\>

The context of the function. See [HistogramFunctionContext](../type-aliases/HistogramFunctionContext.md) for more details.

## Returns

`RegisterFunctionCallingProps`

The function definition.
