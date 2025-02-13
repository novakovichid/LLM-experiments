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

let player = { name: "Герой", hp: 10 };
let enemy = { name: "Враг", hp: 10 };
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

function updateBattlefield() {
    document.getElementById("player-hp").textContent = player.hp;
    document.getElementById("enemy-hp").textContent = enemy.hp;
}

function log(message) {
    document.getElementById("log").textContent = message;
}

drawCards();
