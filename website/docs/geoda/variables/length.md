# Variable: length

> `const` **length**: `ExtendedTool`\<`ZodObject`\<\{ `datasetName`: `ZodOptional`\<`ZodString`\>; `distanceUnit`: `ZodDefault`\<`ZodEnum`\<\[`"KM"`, `"Mile"`\]\>\>; `geojson`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, `ZodTypeAny`, \{ `datasetName`: `string`; `distanceUnit`: `"KM"` \| `"Mile"`; `geojson`: `string`; \}, \{ `datasetName`: `string`; `distanceUnit`: `"KM"` \| `"Mile"`; `geojson`: `string`; \}\>, \{ `distanceUnit`: `"KM"` \| `"Mile"`; `lengths`: `number`[]; `result`: `string`; `success`: `boolean`; \}, `never`, \{ `getGeometries`: () => `void`; \}\>

Defined in: [packages/tools/geoda/src/spatial\_ops/length.ts:63](https://github.com/geodaopenjs/openassistant/blob/0a6a7e7306d75a25dc968b3117f04cb7bd613bec/packages/tools/geoda/src/spatial_ops/length.ts#L63)

## length Tool

This tool calculates the length of geometries in a GeoJSON dataset.

### Length Calculation

It supports both direct GeoJSON input and dataset names, and can calculate
lengths in either kilometers or miles.

Example user prompts:
- "Calculate the length of these roads in kilometers"
- "What is the total length of the river network in miles?"
- "Measure the length of these boundaries"

Example code:
```typescript
import { length, LengthTool } from '@openassistant/geoda';
import { convertToVercelAiTool } from '@openassistant/utils';
import { generateText } from 'ai';

const lengthTool: LengthTool = {
  ...length,
  context: {
    getGeometries: (datasetName) => {
      return SAMPLE_DATASETS[datasetName].map((item) => item.geometry);
    },
  },
});

generateText({
  model: openai('gpt-4o-mini', { apiKey: key }),
  prompt: 'Calculate the length of these roads in kilometers',
  tools: {length: convertToVercelAiTool(lengthTool)},
});
```
