import { Feature, Polygon } from "geojson";

export const REGIONS: Record<string, Feature<Polygon>> = {

  // ─── EUROPE ───────────────────────────────────────────────────────────────

  westernEurope: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-10, 42], [10, 42], [10, 55], [-10, 55], [-10, 42]
      ]]
    },
    properties: { name: "Western Europe" }
  },

  northernEurope: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [5, 55], [32, 55], [32, 72], [5, 72], [5, 55]
      ]]
    },
    properties: { name: "Northern Europe" }
  },

  southernEurope: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-10, 35], [30, 35], [30, 45], [-10, 45], [-10, 35]
      ]]
    },
    properties: { name: "Southern Europe" }
  },

  easternEurope: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [20, 45], [42, 45], [42, 60], [20, 60], [20, 45]
      ]]
    },
    properties: { name: "Eastern Europe" }
  },

  centralEurope: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [10, 45], [25, 45], [25, 55], [10, 55], [10, 45]
      ]]
    },
    properties: { name: "Central Europe" }
  },

  balkans: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [13, 38], [29, 38], [29, 47], [13, 47], [13, 38]
      ]]
    },
    properties: { name: "Balkans" }
  },

  britishIsles: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-11, 49], [2, 49], [2, 61], [-11, 61], [-11, 49]
      ]]
    },
    properties: { name: "British Isles" }
  },

  iberianPeninsula: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-10, 35], [5, 35], [5, 44], [-10, 44], [-10, 35]
      ]]
    },
    properties: { name: "Iberian Peninsula" }
  },

  scandinavia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [4, 55], [32, 55], [32, 72], [4, 72], [4, 55]
      ]]
    },
    properties: { name: "Scandinavia" }
  },

  // ─── AFRICA ───────────────────────────────────────────────────────────────

  northAfrica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-18, 18], [42, 18], [42, 38], [-18, 38], [-18, 18]
      ]]
    },
    properties: { name: "North Africa" }
  },

  westAfrica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-18, 0], [20, 0], [20, 18], [-18, 18], [-18, 0]
      ]]
    },
    properties: { name: "West Africa" }
  },

  eastAfrica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [28, -12], [52, -12], [52, 18], [28, 18], [28, -12]
      ]]
    },
    properties: { name: "East Africa" }
  },

  centralAfrica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [8, -12], [32, -12], [32, 8], [8, 8], [8, -12]
      ]]
    },
    properties: { name: "Central Africa" }
  },

  southernAfrica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [10, -36], [42, -36], [42, -10], [10, -10], [10, -36]
      ]]
    },
    properties: { name: "Southern Africa" }
  },

  hornOfAfrica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [38, 2], [52, 2], [52, 18], [38, 18], [38, 2]
      ]]
    },
    properties: { name: "Horn of Africa" }
  },

  // ─── ASIA ─────────────────────────────────────────────────────────────────

  northAsia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [60, 50], [180, 50], [180, 78], [60, 78], [60, 50]
      ]]
    },
    properties: { name: "North Asia (Siberia)" }
  },

  centralAsia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [48, 35], [90, 35], [90, 55], [48, 55], [48, 35]
      ]]
    },
    properties: { name: "Central Asia" }
  },

  eastAsia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [100, 20], [145, 20], [145, 55], [100, 55], [100, 20]
      ]]
    },
    properties: { name: "East Asia" }
  },

  southAsia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [60, 5], [100, 5], [100, 38], [60, 38], [60, 5]
      ]]
    },
    properties: { name: "South Asia" }
  },

  southeastAsia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [92, -10], [142, -10], [142, 25], [92, 25], [92, -10]
      ]]
    },
    properties: { name: "Southeast Asia" }
  },

  middleEast: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [28, 12], [62, 12], [62, 42], [28, 42], [28, 12]
      ]]
    },
    properties: { name: "Middle East" }
  },

  arabianPeninsula: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [32, 12], [60, 12], [60, 32], [32, 32], [32, 12]
      ]]
    },
    properties: { name: "Arabian Peninsula" }
  },

  caucasus: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [38, 38], [52, 38], [52, 45], [38, 45], [38, 38]
      ]]
    },
    properties: { name: "Caucasus" }
  },

  levant: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [28, 28], [42, 28], [42, 38], [28, 38], [28, 28]
      ]]
    },
    properties: { name: "Levant" }
  },

  // ─── NORTH AMERICA ────────────────────────────────────────────────────────

  canada: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-140, 48], [-52, 48], [-52, 72], [-140, 72], [-140, 48]
      ]]
    },
    properties: { name: "Canada" }
  },

  usa: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-125, 25], [-66, 25], [-66, 49], [-125, 49], [-125, 25]
      ]]
    },
    properties: { name: "United States" }
  },

  alaska: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-170, 54], [-130, 54], [-130, 72], [-170, 72], [-170, 54]
      ]]
    },
    properties: { name: "Alaska" }
  },

  mexico: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-118, 14], [-86, 14], [-86, 32], [-118, 32], [-118, 14]
      ]]
    },
    properties: { name: "Mexico" }
  },

  centralAmerica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-92, 7], [-77, 7], [-77, 18], [-92, 18], [-92, 7]
      ]]
    },
    properties: { name: "Central America" }
  },

  caribbean: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-85, 10], [-60, 10], [-60, 26], [-85, 26], [-85, 10]
      ]]
    },
    properties: { name: "Caribbean" }
  },

  // ─── SOUTH AMERICA ────────────────────────────────────────────────────────

  northernSouthAmerica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-82, 0], [-50, 0], [-50, 14], [-82, 14], [-82, 0]
      ]]
    },
    properties: { name: "Northern South America" }
  },

  brazil: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-74, -34], [-34, -34], [-34, 6], [-74, 6], [-74, -34]
      ]]
    },
    properties: { name: "Brazil" }
  },

  andeanRegion: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-82, -22], [-60, -22], [-60, 2], [-82, 2], [-82, -22]
      ]]
    },
    properties: { name: "Andean Region" }
  },

  southernCone: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-76, -56], [-48, -56], [-48, -22], [-76, -22], [-76, -56]
      ]]
    },
    properties: { name: "Southern Cone" }
  },

  amazonBasin: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-78, -18], [-44, -18], [-44, 6], [-78, 6], [-78, -18]
      ]]
    },
    properties: { name: "Amazon Basin" }
  },

  // ─── OCEANIA ──────────────────────────────────────────────────────────────

  australia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [112, -44], [154, -44], [154, -10], [112, -10], [112, -44]
      ]]
    },
    properties: { name: "Australia" }
  },

  newZealand: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [166, -48], [178, -48], [178, -34], [166, -34], [166, -48]
      ]]
    },
    properties: { name: "New Zealand" }
  },

  melanesia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [140, -24], [180, -24], [180, -2], [140, -2], [140, -24]
      ]]
    },
    properties: { name: "Melanesia" }
  },

  micronesia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [130, 0], [175, 0], [175, 20], [130, 20], [130, 0]
      ]]
    },
    properties: { name: "Micronesia" }
  },

  polynesia: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-180, -30], [-120, -30], [-120, 10], [-180, 10], [-180, -30]
      ]]
    },
    properties: { name: "Polynesia" }
  },

  // ─── POLAR ────────────────────────────────────────────────────────────────

  arctic: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-180, 66], [180, 66], [180, 90], [-180, 90], [-180, 66]
      ]]
    },
    properties: { name: "Arctic" }
  },

  antarctica: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-180, -90], [180, -90], [180, -60], [-180, -60], [-180, -90]
      ]]
    },
    properties: { name: "Antarctica" }
  }

};