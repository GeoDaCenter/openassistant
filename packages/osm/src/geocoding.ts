import { tool } from '@openassistant/core';
import { z } from 'zod';

export const geocoding = tool<
  // tool parameters
  z.ZodObject<{
    address: z.ZodString;
  }>,
  // llm result
  ExecuteGeocodingResult['llmResult'],
  // additional data
  ExecuteGeocodingResult['additionalData']
>({
  description:
    'Geocode an address to get the latitude and longitude of the address',
  parameters: z.object({
    address: z.string().describe('The address to geocode'),
  }),
  execute: async (args) => {
    try {
      const address = args.address;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      const data = await response.json();

      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [data[0].lon, data[0].lat],
            },
            properties: {
              name: data[0].display_name,
            },
          },
        ],
      };
      return {
        llmResult: {
          success: true,
          result: geojson,
        },
        additionalData: {
          address,
          geojson,
        },
      };
    } catch (error) {
      return {
        llmResult: {
          success: false,
          error: `Failed to geocode address: ${error}`,
        },
      };
    }
  },
});

export type GeocodingTool = typeof geocoding;

export type ExecuteGeocodingResult = {
  llmResult: {
    success: boolean;
    result?: GeoJSON.FeatureCollection;
    error?: string;
  };
  additionalData?: {
    address: string;
    geojson: GeoJSON.FeatureCollection;
  };
};
