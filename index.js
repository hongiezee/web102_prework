/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(function(item, index){
         // create a new div element, which will become the game card   
         var gameCardDiv = document.createElement("div");
        
         // add the class game-card to the list
        gameCardDiv.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCardDiv.innerHTML = `<img src=${item.img} alt="picture" width="300">`+
         `<header> ${item.name} </header>`+
         `<p> Backers: ${item.backers} </p>`;

        // append the game to the games-container        
        gamesContainer.appendChild(gameCardDiv);
    });

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc,item)=> {return acc + item.backers;},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const formattedContribution = totalContributions.toLocaleString('en-US');
contributionsCard.innerHTML = `<p> ${formattedContribution} </p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raised = GAMES_JSON.reduce( (acc,item)=> {return acc + item.pledged;},0);
const formattedRaised = raised.toLocaleString('en-US',{style: 'currency', currency: 'USD', maximumFractionDigits:0});

// console.log(formattedRaised);
// set inner HTML using template literal
raisedCard.innerHTML = `<p> ${formattedRaised} </p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const gamesNum = GAMES_JSON.reduce( (acc, item)=> {return acc + 1;},0);
gamesCard.innerHTML= `<p> ${gamesNum} </p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });
    console.log(unfundedGames);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    });
    console.log(fundedGames);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}



// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
});

const unfundedCount = unfundedGames.reduce((acc) => acc + 1, 0);
// console.log(unfundedCount);

// create a string that explains the number of unfunded games using the ternary operator
let unfundedStr = (unfundedCount === 1) ? ` Currently, there is 1 unfunded game.` : ` Currently, there are ${unfundedCount} unfunded games.`;

// console.log(unfundedStr);
let beginningStr = `A total of ${formattedRaised} has been raised for ${gamesNum} games.`;

// create a new DOM element containing the template string and append it to the description container
const unfundedParagraph = document.createElement('p');
unfundedParagraph.textContent = beginningStr + unfundedStr + " Please help us fund these amazing games!";
document.getElementById("description-container").appendChild(unfundedParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...others] = sortedGames;
// console.log(firstGame);
// console.log(secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstname = document.createElement('p');
firstname.textContent= firstGame.name;
console.log(firstGame.name)
firstGameContainer.appendChild(firstname);

const secondname = document.createElement('p');
secondname.textContent= secondGame.name;
console.log(secondGame.name)
secondGameContainer.appendChild(secondname);
// do the same for the runner up item