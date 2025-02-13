let player = { name: "", hp: 20, attack: 5, heal: 4 };
let enemy = { hp: 15, attack: 3 };

function selectCharacter(name) {
    player.name = name;
    if (name === "Воин") {
        player.hp = 25;
        player.attack = 6;
    } else if (name === "Разбойник") {
        player.hp = 18;
        player.attack = 7;
    } else if (name === "Маг") {
        player.hp = 15;
        player.attack = 8;
        player.heal = 6;
    }
    document.getElementById("character-selection").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    updateBattlefield();
}

function attack() {
    enemy.hp -= player.attack;
    log(`🗡 ${player.name} атакует! Враг теряет ${player.attack} HP.`);
    if (enemy.hp <= 0) {
        log("🎉 Победа! Враг повержен.");
        return;
    }
    enemyTurn();
}

function heal() {
    player.hp += player.heal;
    log(`💖 ${player.name} лечится на ${player.heal} HP.`);
    enemyTurn();
}

function move() {
    log(`🚶‍♂️ ${player.name} передвигается. Враг немного сбит с толку.`);
    enemyTurn(true);
}

function enemyTurn(skipped = false) {
    if (!skipped) {
        player.hp -= enemy.attack;
        log(`💀 Враг атакует! ${player.name} теряет ${enemy.attack} HP.`);
        if (player.hp <= 0) {
            log("☠️ Ты проиграл...");
            return;
        }
    }
    updateBattlefield();
}

function updateBattlefield() {
    document.getElementById("player").textContent = `${player.name} (${player.hp} HP)`;
    document.getElementById("enemy").textContent = `Враг (${enemy.hp} HP)`;
}

function log(message) {
    let logDiv = document.getElementById("battle-log");
    logDiv.innerHTML += `<p>${message}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}

const playerDeck = [
    { name: "Мощный удар", type: "attack", value: 6 },
    { name: "Быстрый удар", type: "attack", value: 3 },
    { name: "Лечение", type: "heal", value: 4 },
    { name: "Рывок", type: "move", value: 2 },
];

const enemyDeck = [
    { name: "Свирепая атака", type: "attack", value: 4 },
    { name: "Ядовитый укус", type: "attack", value: 3, effect: "poison" },
    { name: "Глухая защита", type: "defense", value: 2 },
];

let selectedCards = [];

function drawCards() {
    let handDiv = document.getElementById("player-hand");
    handDiv.innerHTML = "";

    playerDeck.forEach((card, index) => {
        let cardElement = document.createElement("button");
        cardElement.textContent = `${card.name} (${card.type} ${card.value})`;
        cardElement.classList.add("card");
        cardElement.onclick = () => selectCard(index);
        handDiv.appendChild(cardElement);
    });
}

function selectCard(index) {
    if (selectedCards.length < 2) {
        selectedCards.push(playerDeck[index]);
        log(`Выбрана карта: ${playerDeck[index].name}`);
    }
    if (selectedCards.length === 2) {
        playRound();
    }
}

function playRound() {
    selectedCards.forEach(card => applyCardEffect(card));
    enemyTurn();
    selectedCards = [];
    drawCards();
}

function applyCardEffect(card) {
    if (card.type === "attack") {
        enemy.hp -= card.value;
        log(`🗡 ${player.name} использует "${card.name}"! Враг теряет ${card.value} HP.`);
    } else if (card.type === "heal") {
        player.hp += card.value;
        log(`💖 ${player.name} использует "${card.name}" и восстанавливает ${card.value} HP.`);
    } else if (card.type === "move") {
        log(`🚶‍♂️ ${player.name} делает рывок (${card.value} клетки).`);
    }
}

function enemyTurn() {
    let enemyCard = enemyDeck[Math.floor(Math.random() * enemyDeck.length)];
    log(`👹 Враг использует "${enemyCard.name}"!`);
    if (enemyCard.type === "attack") {
        player.hp -= enemyCard.value;
        log(`💀 ${player.name} получает ${enemyCard.value} урона!`);
    }
    updateBattlefield();
}