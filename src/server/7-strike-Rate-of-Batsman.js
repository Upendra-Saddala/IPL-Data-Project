const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs = require("fs")

function strikeRateOfBatsMan(){

    let BatsMan = deliverydata.filter(Data=>{

         return Data.batsman === "MS Dhoni"
    })
    
    let seasonData = BatsMan.map((seasonwise)=> {

         let year = matchData.filter((yearWise)=> {

              return yearWise.id===seasonwise.match_id
         })
         .map((yearWise)=> {

              return yearWise.season
         })
         seasonwise.season = year[0]

         return seasonwise
    })
    console.log("Virendra Shewag")


    let batsmanStrikeRate = seasonData.reduce((previousvalue,currentValue)=> {

         if(!currentValue.match_id ==" "){

               if(previousvalue[currentValue.season]){

                   previousvalue[currentValue.season]["runs"] += parseInt(currentValue.batsman_runs)
                   previousvalue[currentValue.season]['balls'] ++
                   previousvalue[currentValue.season]['StrikeRate'] = parseFloat((previousvalue[currentValue.season]['runs']/previousvalue[currentValue.season]['balls'])*100).toFixed(2)
               } else {

                   previousvalue[currentValue.season] = {}
                   previousvalue[currentValue.season]['runs'] = parseInt(currentValue.batsman_runs)
                   previousvalue[currentValue.season]['balls'] = 1
              }
         }

         return previousvalue;

    },{})

    return batsmanStrikeRate;
}

let StrikeRateOfBatsman = strikeRateOfBatsMan()

fs.writeFileSync('../public/output/7-strikeRateOfBatsMan.json', JSON.stringify(StrikeRateOfBatsman));


console.log(StrikeRateOfBatsman)
