# Type Alias: ExecuteHistogramResult

> **ExecuteHistogramResult**: `object`

Defined in: [packages/echarts/src/histogram/tool.ts:58](https://github.com/GeoDaCenter/openassistant/blob/ae6e39c15b60e7a98a21d90a5bbeff5dc44c1295/packages/echarts/src/histogram/tool.ts#L58)

The result of the histogram tool.

## Type declaration

### additionalData?

> `optional` **additionalData**: `object`

#### additionalData.barDataIndexes

> **barDataIndexes**: `number`[][]

#### additionalData.datasetName

> **datasetName**: `string`

#### additionalData.histogramData

> **histogramData**: `object`[]

#### additionalData.id

> **id**: `string`

#### additionalData.isDraggable?

> `optional` **isDraggable**: `boolean`

#### additionalData.isExpanded?

> `optional` **isExpanded**: `boolean`

#### additionalData.theme?

> `optional` **theme**: `string`

#### additionalData.variableName

> **variableName**: `string`

### llmResult

> **llmResult**: `object`

#### llmResult.error?

> `optional` **error**: `string`

#### llmResult.instruction?

> `optional` **instruction**: `string`

#### llmResult.result?

> `optional` **result**: `object`

#### llmResult.result.datasetName

> **datasetName**: `string`

#### llmResult.result.details

> **details**: `string`

#### llmResult.result.id

> **id**: `string`

#### llmResult.result.variableName

> **variableName**: `string`

#### llmResult.success

> **success**: `boolean`
