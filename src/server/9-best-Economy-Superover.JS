const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs = require("fs")

function bestEconomySuperOver(){

    let superOverBowler = deliverydata.reduce((previousvalue,currentValue)=>{

        if(!currentValue.match_id==""){

             if(currentValue.is_super_over!=0){

                  if(previousvalue[currentValue.bowler]){

                       previousvalue[currentValue.bowler]['run'] += parseInt(currentValue.total_runs);
                       previousvalue[currentValue.bowler]['ball']++;
                       previousvalue[currentValue.bowler]['bestEconomySuperOver'] = parseFloat(((previousvalue[currentValue.bowler]['run']/(previousvalue[currentValue.bowler]['ball']/6))).toFixed(2))
   
                  }else{

                       previousvalue[currentValue.bowler]= {}
                       previousvalue[currentValue.bowler]['run'] = parseInt(currentValue.total_runs);
                       previousvalue[currentValue.bowler]['ball'] = 1
                  }
             }
        }

        return previousvalue;

   },{})
   
   let topBowlerInSuperOver = Object.fromEntries(Object.entries(superOverBowler).sort((firstValue,secondvalue)=>{

        if(firstValue[1].bestEconomySuperOver >secondvalue[1].bestEconomySuperOver){

             return 1;
        }
        else{
             return -1
        }

   }).slice(0,1).filter(bowler => {

           bowler[1] = parseFloat( bowler[1].bestEconomySuperOver)
           return true;

       }));

   return topBowlerInSuperOver;
}

let bestEconomySuperOverBowler = bestEconomySuperOver()

fs.writeFileSync('../public/output/9-bestBowlerInSuperOver.json', JSON.stringify(bestEconomySuperOverBowler));

console.log(bestEconomySuperOverBowler);

