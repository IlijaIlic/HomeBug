import { Feature, Polygon } from "geojson";

export const REGIONS: Record<string, Feature<Polygon>> = {

  southEurope: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-10, 35],
        [30, 35],
        [30, 45],
        [-10, 45],
        [-10, 35]
      ]]
    },
    properties: { name: "South Europe" }
  },

  eastAsia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [100, 20],
        [140, 20],
        [140, 50],
        [100, 50],
        [100, 20]
      ]]
    },
    properties: { name: "East Asia" }
  }

};