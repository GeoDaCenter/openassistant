# Variable: getUsZipcodeGeojson

> `const` **getUsZipcodeGeojson**: `ExtendedTool`\<[`GetUsZipcodeGeojsonFunctionArgs`](../type-aliases/GetUsZipcodeGeojsonFunctionArgs.md), [`GetUsZipcodeGeojsonLlmResult`](../type-aliases/GetUsZipcodeGeojsonLlmResult.md), [`GetUsZipcodeGeojsonAdditionalData`](../type-aliases/GetUsZipcodeGeojsonAdditionalData.md), `object`\>

Defined in: [packages/osm/src/us/zipcode.ts:71](https://github.com/GeoDaCenter/openassistant/blob/2c7e2a603db0fcbd6603996e5ea15006191c5f7f/packages/osm/src/us/zipcode.ts#L71)

Get US Zipcode GeoJSON Tool

This tool can be used to get the GeoJSON data of one or more United States zipcodes from the Github repository: https://github.com/greencoder/us-zipcode-to-geojson*

:::tip
This tool can be mixed with other tools for more complex tasks. For example, if you have a point datasets, you can use this tool
to answer questions like "What are the total revenus in the zipcode of 10001, 10002, 10003?"
:::

Example user prompts:
- "Get all zipcodes in California"
- "Show me the zipcode boundaries of New York state"
- "What are the zipcodes in Texas?"

:::note
Note: to avoid overloading the Github API, we only fetch the GeoJSON data every 1 second.
:::

## Example

```typescript
import { getOsmTool, OsmToolNames } from "@openassistant/osm";

const zipcodeTool = getOsmTool(OsmToolNames.getUsZipcodeGeojson);

streamText({
  model: openai('gpt-4o'),
  prompt: 'Get all zipcodes in California',
  tools: {
    zipcode: zipcodeTool,
  },
});
```

For a more complete example, see the [OSM Tools Example using Next.js + Vercel AI SDK](https://github.com/openassistant/openassistant/tree/main/examples/vercel_osm_example).
