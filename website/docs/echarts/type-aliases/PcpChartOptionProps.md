# Type Alias: PcpChartOptionProps

> **PcpChartOptionProps**: `object`

Defined in: [packages/echarts/src/pcp/component/pcp-option.ts:27](https://github.com/GeoDaCenter/openassistant/blob/ae6e39c15b60e7a98a21d90a5bbeff5dc44c1295/packages/echarts/src/pcp/component/pcp-option.ts#L27)

Configuration properties for the Parallel Coordinates Plot (PCP) chart.

## Type declaration

### isExpanded

> **isExpanded**: `boolean`

### pcp

> **pcp**: [`ParallelCoordinateDataProps`](ParallelCoordinateDataProps.md)

### rawData

> **rawData**: `Record`\<`string`, `number`[]\>

### theme

> **theme**: `string`

## Param

Parallel coordinate data properties containing configuration for the visualization

## Param

Raw data object with variable names as keys and their corresponding numeric values as arrays

## Param

Theme name to be applied to the chart

## Param

Boolean flag indicating if the chart is in expanded state

## Example

```ts
const pcpProps: PcpChartOptionProps = {
  pcp: { ... },
  rawData: {
    'population': [100, 200, 300],
    'income': [50000, 60000, 70000]
  },
  theme: 'light',
  isExpanded: false
};
```
