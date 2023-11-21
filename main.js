// import game_start from "./modules/test.js";
/* -----game start winodow----- */
function start_Window() {
  document.getElementById("start_window").style.opacity = 1;
}
start_Window();

const game_start = () => {
  console.log("game_start: start button has been clicked");
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
/* -----End game start window ----- */
var starting_deck = [];
var player_deck = [];
var encounter_deck = [];
/* -----create encounter deck ----- */
function create_encounter_deck() {
  let list_of_encounters = [
    "enemy",
    "enemy",
    "event",
    "enemy",
    "elite",
    "event",
    "boss",
  ];
  for (let index = 0; index < list_of_encounters.length; index++) {
    let encounter = {};
    encounter["id"] = index + 1;
    encounter["name"] = list_of_encounters[index];
    encounter["type"] = list_of_encounters[index];
    if (encounter["type"] == "enemy") {
      encounter["power"] = 1;
      encounter["health"] = 10;
      encounter["image"] = "./enemy.png";
    } else if (encounter["type"] == "elite") {
      encounter["power"] = 2;
      encounter["health"] = 20;
      encounter["image"] = "./elite.png";
    } else if (encounter["type"] == "boss") {
      encounter["power"] = 3;
      encounter["health"] = 30;
      encounter["image"] = "./boss.png";
    }
    encounter_deck.push(encounter);
  }
  document.getElementById(
    "encounter_deck_count"
  ).innerText = `Encounter Deck [${encounter_deck.length}]`;
}
create_encounter_deck();
/* -----End create encounter deck ----- */
var current_encounter = [];
var player_power = 1;
var player_health = 10;
/* -----player stats ----- */
function player_stats() {
  action_points(3);
  create_image("./attack.png", "stat_icon", "player_power", "player_stats");
  create_image("./health.png", "stat_icon", "player_health", "player_stats");
  document.getElementById("player_power_text").innerText = ": " + player_power;
  document.getElementById("player_health_text").innerText =
    ": " + player_health;
}
/* -----End player stats ----- */
/* -----draw encounter ----- */
function draw_encounter() {
  if (!current_encounter[0] == []) {
    clear_encounter(current_encounter[0]);
  }
  current_encounter = encounter_deck.splice(0, 1);
  if (current_encounter.length == 0) {
    console.log("draw_encounter: IF2: no more events!");
    return;
  }
  let name = current_encounter[0]["name"];
  let power = current_encounter[0]["power"];
  let health = current_encounter[0]["health"];
  document.getElementById("encounter_box").innerHTML = name;
  document.getElementById(
    "encounter_deck_count"
  ).innerText = `Encounter Deck [${encounter_deck.length}]`;
  if (current_encounter[0]["type"] == "enemy") {
    create_image("./enemy.png", "enemy", name, "encounter_box");
    create_image("./attack.png", "stat_icon", "power_stat", "enemy_stats");
    create_image("./health.png", "stat_icon", "health_stat", "enemy_stats");
    document.getElementById("power_stat_text").innerText = ": " + power;
    document.getElementById("health_stat_text").innerText = ": " + health;
    console.log("draw_encounter: IF3: An enemy enters the battle");
    player_stats();
  } else if (current_encounter[0]["type"] == "elite") {
    create_image("./elite.png", "elite", name, "encounter_box");
    create_image("./attack.png", "stat_icon", "power_stat", "enemy_stats");
    create_image("./health.png", "stat_icon", "health_stat", "enemy_stats");
    document.getElementById("power_stat_text").innerText = ": " + power;
    document.getElementById("health_stat_text").innerText = ": " + health;
    console.log("draw_encounter: IF3: ELSEIF: An elite enters the battle");
    player_stats();
  } else if (current_encounter[0]["type"] == "boss") {
    create_image("./boss.png", "boss", name, "encounter_box");
    create_image("./attack.png", "stat_icon", "power_stat", "enemy_stats");
    create_image("./health.png", "stat_icon", "health_stat", "enemy_stats");
    document.getElementById("power_stat_text").innerText = ": " + power;
    document.getElementById("health_stat_text").innerText = ": " + health;
    console.log("draw_encounter: IF3: ELSEIF2:A boss enters the battle");
    player_stats();
  } else {
    console.log("draw_encounter: IF3: ELSE: an event begins");
    return;
  }
}
/* -----End draw encounter ----- */
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
function clear_encounter(encounter) {
  let clear_power = document.getElementById("power_stat");
  let clear_health = document.getElementById("health_stat");
  let clear_enemy = document.getElementById("enemy");
  let clear_elite = document.getElementById("elite");
  let clear_boss = document.getElementById("boss");
  let clear_player_health = document.getElementById("player_health");
  let clear_player_power = document.getElementById("player_power");
  if (encounter["type"] == "enemy") {
    clear_enemy.remove();
    clear_player_health.remove();
    clear_player_power.remove();
    console.log("clear_encounter: IF: enemy defeated");
  } else if (encounter["type"] == "elite") {
    clear_elite.remove();
    clear_player_health.remove();
    clear_player_power.remove();
    console.log("clear_encounter: IF: ELSEIF: elite defeated");
  } else if (encounter["type"] == "boss") {
    clear_boss.remove();
    clear_player_health.remove();
    clear_player_power.remove();
    console.log("clear_encounter: IF: ELSEIF2: boss defeated");
  } else {
    console.log("clear_encounter: IF: ELSE: Event completed");
    current_encounter = [];
    return;
  }
  clear_power.remove();
  clear_health.remove();
  current_encounter = [];
}
/* -----End clear encounter ------ */
/* -----create starting deck -----*/
function create_starting_deck() {
  let list_of_elements = ["Fire", "Ice", "Lightning", "Wind", "Earth", "Water"];
  let utility_types = ["draw", "discard", "heal"];
  for (let index = 0; index < list_of_elements.length; index++) {
    let random_utility = Math.floor(Math.random() * utility_types.length - 1);
    let card = {};
    card["id"] = index + 1;
    card["name"] = list_of_elements[index];
    card["rarity"] = "common";
    card["power"] = 1;
    card["damage"] = 1;
    card["defense"] = 1;
    card["utility"] = [utility_types[random_utility]];
    for (let index = 0; index < 3; index++) {
      starting_deck.push(card);
    }
  }
  shuffleArray(starting_deck);
  player_deck = starting_deck;
}
create_starting_deck();
/* -----End create starting deck -----*/
/* -----shuffle function ----- */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
/* ------End shuffle function ----- */
var draw_pile_count;
/*-----  update draw pile -----*/
function update_draw_pile_count() {
  draw_pile_count = player_deck.length;
  document.getElementById(
    "player_deck_count"
  ).innerText = `Player Deck [${draw_pile_count}]`;
}
update_draw_pile_count();
/* -----End update draw pile -----*/
var hand = [];
var discard_pile = [];
var handsize = 0;
/* ----- draw cards -----*/
function draw(num) {
  if (player_deck.length < num) {
    let cards_remaining = player_deck.splice(0, player_deck.length);
    let return_discard = discard_pile.splice(0, discard_pile.length);
    return_discard.forEach((card) => {
      player_deck.push(card);
      shuffleArray(player_deck);
    });
    update_discard_pile_count();
    let draw = num - cards_remaining.length;
    let draw_cards = player_deck.splice(0, draw);
    cards_remaining.forEach((card) => {
      draw_cards.push(card);
    });
    for (let index = 0; index < num; index++) {
      let card = draw_cards[index];
      let id = `in_hand_${index}`;
      document.getElementById(id).innerHTML = `${card.name}`;
      let action_type = check_active_type(card);
      let action_image = `${action_type}.png`;
      create_image(action_image, "card_image", card.name + "_card_image", id);
    }
    draw_cards.forEach((card) => {
      hand.push(card);
    });
    update_draw_pile_count();
  } else {
    let draw_cards = player_deck.splice(0, num);
    for (let index = 0; index < num; index++) {
      let card = draw_cards[index];
      let id = `in_hand_${index}`;
      document.getElementById(id).innerHTML = `${card.name}`;
      let action_type = check_active_type(card);
      let action_image = `${action_type}.png`;
      create_image(action_image, "card_image", card.name + "_card_image", id);
    }
    draw_cards.forEach((card) => {
      hand.push(card);
    });
    handsize = hand.length;
    update_draw_pile_count();
  }
}
/* -----End draw cards ----- */
/* ------ check active card type ------ */
function check_active_type(card) {
  let active = document.getElementsByClassName("action_button active");
  let active_type = "";
  if (!!active[0]) {
    var active_id = active[0].id;
  }
  if (active_id == "attack_button") {
    console.log("check_active_type: IF: !active type is Attack!");
    active_type = "Attack";
    return active_type;
  } else if (active_id == "defense_button") {
    console.log("check_active_type: IF: ELSEIF: !active type is Defense!");
    active_type = "Defense";
    return active_type;
  } else if (active_id == "utility_button") {
    console.log("check_active_type: IF: ELSEIF2: !active type is Utility!");
    active_type = "Utility";
    return active_type;
  } else {
    console.log(
      "check_active_type: IF: ELSE: !No active button will default to attack type!"
    );
    active_type = "Attack";
    return active_type;
  }
}
/* ------ End check active card type ------ */
/* -----discard ----- */
function discard(card) {
  if (card.name != "") {
    card.forEach((x) => {
      discard_pile.push(x);
    });
  } else {
    console.log("discard: ELSE: !! not a card. how to discard? !!");
  }
  update_discard_pile_count();
}
function update_discard_pile_count() {
  document.getElementById(
    "player_discard"
  ).innerText = `Discard [ ${discard_pile.length} ]`;
}
/* -----End discard ----- */
/* -----action points ----- */
var actions = 3;
function action_points(num) {
  actions += num;
  if (actions < 0) {
    actions = 0;
  } else if (actions > 3) {
    actions = 3;
  }
  document.getElementById("actions").innerText = actions;
  return;
}
/*----- End action points ----- */
/* -----play card -----*/
function play_card(name, id) {
  if (actions <= 0) {
    console.log("play_card: IF: out of actions!");
    return;
  }
  let card_index;
  hand.forEach((card) => {
    if (hand["name"] == name) {
      card_index = hand.indexOf(card["name"]);
    }
  });
  let card_played = hand.splice(card_index, 1);
  if (current_encounter[0] && current_encounter[0]["type"] != "event") {
    let encounter_health = current_encounter[0]["health"];
    if (encounter_health < 1) {
      /*!! REMINDER TO MOVE THIS LOGIC TO TURNS() !!*/
      console.log(
        "play_card: IF2: Nest: IF: !enemy defeated! time for rewards!"
      );
      clear_encounter(current_encounter[0]);
      rewards();
    } else {
      let damage = card_played[0]["power"];
      encounter_health = encounter_health - damage;
      current_encounter[0]["health"] = encounter_health;
      document.getElementById("health_stat_text").innerText =
        ": " + current_encounter[0]["health"];
      if (encounter_health < 1) {
        console.log(
          "play_card: IF2: Nest: Nest: IF: !enemy defeated! time for rewards!"
        );
        rewards();
        clear_encounter(current_encounter[0]);
      }
      action_points(-1);
    }
    document.getElementById(id).innerText = "!! CARD PLAYED !!";
    discard(card_played);
    if (actions <= 0) {
      console.log("play_card: IF2: Nest: IF2: out of actions!");
      end_turn_button();
    }
  } else {
    console.log("play_card: IF2: ELSE: no target");
    return;
  }
}
/* ------END play card------- */
var player_turns = 0;
var enemy_turns = 0;
/* ------ Button for Turn end------- */
function end_turn_button() {
  let div = document.createElement("div");
  div.setAttribute("id", "end_turn_div");
  let btn = document.createElement("button");
  btn.setAttribute("id", "end_turn");
  btn.setAttribute("class", "button");
  btn.setAttribute("type", "button");
  btn.setAttribute("onclick", "end_turn()");
  btn.innerText = "End Turn";
  div.appendChild(btn);
  document.getElementById("player_discard").appendChild(div);
  return;
}
/* ------END Button for Turn end------- */
/* -----Turn End----- */
function end_turn() {
  var name = document.getElementsByClassName("in_hand_card");
  for (let i = 0; i < name.length; i++) {
    let card = name.item(i);
    for (let i = 0; i < hand.length; i++) {
      if (hand[i]["name"].includes(card.innerText)) {
        document.getElementById(card.id).innerHTML = "discarded";
      }
    }
  }
  discard(hand);
  player_turns++;
  turns();
}
/* -----End Turn End----- */
/* -----Turn start alert ----- */
function turns() {
  if (player_turns > enemy_turns) {
    fade("popup");
    console.log("turns: IF: code for start enemy turn");
    enemy_turn();
  } else {
    fade("popup");
    action_points(3);
    console.log("turns: ELSE: code for start player turn");
  }
  return;
}
/* -----End Turn start alert ----- */
/* ------enemy turn ------ */
function enemy_turn() {
  let damage_to_player = current_encounter[0]["power"];
  let power_points = current_encounter[0]["power"];
  // console.log(damage_to_player);
  if (player_health > 0) {
    for (let point = 0; point < power_points; point++) {
      player_health -= damage_to_player;
    }
    // console.log(player_health);
    document.getElementById("player_health_text").innerText =
      ": " + player_health;
  }
  if (player_health <= 0) {
    console.log("enemy_turn: IF2: !--Player is dead--! do the dead code here");
  }
  enemy_turns++;
  turns();
  return;
}
/* ------End enemy turn ------ */
/* ------Rewards ------ */
function rewards() {
  console.log("rewards: do reward stuff here");
  return;
}
/* ------End Rewards ------ */

// create element div css is set to opacity 0 and transition time set
// function to change opacity to 1
// timeout to close must include transition time
/* -----create popup window ------ */
function modal(element_id) {
  let div = document.createElement("div");
  div.setAttribute("id", element_id);
  div.setAttribute("class", "modal");
  document.getElementById("backdrop").appendChild(div);
  return;
}
/* -----End create popup window ----- */
/* ------fade in/out popup window ----- */
function fade(element_id) {
  if (!document.getElementById(element_id)) {
    modal(element_id);
  } else {
    console.log("fade: IF: ELSE: already created!");
  }
  let opacity = document.getElementById(element_id).style.opacity;
  if (opacity == 0) {
    setTimeout(() => {
      document.getElementById(element_id).style.opacity = 1;
    }, 1);
  } else {
    document.getElementById(element_id).style.opacity = 0;
    setTimeout(() => {
      document.getElementById(element_id).remove();
    }, 1000);
  }
}
/* -----End fade in/out popup window ----- */
/* ------mouse click and tag console log------- */
document.onmousedown = function (e) {
  target_class = e.target.className;
  target_name = e.target.innerHTML;
  target_id = e.target.id;
  if (target_class == "in_hand_card") {
    play_card(target_name, target_id);
  } else if (
    target_class == "action_button" ||
    target_class == "action_button active"
  ) {
    set_active(target_id);
  } else if (target_id == "popup") {
    fade("popup");
  } else {
    console.log("document.onmousedown: mouseclick");
  }
};
/*-----End mouse click and tag console log -----*/
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
function test() {
  console.log("test: place code to test within");
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
