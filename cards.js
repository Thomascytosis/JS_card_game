const element_cards = {
  /* ----------------------FIRE--------------------- */
  fire: {
    name: "fire",
    attack: {
      image: "temp.png",
      condition: {
        type: "fire",
        name: "burn",
        stack: 1,
        image: "./burn.png",
        effect: "increase type damage per stack",
        sot: "type damage per stack: remove 1 stack", // SoT: Start of Turn.
      },
    },
    defense: {
      type: "fire",
      name: "fireshield",
      stack: 1,
      image: "./temp.png",
      effect: "on hit deal type damage per stack: reduce stack by 1",
    },
    image: "./temp.png",
    power: 1,
    rarity: "common",
    utility: {
      type: "draw", //Temp placeholder
    },
  },
  /* ----------------------Lightning--------------------- */
  lightning: {
    name: "lightning",
    attack: {
      image: "temp.png",
      condition: {
        type: "lightning",
        name: "shock",
        stack: 1,
        image: "./shock.png",
        effect: "increase type damage per stack",
        sot: "type damage per stack: remove 1 stack", // SoT: Start of Turn.
      },
    },
    defense: {
      type: "lightning",
      name: "lightningshield",
      stack: 1,
      image: "./temp.png",
      effect: "on hit deal type damage per stack: reduce stack by 1",
    },
    image: "./temp.png",
    power: 1,
    rarity: "common",
    utility: {
      type: "draw", //Temp placeholder
    },
  },
  /* ----------------------Ice--------------------- */
  ice: {
    name: "ice",
    attack: {
      image: "temp.png",
      condition: {
        type: "ice",
        name: "frost",
        stack: 1,
        image: "./frost.png",
        effect: "increase type damage per stack",
        sot: "type damage per stack: remove 1 stack", // SoT: Start of Turn.
      },
    },
    defense: {
      type: "ice",
      name: "icearmor",
      stack: 1,
      image: "./temp.png",
      effect: "on hit deal type damage per stack: reduce stack by 1",
    },
    image: "./temp.png",
    power: 1,
    rarity: "common",
    utility: {
      type: "draw", //Temp placeholder
    },
  },
  /* ----------------------Earth--------------------- */
  earth: {
    name: "earth",
    attack: {
      image: "temp.png",
      condition: {
        type: "earth",
        name: "tremor",
        stack: 1,
        image: "./temp.png",
        effect: "increase type damage per stack",
        sot: "type damage per stack: remove 1 stack", // SoT: Start of Turn.
      },
    },
    defense: {
      type: "earth",
      name: "rockwall",
      stack: 1,
      image: "./temp.png",
      effect: "on hit deal type damage per stack: reduce stack by 1",
    },
    image: "./temp.png",
    power: 1,
    rarity: "common",
    utility: {
      type: "draw", //Temp placeholder
    },
  },
  /* ----------------------Wind--------------------- */
  wind: {
    name: "wind",
    attack: {
      image: "temp.png",
      condition: {
        type: "wind",
        name: "whirl",
        stack: 1,
        image: "./temp.png",
        effect: "increase type damage per stack",
        sot: "type damage per stack: remove 1 stack", // SoT: Start of Turn.
      },
    },
    defense: {
      type: "wind",
      name: "windwall",
      stack: 1,
      image: "./temp.png",
      effect: "on hit deal type damage per stack: reduce stack by 1",
    },
    image: "./temp.png",
    power: 1,
    rarity: "common",
    utility: {
      type: "draw", //Temp placeholder
    },
  },
  /* ----------------------Water--------------------- */
  water: {
    name: "water",
    attack: {
      image: "temp.png",
      condition: {
        type: "water",
        name: "wet",
        stack: 1,
        image: "./temp.png",
        effect: "increase type damage per stack",
        sot: "type damage per stack: remove 1 stack", // SoT: Start of Turn.
      },
    },
    defense: {
      type: "water",
      name: "waterwall",
      stack: 1,
      image: "./temp.png",
      effect: "on hit deal type damage per stack: reduce stack by 1",
    },
    image: "./temp.png",
    power: 1,
    rarity: "common",
    utility: {
      type: "draw", //Temp placeholder
    },
  },
};
export default element_cards;
