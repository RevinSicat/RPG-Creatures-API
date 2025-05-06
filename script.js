//HTML Elements Variables
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

//Variables
const ApiCreatureList = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const ApiCreatureData = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";
let creaturesArr = [];
let creatureData = {};

//Functions
const clearData = () => {
    searchInput.value = "";
    creatureName.textContent = "";
    creatureId.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    types.innerHTML = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.innerHTML = "";
    specialDefense.innerHTML = "";
    speed.textContent = "";
}
const fetchCreatureList = async () => {
    try {
        console.log("[Started]: fetchCreatureList");
        const response = await fetch(ApiCreatureList);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        creaturesArr = await response.json(); 
    } catch (err) {
        console.log("Fetch error:", err);
    }
};
const fetchCreatureData = async (id) => {
    try {
        console.log("[Started]: fetchCreatureData");
        const response = await fetch(ApiCreatureData+id);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        creatureData = await response.json();
        console.log(creatureData); //to remove
        loadCreatureData(creatureData);
    } catch (err) {
        console.log(err);
    }
}
const loadCreatureData = (obj) => {
    creatureName.textContent = obj.name;
    creatureId.textContent = obj.id;
    weight.textContent = obj.weight;
    height.textContent = obj.height;
    obj.types.forEach((type)=>{
       types.innerHTML += `<div class="type-div ${type.name}">${type.name.toUpperCase()}</div>`
    });
    specialName.innerHTML = `<p><b>${obj.special.name}</b></p>`
    specialDescription.innerHTML = `<p>${obj.special.description}</p>`
    hp.textContent = obj.stats.find((stat) => stat.name === "hp").base_stat;
    attack.textContent = obj.stats.find((stat) => stat.name === "attack").base_stat;
    defense.textContent = obj.stats.find((stat) => stat.name === "defense").base_stat;
    specialAttack.textContent = obj.stats.find((stat) => stat.name === "special-attack").base_stat;
    specialDefense.textContent = obj.stats.find((stat) => stat.name === "special-defense").base_stat;
    speed.textContent = obj.stats.find((stat) => stat.name === "speed").base_stat;
}
const searchCreature = (userSearch) => {
    console.log("[Started]: searchCreature");
    clearData();
    let found = false;
    if (!isNaN(userSearch)) {
        found = creaturesArr.some(creature => {
        if (creature.id === parseInt(userSearch)) {
            console.log(`[Retreived]: Match Found: {${creature.id}, ${creature.name}}`);
            fetchCreatureData(creature.id);
            return true;
        }
        console.log(`[Retreived]: No Match: {${userSearch}}`);
        return false;
        });
    } else {
        found = creaturesArr.some(creature => {
        if (creature.name.toLowerCase() === userSearch.toLowerCase()) {
            console.log(`[Retreived]: Match Found: {${creature.id}, ${creature.name}}`);
            fetchCreatureData(creature.id);
            return true;
        }
        console.log(`[Retreived]: No Match: {${userSearch}}`);
        return false;
        });
    }
    if (!found) {
        alert("Creature not found");
    }
}



//Event listeners
searchBtn.addEventListener("click",() => {
    const userSearch = searchInput.value.trim();
    searchCreature(userSearch);
});
clearBtn.addEventListener("click", clearData);
//Initialization
fetchCreatureList();
