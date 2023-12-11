import element_cards from "./cards.js";
// console.log(element_cards);
/* -----game start winodow----- */
function start_Window() {
  document.getElementById("start_window").style.opacity = 1;
}
start_Window();

const game_start = () => {
  document.getElementById("start_window").style.opacity = 0;
  setTimeout(() => {
    document
      .getElementById("start_window_container")
      .setAttribute("hidden", "true");
    document.getElementById("gameplay_area").removeAttribute("hidden");
  }, 4000);
  setTimeout(() => {
    document.getElementById("gameplay_area").style.opacity = 1;
  }, 5000);
};
let start_btn = document.getElementById("start_button");
start_btn.onclick = game_start;
/* -----End game start window ----- */
/* -----global constants----- */
const player = {
  power: 1,
  health: 10,
  defense: 0,
  conditions: [],
  actions: 3,
  deck: [],
  hand: [],
  discard: [],
};
const encounters = {
  type: ["minion", "elite", "boss", "event"],
  deck: [],
  active: [],
  victory: false,
  skip: true,
};
const enemy = {
  minion: {
    type: "minion",
    name: "minion",
    power: 1,
    health: 10,
    conditions: [],
    image: "./minion.png",
  },
  elite: {
    type: "elite",
    name: "elite",
    power: 2,
    health: 20,
    conditions: [],
    image: "./elite.png",
  },
  boss: {
    type: "boss",
    name: "boss",
    power: 3,
    health: 30,
    conditions: [],
    image: "./boss.png",
  },
};
const combat = {
  player_turns: 0,
  enemy_turns: 0,
};
/* -----End global constants----- */
/* -----create encounter deck ----- */
function create_encounter_deck() {
  let list = [0, 0, 3, 1, 0, 0, 3, 1, 0, 0, 3, 2];
  let new_encounter = [];
  for (let i = 0; i < list.length; i++) {
    let type_index = list[i];
    let new_encounter_type = encounters.type[type_index];
    if (new_encounter_type == "minion") {
      new_encounter.push(enemy[new_encounter_type]);
    } else if (new_encounter_type == "elite") {
      new_encounter.push(enemy[new_encounter_type]);
    } else if (new_encounter_type == "boss") {
      new_encounter.push(enemy[new_encounter_type]);
    } else {
      new_encounter.push({ type: "event", name: new_encounter_type });
    }
  }
  encounters.deck.push(new_encounter);
  document.getElementById(
    "encounter_deck_count"
  ).innerText = `Encounter Deck [${encounters.deck[0].length}]`;
  /* temp for testing */
  let btn = document.getElementById("encounter_button");
  btn.onclick = draw_encounter;
  /* end temp for testing */
}
create_encounter_deck();
/* -----End create encounter deck ----- */
/* -----player stats ----- */
function player_stats() {
  action_points(0);
  create_image("./attack.png", "stat_icon", "player_power", "player_stats");
  create_image("./health.png", "stat_icon", "player_health", "player_stats");
  document.getElementById("player_power_text").innerText = ": " + player.power;
  document.getElementById("player_health_text").innerText =
    ": " + player.health;
}
/* -----End player stats ----- */
/* -----draw encounter ----- */
function draw_encounter() {
  if (encounters.deck[0].length > 0) {
    /* temp for testing */
    if (encounters.skip == false) {
      encounters.skip = true;
    } else {
      encounters.skip = false;
    }
    /* End temp for testing */
    if (encounters.victory == true || encounters.skip == true) {
      clear_encounter();
    } else {
      encounters.active = encounters.deck[0].splice(0, 1);
      document.getElementById("encounter_box").innerHTML =
        encounters.active[0]["name"];
      document.getElementById(
        "encounter_deck_count"
      ).innerText = `Encounter Deck [${encounters.deck[0].length}]`;
      if (encounters.active[0]["type"] != "event") {
        combat_encounter();
      } else {
        /* TEMP EVENT CODE */
        console.log("!!--temp event code--!!");
        create_image(
          "./utility.png",
          "event_class",
          "event_name",
          "encounter_box"
        );
        /* END TEMP EVENT CODE */
      }
    }
  } else {
    console.log("!!NO MORE ENCOUNTERS!!");
  }
}
/* -----End draw encounter ----- */
/* -----comabat encounter----- */
function combat_encounter() {
  let name = encounters.active[0]["name"];
  let power = encounters.active[0]["power"];
  let health = encounters.active[0]["health"];
  let image = encounters.active[0]["image"];
  create_image(image, "enemy", name, "encounter_box");
  create_image("./attack.png", "stat_icon", "power_stat", "enemy_stats");
  create_image("./health.png", "stat_icon", "health_stat", "enemy_stats");
  document.getElementById("power_stat_text").innerText = ": " + power;
  document.getElementById("health_stat_text").innerText = ": " + health;
  player_stats();
}
/* -----End comabat encounter----- */
/* -----create image div ----- */
function create_image(image_src, class_name, id_name, parent_id) {
  let div = document.createElement("div");
  div.setAttribute("id", id_name);
  div.setAttribute("class", class_name);
  let elem = document.createElement("img");
  elem.setAttribute("src", image_src);
  let p = document.createElement("p");
  let p_id = id_name + "_text";
  p.setAttribute("id", p_id);
  div.appendChild(elem);
  div.appendChild(p);
  document.getElementById(parent_id).appendChild(div);
}
/* -----End create image div ----- */
/* -----clear encounter ------ */
function clear_encounter() {
  let clear_power = document.getElementById("power_stat");
  let clear_health = document.getElementById("health_stat");
  let clear_enemy = document.getElementsByClassName("enemy");
  let clear_player_health = document.getElementById("player_health");
  let clear_player_power = document.getElementById("player_power");
  let clear_player_defense = document.getElementById("player_defense");
  let clear_event = document.getElementById("event_name");
  // console.log(encounters.active);
  if (encounters.active.length != 0) {
    if (encounters.active[0]["type"] != "event") {
      for (let x = 0; x < clear_enemy.length; x++) {
        clear_enemy[x].remove();
      }
      clear_player_health.remove();
      clear_player_power.remove();
      clear_power.remove();
      clear_health.remove();
      if (player.defense > 0) {
        clear_player_defense.remove();
      }
      console.log("clear_encounter: IF: enemy defeated");
      encounters.active = [];
    } else {
      clear_event.remove();
      console.log("clear_encounter: IF: ELSE: Event completed");
      encounters.active = [];
    }
  }
  encounters.victory = false;
}
/* -----End clear encounter ------ */
/* -----create starting deck -----*/
function create_starting_deck() {
  let starting_deck = [];
  let list_of_elements = ["fire", "ice", "lightning", "wind", "earth", "water"];
  // let utility_types = ["draw", "discard", "heal"];
  for (let index = 0; index < list_of_elements.length; index++) {
    // let random_utility = Math.floor(Math.random() * utility_types.length - 1);
    let element_name = list_of_elements[index];
    let card = element_cards[element_name];
    // let card = {};
    // card["id"] = index + 1;
    // card["name"] = list_of_elements[index];
    // card["type"] = list_of_elements[index];
    // card["rarity"] = "common";
    // card["power"] = 1;
    // card["defense"] = 1;
    // card["utility"] = utility_types[random_utility];
    for (var key in card) {
      if (card[key] == undefined) {
        let trash = [];
        index -= 1;
        trash.push(card);
        card = false;
      }
    }
    if (card) {
      starting_deck.push(card);
      starting_deck.push(card);
      starting_deck.push(card);
    }
  }
  shuffleArray(starting_deck);
  player.deck = starting_deck;
}
create_starting_deck();
console.log(player.deck);
/* -----End create starting deck -----*/
/* -----shuffle function ----- */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
/* ------End shuffle function ----- */
/*-----  update draw pile -----*/
function update_draw_pile_count() {
  let draw_pile_count = player.deck.length;
  document.getElementById(
    "player_deck_count"
  ).innerText = `Player Deck [${draw_pile_count}]`;
}
update_draw_pile_count();
/* -----End update draw pile -----*/
/* ----- draw check -----*/
function draw_check(num) {
  if (player.deck.length < num) {
    let cards_remaining = player.deck.splice(0, player.deck.length);
    let return_discard = player.discard.splice(0, player.discard.length);
    return_discard.forEach((card) => {
      player.deck.push(card);
      shuffleArray(player.deck);
    });
    update_discard_pile_count();
    let remaining_draw = num - cards_remaining.length;
    let draw_cards = player.deck.splice(0, remaining_draw);
    cards_remaining.forEach((card) => {
      draw_cards.push(card);
    });
    draw(num, draw_cards);
  } else {
    let draw_cards = player.deck.splice(0, num);
    draw(num, draw_cards);
  }
}
/* -----End draw check ----- */
/* ------Draw cards------ */
function draw(num, splice) {
  for (let index = 0; index < num; index++) {
    let card = splice[index];
    // console.log(card);
    let id = `in_hand_${index}`;
    document.getElementById(id).innerHTML = `${card.name}`;
    let action_type = check_active_type();
    let action_image = `${action_type}.png`;
    create_image(action_image, "card_image", card.name + "_card_image", id);
  }
  splice.forEach((card) => {
    player.hand.push(card);
  });
  update_draw_pile_count();
}
/* ------End Draw cards------ */
/* ------ check active card type ------ */
function check_active_type() {
  let active = document.getElementsByClassName("action_button active");
  let active_type = "";
  if (!!active[0]) {
    var active_id = active[0].id;
  }
  if (active_id == "attack_button") {
    active_type = "attack";
    return active_type;
  } else if (active_id == "defense_button") {
    active_type = "defense";
    return active_type;
  } else if (active_id == "utility_button") {
    active_type = "utility";
    return active_type;
  } else {
    console.log(
      "check_active_type: !No active button will default to attack type!"
    );
    active_type = "attack";
    return active_type;
  }
}
/* ------ End check active card type ------ */
/* -----discard ----- */
function discard(discarded) {
  let cards = discarded.length;
  console.log(cards);
  let multi_discard = [];
  if (cards > 1) {
    for (let i = 0; i < cards; i++) {
      if (discarded[i] != "card_played" && discarded[i] != "undefined") {
        multi_discard = player.hand;
      }
    }
    player.discard.push(...multi_discard);
    multi_discard = [];
    update_discard_pile_count();
  } else {
    player.discard.push(discarded[0]);
    update_discard_pile_count();
  }
}
function update_discard_pile_count() {
  let player_discard = player.discard;
  document.getElementById(
    "player_discard"
  ).innerText = `Discard [ ${player_discard.length} ]`;
}
/* -----End discard ----- */
/* -----action points ----- */

