const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs =require('fs');

function extraRunsConceded(){

    let season2016 = matchData.reduce((accumulator,currentValue)=>{

        if (currentValue.season == 2016){
            return [...accumulator,parseInt(currentValue["id"])];
        }
        return accumulator;

    },[])
    

let extraRunsConceded = deliverydata.reduce((accumulator,currentValue)=>{

    if (season2016.includes(parseInt(currentValue.match_id))){

        if (accumulator[currentValue.bowling_team]){
            accumulator[currentValue.bowling_team] += parseInt(currentValue.extra_runs)
        }else{
            accumulator[currentValue.bowling_team]=parseInt(currentValue.extra_runs)
        }
    }

    return accumulator

},{})

return extraRunsConceded;

}

const extraRunGiven = extraRunsConceded();

fs.writeFileSync('../public/output/3-extraRunGiven.json',JSON.stringify(extraRunGiven))

console.log(extraRunGiven);