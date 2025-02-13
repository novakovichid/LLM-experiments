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