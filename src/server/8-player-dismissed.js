const matchData = require('./matchescsvtojson')
const deliverydata = require('./deliverycsvtojson')
const fs = require("fs")

function dismissedBatsman(){

    let DismissedPlayer = {batsman : null, bowler : null, dismissals : 0};

     deliverydata.filter((ball) => {

        if (ball.dismissal_kind !== '' && ball.dismissal_kind !== 'run out') {

            return true;
        }
    })

    .reduce((previousvalue, currentValue) => {

        if (previousvalue[currentValue.batsman]) {

              if (previousvalue[currentValue.batsman][currentValue.bowler]) 
              {

                   previousvalue[currentValue.batsman][currentValue.bowler] ++

              } else {

                   previousvalue[currentValue.batsman][currentValue.bowler] = 1
              }

              if (DismissedPlayer.dismissals < previousvalue[currentValue.batsman][currentValue.bowler]) {

                   DismissedPlayer.batsman = currentValue.batsman;
                   DismissedPlayer.bowler = currentValue.bowler;
                   DismissedPlayer.dismissals = previousvalue[currentValue.batsman][currentValue.bowler];
              }

         } else {

                   previousvalue[currentValue.batsman] = {}
              }

        return previousvalue;

    }, {});

    return DismissedPlayer
}

let playerdissmissed = dismissedBatsman();

fs.writeFileSync('../public/output/8-ManyTimesDissmissedOnePlayer.json', JSON.stringify(playerdissmissed));

console.log(playerdissmissed);


