const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs = require("fs")

function playerOfTheMatch(){

    let seasonId = matchData.reduce((previousvalue, currentValue) => {

        if (currentValue.season == 2016) {
             return [...previousvalue, parseInt(currentValue["id"])];
        }
        return previousvalue;

   }, []);
   
   
   let result = matchData.reduce((previousvalue, currentValue) => {

        if (!currentValue.id == " ") {
             if (previousvalue[currentValue.season]) {
                  if (
                       previousvalue[currentValue.season][
                            currentValue.player_of_match
                       ]
                  ) {
                       previousvalue[currentValue.season][
                            currentValue.player_of_match
                       ]++;
                  } else {
                       previousvalue[currentValue.season][
                            currentValue.player_of_match
                       ] = 1;
                  }
             } else {
                  previousvalue[currentValue.season] = {};
             }
        }

        return previousvalue;

   }, {});

   let ObjectArray = Object.entries(result).reduce((previousvalue, currentValue) => {

             let manOfTheMatch = Object.entries(currentValue[1])
                  .sort((value1, value2) => {
                       return value2[1] - value1[1];
                  })
                  .slice(0, 1);
             previousvalue[currentValue[0]] = Object.fromEntries(manOfTheMatch);

             return previousvalue;
        },
        {}
   );
   return ObjectArray
}

let playerOfMatchSeason = playerOfTheMatch()

fs.writeFileSync('../public/output/6-MatchWinnerofseason.json', JSON.stringify(playerOfMatchSeason));

console.log(playerOfMatchSeason);