function action_points(num) {
  player.actions += num;
  if (player.actions < 0) {
    player.actions = 0;
  }
  document.getElementById("actions").innerText = player.actions;
}
/*----- End action points ----- */
/* -----play card -----*/
function play_card(name, id) {
  let hand_id_index = id.replace("in_hand_", "");
  let player_hand = player.hand;
  if (player_hand.length > 0 && player.actions <= 0) {
    console.log("play_card: out of actions!");
    return;
  }
  let card_played = player.hand.splice(hand_id_index, 1, "card_played");
  let card_power = card_played[0].power;
  if (encounters.active[0] && encounters.active[0].type != "event") {
    let card_type = check_active_type();
    if (
      card_type == "attack" &&
      document.getElementById(id).innerText != "!! CARD PLAYED !!"
    ) {
      let target_health = damage(
        "health_stat_text",
        encounters.active[0].health,
        card_power,
        card_played[0].name,
        encounters.active[0]
      );
      encounters.active[0].health = target_health;
    } else if (card_type == "defense") {
      defense(card_played[0].defense.stack);
    } else if (card_type == "utility") {
      /*!!!!!!!!! add code for utility !!!!!!!!!!!*/
      console.log("!!!!!!NEED TO ADD UTILITY CODE!!!!");
      return;
    }
    document.getElementById(id).innerText = "!! CARD PLAYED !!";
    discard(card_played);
  }
  if (encounters.active[0] && encounters.active[0].health <= 0) {
    console.log("play_card: !enemy defeated! time for rewards!");
    rewards(encounters.active[0].type);
    encounters.victory = true;
    clear_encounter();
  }
  if (player.actions <= 0) {
    console.log("play_card: out of actions!");
    end_turn_button();
  } else {
    console.log("play_card: IF2: ELSE: ?");
    return;
  }
}
/* ------END play card------- */
/* ----test conditions application------ */
function condition_check(element, target) {
  let all_conditions = target.conditions;
  let additional_damage = 0;
  if (all_conditions.length > 0) {
    for (let i = 0; i < all_conditions.length; i++) {
      if (element == target.conditions[i].type) {
        additional_damage += target.conditions[i].stack;
        target.conditions[i].stack += 1;
      }
    }
  } else {
    create_image("./burn.png", "stat_icon", "enemy_burn", "enemy_conditions");
    let burn = {
      type: "Fire",
      name: "burn",
      stack: 1,
    };
    target.conditions.push(burn);
    document.getElementById("enemy_burn_text").innerText =
      ": " + target.conditions[0].stack;
  }
  return additional_damage;
}
/* ----End test conditions application------ */
/* ------damage to enemy ------ */
function damage(target_id, target_health, amount, element, target) {
  let damage = amount;
  damage += condition_check(element, target); //test condition application
  let remaining_health = target_health - damage;
  target_health = remaining_health;
  document.getElementById(target_id).innerText = ": " + target_health;
  action_points(-1);
  return target_health;
}
/* ------End damage to enemy ------ */
/* -----player defense ----- */
function defense(amount) {
  player.defense += amount;
  let clear_player_defense = document.getElementById("player_defense");
  if (player.defense < 0) {
    player.defense = 0;
    clear_player_defense.remove();
  } else if (player.defense > 1) {
    document.getElementById("player_defense_text").innerText =
      ": " + player.defense;
    action_points(-1);
  } else {
    create_image(
      "./defense.png",
      "stat_icon",
      "player_defense",
      "player_stats"
    );
    document.getElementById("player_defense_text").innerText =
      ": " + player.defense;
    action_points(-1);
  }
  if (player.defense <= 0) {
    player.defense = 0;
    clear_player_defense.remove();
  }
}
/* -----End player defense ----- */
/* -----Turn End----- */
function end_turn() {
  let in_hand_cards = document.getElementsByClassName("in_hand_card");
  let player_hand = player.hand;
  for (let i = 0; i < in_hand_cards.length; i++) {
    let card = in_hand_cards.item(i);
    for (let j = 0; j < player_hand.length; j++) {
      if (player_hand[j].name == card.innerText) {
        document.getElementById(card.id).innerHTML = "discarded";
      }
    }
  }
  discard(player.hand);
  combat.player_turns++;
  turns();
}
/* -----End Turn End----- */
/* ------ Button for Turn end------- */
function end_turn_button() {
  let div = document.createElement("div");
  div.setAttribute("id", "end_turn_div");
  let btn = document.createElement("button");
  btn.setAttribute("id", "end_turn");
  btn.setAttribute("class", "button");
  btn.setAttribute("type", "button");
  btn.onclick = end_turn;
  btn.innerText = "End Turn";
  div.appendChild(btn);
  document.getElementById("player_discard").appendChild(div);
  return;
}
/* ------END Button for Turn end------- */
/* -----Turn start alert ----- */
function turns() {
  if (combat.player_turns > combat.enemy_turns) {
    fade("popup");
    console.log("turns: start enemy turn");
    enemy_turn();
  } else {
    fade("popup");
    action_points(3);
    console.log("turns: start player turn");
  }
}
/* -----End Turn start alert ----- */
/* ------enemy turn ------ */
function enemy_turn() {
  let damage_to_player = encounters.active[0]["power"];
  let power_points = encounters.active[0]["power"];
  if (player.health > 0 && player.defense <= 0) {
    for (let point = 0; point < power_points; point++) {
      player.health -= damage_to_player;
    }
    document.getElementById("player_health_text").innerText =
      ": " + player.health;
  } else if (player.defense > 0) {
    player.defense -= damage_to_player;
    document.getElementById("player_defense_text").innerText =
      ": " + player.defense;
    if (player.defense <= 0) {
      player.health += player.defense;
      document.getElementById("player_health_text").innerText =
        ": " + player.health;
      document.getElementById("player_defense").remove();
      player.defense = 0;
    }
  }
  if (player.health <= 0) {
    console.log("enemy_turn: !--Player is dead--! do the dead code here");
  }
  combat.enemy_turns++;
  turns();
}
/* ------End enemy turn ------ */
/* ------Rewards ------ */
function rewards(encounter_type) {
  if (encounter_type == "minion") {
    console.log("rewards: do minion reward stuff here");
  } else if (encounter_type == "elite") {
    console.log("rewards: do Elite reward stuff here");
  } else if (encounter_type == "boss") {
    console.log("rewards: do BOSS reward stuff here");
  } else {
    console.log("rewards: do Event stuff here");
  }
}
/* ------End Rewards ------ */
/* -----add card to player deck ------ */
function add_card_reward(select_quantity, from_amount) {
  let cards = [];
  // create reward window
  let div = document.createElement("div");
  div.setAttribute("id", "add_card_modal");
  div.setAttribute("class", "modal");
  //create h1 title
  let h1 = document.createElement("h1");
  h1.setAttribute("id", "add_card_title");
  h1.innerHTML = "Choose one card!";
  //add container for cards
  var div2 = document.createElement("div");
  div2.setAttribute("id", "add_card_container");
  // create cards
  //create close modal button
  let btn = document.createElement("button");
  btn.innerHTML = "Close Reward Window";
  btn.setAttribute("id", "close_modal");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "test_button");
  //arrange elements
  div.insertBefore(h1, div2.nextSibling);
  div.insertBefore(div2, btn.nextSibling);
  div.appendChild(btn);
  // create cards to choose
  for (let i = 0; i < from_amount; i++) {
    let list_of_elements = [
      "Fire",
      "Ice",
      "Lightning",
      "Wind",
      "Earth",
      "Water",
    ];
    let utility_types = ["draw", "discard", "heal"];
    let random_utility = Math.floor(Math.random() * utility_types.length - 1);
    let random_card = Math.floor(Math.random() * list_of_elements.length - 1);
    let new_card = {};
    new_card["id"] = i + 1;
    new_card["name"] = list_of_elements[random_card];
    new_card["rarity"] = "common";
    new_card["power"] = 1;
    new_card["damage"] = 1;
    new_card["defense"] = 1;
    new_card["utility"] = [utility_types[random_utility]];
    // logic to get rid of undefined returns - probably due to a delay in generating new card
    if (!new_card["name"]) {
      i -= 1;
    } else {
      cards.push(new_card);
      let card = document.createElement("div");
      card.setAttribute("class", "in_hand_card");
      card.setAttribute("id", new_card["name"]);
      card.innerHTML = new_card["name"];
      div2.appendChild(card);
    }
  }
  //add to page
  document.getElementById("backdrop").appendChild(div);
  document.getElementById("add_card_modal").style.opacity = 1;
  document.getElementById("close_modal").onclick = close;
  return;
}
/* -----End card to player deck ------ */
function close() {
  let modal = document.getElementById("add_card_modal");
  modal.remove();
}
// create element div css is set to opacity 0 and transition time set
// function to change opacity to 1
// timeout to close must include transition time
/* -----create popup window ------ */
function modal(element_id, message) {
  let div = document.createElement("div");
  let h1 = document.createElement("h1");
  h1.innerHTML = message;
  div.setAttribute("id", element_id);
  div.setAttribute("class", "modal");
  div.appendChild(h1);
  document.getElementById("backdrop").appendChild(div);
  return;
}
/* -----End create popup window ----- */
/* ------fade in/out popup window ----- */
function fade(element_id) {
  if (!document.getElementById(element_id)) {
    modal(element_id, " modal text");
  } else {
    console.log("fade: already created!");
  }
  let opacity = document.getElementById(element_id).style.opacity;
  if (opacity == 0) {
    setTimeout(() => {
      document.getElementById(element_id).style.opacity = 1;
    }, 1);
  } else {
    document.getElementById(element_id).style.opacity = 0;
    let window = document.getElementById(element_id);
    if (window) {
      setTimeout(() => {
        document.getElementById(element_id).remove();
      }, 1000);
    }
  }
}
/* -----End fade in/out popup window ----- */
/* ------mouse click and tag console log------- */
document.onmousedown = function (e) {
  let target_class = e.target.className;
  let target_name = e.target.innerHTML;
  let target_id = e.target.id;
  if (
    target_class == "in_hand_card" ||
    target_class == "in_hand_card highlight"
  ) {
    highlight(target_name, target_id);
    // play_card(target_name, target_id);
  } else if (
    target_class == "action_button" ||
    target_class == "action_button active"
  ) {
    set_active(target_id);
  } else if (target_id == "popup") {
    fade("popup");
  } else if (target_id == "draw_button") {
    draw_check(5);
  } else {
    console.log("document.onmousedown: mouseclick");
  }
};
/*-----End mouse click and tag console log -----*/
/* ------highlight card ------ */
function highlight(name, id) {
  let selected = document.getElementById(id).classList;
  if (selected.contains("highlight")) {
    document.getElementById(id).classList.remove("highlight");
    toggle_play_card_button();
  } else {
    document.getElementById(id).classList.add("highlight");
    toggle_play_card_button();
  }
}
/* ------End highlight card ------ */
/* ------ play highlighted card button------- */
function toggle_play_card_button() {
  let check_highlight = document.getElementsByClassName("highlight");
  let check_button = document.getElementById("play_card_button");
  if (check_highlight.length == 1 && !check_button) {
    let btn = document.createElement("button");
    btn.setAttribute("id", "play_card_button");
    btn.setAttribute("type", "button");
    btn.onclick = play_cards_button;
    btn.innerText = "Play Card";
    document.getElementById("player_hand").appendChild(btn);
  } else if (check_highlight.length > 1) {
  } else if (check_button && check_highlight.length < 1) {
    document.getElementById("play_card_button").remove();
  }
}
/* ------END play highlighted card button------- */
/* -----play_cards_button----- */
function play_cards_button() {
  let highlighted_cards = document.getElementsByClassName("highlight");
  for (let card = 0; card < highlighted_cards.length; card++) {
    let card_id = highlighted_cards[card]["id"];
    let card_name = highlighted_cards[card]["innerText"];
    if (!!card_name || !!card_id) {
      card -= 1;
    }
    play_card(card_name, card_id);
    document.getElementById(card_id).classList.remove("highlight");
  }
  document.getElementById("play_card_button").remove();
}
/* -----End play_cards_button----- */
/* -----set active class to button ----- */
function set_active(target) {
  let other_buttons = document.getElementsByClassName("action_button active");
  for (let i = 0; i < other_buttons.length; i++) {
    other_buttons[i].classList.remove("active");
  }
  let set_active = document.getElementById(target);
  set_active.classList.toggle("active");
  hand_action_type();
}
/* -----End set active class to button ----- */
/* -----change action type of cards in hand ------ */
function hand_action_type() {
  let image = document.getElementsByClassName("card_image");
  for (let i = 0; i < image.length; i++) {
    if (!!image) {
      let active = check_active_type();
      let new_source = active + ".png";
      image[i].children[0].src = new_source;
    }
  }
  return;
}
/* -----END change action type of cards in hand ------ */
/* ------ TEST ------ */
var test_button = document.createElement("button");
test_button.setAttribute("type", "button");
test_button.setAttribute("class", "test_button");
test_button.setAttribute("id", "test_button");
test_button.innerText = "Test Button";
test_button.onclick = test;
document.getElementById("player_actions").appendChild(test_button);

function test() {
  console.log("test: place code to test within");
  // end_turn();
  // add_card_reward(0, 3);
  // console.log(player.deck);
  console.log(player.hand);
  console.log(player.discard);
  return;
}
/* ------ End TEST ------ */
/* add event listener mouse enter to all elements with same class name */
// const select_card = document.getElementsByClassName("in_hand_card");
// for (let i = 0; i < select_card.length; i++) {
//   select_card[i].addEventListener(
//     "mouseenter",
//     (event) => {
//       // highlight the mouseenter target
//       event.target.style.color = "purple";
//       console.log("!mouse enter!");
//       // reset the color after a short delay
//       setTimeout(() => {
//         event.target.style.color = "";
//       }, 500);
//     },
//     false
//   );
// }
