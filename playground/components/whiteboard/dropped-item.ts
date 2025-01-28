import {
  ScatterplotOutputData,
  HistogramOutputData,
} from '@openassistant/echarts';
import { CreateMapOutputData } from '@openassistant/keplergl';
import { QueryDuckDBOutputData } from '@openassistant/duckdb';

type DroppedMessage = {
  id: string;
  type: 'text';
  data: string;
};

type DroppedTable = {
  id: string;
  type: 'query';
  data: QueryDuckDBOutputData;
};

type DroppedScatterPlot = {
  id: string;
  type: 'scatterplot';
  data: ScatterplotOutputData;
};

type DroppedHistogram = {
  id: string;
  type: 'histogram';
  data: HistogramOutputData;
};

type DroppedMap = {
  id: string;
  type: 'map';
  data: CreateMapOutputData;
};

export type DroppedItem =
  | DroppedMessage
  | DroppedTable
  | DroppedScatterPlot
  | DroppedMap
  | DroppedHistogram;

export function isDroppedMessage(item: DroppedItem): item is DroppedMessage {
  return item.type === 'text';
}
