const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs =require('fs');

function topEonomicalBowlers(){

    let seasonMatch2015 = matchData.reduce((accumulator,currentValue)=>{

        if (currentValue.season == 2015){
            return [...accumulator,parseInt(currentValue["id"])];
        }

        return accumulator;

    },[]);

let besteconomy = deliverydata.reduce((accumulator,currentValue)=>{

    if (seasonMatch2015.includes(parseInt(currentValue.match_id))){

        if (accumulator[currentValue.bowler]){

            accumulator[currentValue.bowler]['runs_conceded'] += parseInt(currentValue.total_runs);
            accumulator[currentValue.bowler]['total_balls']++; 
        accumulator[currentValue.bowler]['economy']=(accumulator[currentValue.bowler]['runs_conceded']/((accumulator[currentValue.bowler]['total_balls'])/6)).toFixed(2);

    }else{

        accumulator[currentValue.bowler] = {};
        accumulator[currentValue.bowler]['runs_conceded'] = parseInt(currentValue.total_runs);
        accumulator[currentValue.bowler]['total_balls'] = 1;
    }
}

return accumulator;

},{});


let topEonomicalBowlers = Object.fromEntries(Object.entries(besteconomy).sort((a,b)=>a[1].economy-b[1].economy).slice(0,10).filter(bowler=>{

    bowler[1]=parseFloat(bowler[1].economy)
 return true;

}))

return topEonomicalBowlers;

}

const topTenBowler = topEonomicalBowlers();

fs.writeFileSync('../public/output/4-topEconomicalBowlers.json',JSON.stringify(topTenBowler));

console.log(topTenBowler);
