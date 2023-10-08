
const fs = require('fs');
let sumDelta = 0;

const calculateDelta = () => {

    const data = require('./data.json');
    const len = data.length;

    for (let i = len - 1; i > 0; i = i - 2) {

        const currObj = data[i];
        let nextObj = data[i - 1];

        if (nextObj.avgPrice == '-') {
            nextObj = data[i - 2]
        }


        const buyPrice = parseFloat(currObj.qty) * parseFloat(currObj.avgPrice.split('₹')[1]);
        const sellPrice = parseFloat(nextObj.qty) * parseFloat(nextObj.avgPrice.split('₹')[1]);;



        const delta = sellPrice - buyPrice;

        console.log('BUY_PRICE', buyPrice);
        console.log('SELL_PRICE', sellPrice);


        console.log('DELTA_', delta);
        if (!isNaN(delta)) {
            sumDelta += delta;
        }


        console.log('TOTAL', sumDelta);
    }
}


module.exports = {
    calculateDelta
}