const matchData = require('./matchescsvtojson');
const deliverydata=require('./deliverycsvtojson')
const fs = require('fs');
// console.log(matchData);

function matcheswonPerYear(matchData){

    return matchData.reduce((finalValue,currentValue)=>{

        if (currentValue['id']!==''){

            if (finalValue[currentValue.winner]){

                if (finalValue[currentValue.winner][currentValue.season]){
                    finalValue[currentValue.winner][currentValue.season]++;
                }else{
                    finalValue[currentValue.winner][currentValue.season]=1;
                }
            }else{
                finalValue[currentValue.winner]={}
                finalValue[currentValue.winner][currentValue.season]=1;
            }
        }

        return finalValue;

    },{});

    };

    const problem2=matcheswonPerYear(matchData);

    fs.writeFileSync('../public/output/2-matchesWonPerYear.json',JSON.stringify(problem2));

    console.log(problem2);
    

