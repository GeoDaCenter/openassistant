import { openai } from '@ai-sdk/openai';
import { getDuckDBTool } from 'packages/tools/duckdb/dist';
import { getPlotsTool } from 'packages/tools/plots/dist';
import {
  getGeoDaTool,
  GeoDaToolNames,
  GetGeometries,
} from 'packages/tools/geoda/dist';
import { createDataStreamResponse, streamText } from 'ai';

export async function POST(req: Request) {
  const systemPrompt = `You are a helpful assistant that can answer questions and help with tasks. 
You can use the following datasets:
- datasetName: natregimes
- variables: [HR60, PO60]
`;

  let toolAdditionalData: Record<string, unknown> = {};

  // context for server-side tools
  const getValues = async (datasetName: string, variableName: string) => {
    console.log('getValues', datasetName, variableName);
    // simulate a server-side function that returns a list of values from a dataset
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  };

  const getGeometries: GetGeometries = async (datasetName: string) => {
    console.log('getGeometries', datasetName);
    // simulate a server-side function that returns a list of geometries from a dataset
    // return a list of point features coordinates in chandler, arizona
    const points = [
      [111.96625, 33.30202],
      [111.97234, 33.29876],
      [111.96018, 33.30543],
      [111.97562, 33.30115],
      [111.95891, 33.29987],
      [111.96945, 33.30421],
      [111.96378, 33.29765],
      [111.97123, 33.30389],
      [111.95734, 33.30198],
      [111.96812, 33.29934],
    ];
    return points.map((point) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: point,
      },
      properties: {},
    }));
  };

  const onToolCompleted = (toolCallId: string, additionalData?: unknown) => {
    // save the tool output for tool rendering in browser (if needed)
    if (additionalData !== undefined) {
      toolAdditionalData[toolCallId] = additionalData;
      console.log('toolAdditionalData', toolAdditionalData);
    }
  };

  // create a server-side tool for classifyData (runs in server)
  const dataClassifyTool = getGeoDaTool(GeoDaToolNames.dataClassify, {
    toolContext: { getValues },
    onToolCompleted,
    isExecutable: true,
  });

  // create a server-side tool for spatialWeights (runs in server)
  const spatialWeightsTool = getGeoDaTool(GeoDaToolNames.spatialWeights, {
    toolContext: { getGeometries },
    onToolCompleted,
    isExecutable: true,
  });

  // create a server-side tool for lisa (runs in server)
  const lisaTool = getGeoDaTool(GeoDaToolNames.lisa, {
    toolContext: { getValues },
    onToolCompleted,
    isExecutable: true,
  });

  // create a client-side tool for local query (runs in browser)
  const localQueryTool = getDuckDBTool('localQuery', {
    isExecutable: false,
  });

  // create a server-side tool for histogram
  const histogramTool = getPlotsTool('histogram', {
    toolContext: { getValues },
    onToolCompleted,
    isExecutable: true,
  });

  const { messages } = await req.json();

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: openai('gpt-4o'),
        messages: messages,
        system: systemPrompt,
        tools: {
          classifyData: dataClassifyTool,
          spatialWeights: spatialWeightsTool,
          lisa: lisaTool,
          localQuery: localQueryTool,
          histogram: histogramTool,
        },
        onFinish() {
          if (Object.keys(toolAdditionalData).length > 0) {
            // add tool output (additionalData) to message annotation which returns back to client
            // @ts-expect-error - toolAdditionalData is a record of unknown values
            dataStream.writeMessageAnnotation(toolAdditionalData);
            // clean up toolAdditionalData
            toolAdditionalData = {};
          }
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error);
    },
  });
}
