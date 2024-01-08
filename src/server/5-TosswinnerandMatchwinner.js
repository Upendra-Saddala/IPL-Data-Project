const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs = require("fs")


function matchWonTossWon(){

    let output = matchData.reduce((previousvalue,currentValue)=>{

         if(!currentValue.id==""){

         if(currentValue.winner==currentValue.toss_winner){
              if(previousvalue[currentValue.toss_winner])
              {
                   previousvalue[currentValue.toss_winner]++
              }
              else{
                   previousvalue[currentValue.toss_winner] = 1
              }
         }
         }

         return previousvalue

    },{})

    return output;

    }

    let matchandtoss = matchWonTossWon()

    fs.writeFileSync('../public/output/5-matchwontosswin.json', JSON.stringify(matchandtoss));

    console.log(matchandtoss);

    