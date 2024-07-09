import fs from 'fs';

// storing data by reading the file and rewrite 
export function storeData(dataPath, newData) {
  fs.readFile(dataPath, (err, fileData) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }
    let json;
    try {
      json = JSON.parse(fileData.toString());
    } catch (parseError) {
      console.error(`Error parsing JSON from file: ${parseError}`);
      return;
    }
    json.push(newData);

    fs.writeFile(dataPath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(`Error writing file: ${writeErr}`);
      }
    });
  });
}

// replace data in token creation file with unchecked ones only
export function replaceData(dataPath, leftData) {
    fs.writeFile(dataPath, JSON.stringify(leftData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(`Error writing file: ${writeErr}`);
      }
    });
}


// check if token age 10 minutes old or not

export function tokenTimeCheck(time){
    let currentTime = Math.ceil(Date.parse(new Date().toISOString())/1000);
    let tokenTime = Math.ceil(Date.parse(time)/1000);
    return (currentTime - tokenTime >= 600) ? true : false;
}

export function tokenScore(token){
  let score = 0;

  (token.priceChange > 0)? score++ : 0;
  (token.priceChange5m > 0)? score++ : 0;
  ((token.tokenAccounts -  token.txn24) <=50)? score++ : 0;
  ((token.volume - token.fdv) <=10000)? score++ : 0;
  (token.ratio > 50 )? score++ : 0;
  (token.rayPct <= 20 )? score++ : 0;
  (50 > token.top10Pct >= 35 )? score++ : 0;
  (token.symbol.length <= 5 )? score++ : 0;

  return score;
}
