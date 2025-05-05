//HTML Elements Variables
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

//Variables
const creatureList = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
let creaturesArr = [];

//Functions
const fetchCreatureList = async () => {
    try {
        const response = await fetch(creatureList);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        creaturesArr = await response.json(); 
    } catch (err) {
        console.log("Fetch error:", err);
    }
};
const searchCreature = (userSearch) => {
    let found = false;
    if (!isNaN(userSearch)) {
        found = creaturesArr.some(creature => {
        if (creature.id === parseInt(userSearch)) {
            console.log(creature.id, creature.name);
            return true;
        }
        return false;
        });
    } else {
        found = creaturesArr.some(creature => {
        if (creature.name.toLowerCase() === userSearch.toLowerCase()) {
            console.log(creature.id, creature.name);
            return true;
        }
        return false;
        });
    }
    if (!found) {
        alert("Creature not found");
    }
};

//Event listeners
searchBtn.addEventListener("click",() => {
    const userSearch = searchInput.value.trim();
    searchCreature(userSearch);
});
//Initialization
fetchCreatureList();
