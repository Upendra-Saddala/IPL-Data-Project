const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs = require("fs")
// console.log(matchData);
// console.log(deliverydata);
function matchesplayedperyear(matchData){

    return matchData.reduce((previousvalue,currentvalue)=>{

        if (currentvalue['id']!==''){

            if (previousvalue[currentvalue.season]){
                previousvalue[currentvalue.season]++;
            }else{
                previousvalue[currentvalue.season]=1;
            }
        }

        return previousvalue;

    },{});

}

const problem1 = matchesplayedperyear(matchData)
// console.log(problem1);
fs.writeFileSync('../public/output/1-matchesPerYear.json',JSON.stringify(problem1));
console.log(problem1);

