
const fs = require('fs');
let sumDelta = 0;
const stats = [];
const sumDeltaArr = [];

const calculateDelta = () => {

    const data = require('./data.json');

    const buyOrders = data.filter(e => e.type === 'Buy' && e.status === 'Executed');
    const SellOrders = data.filter(e => e.type === 'Sell' && e.status === 'Executed');

    const sortedBuyOrders = buyOrders.sort((a, b) => {
        const d1 = new Date(a.utcTime);
        const d2 = new Date(b.utcTime);

        if (d1 > d2) {
            return 1;
        }
        if (d2 > d1) {
            return -1;
        }
        return 0;

    });


    const len = sortedBuyOrders.length;

    for (let i = 0; i < len; i++) {
        const buyOrderObj = sortedBuyOrders[i];
        const saleOrderObj = findSellOrder(buyOrderObj);
        const delta = (saleOrderObj.cost - buyOrderObj.cost);
        sumDelta += delta;

        sumDeltaArr.push(sumDelta);

        stats.push({
            sumDelta,
            delta,
            time: saleOrderObj.utcTime,
            localTime: saleOrderObj.localTime
        })

        console.log(`
        ---------------------------------------------
        Delta : ${saleOrderObj.cost - buyOrderObj.cost}

        Sum Delta: ${sumDelta}
        ---------------------------------------------
        
        `);
    }

    function findSellOrder(buyOrderObj) {
        const { chain, qty, utcTime } = buyOrderObj;
        const updatedChain = chain.replaceAll('Buy', 'Sell')
        const filteredSellOrders = SellOrders.filter(e => e.chain === updatedChain && e.qty === qty && (new Date(e.utcTime) >= new Date(utcTime)));

        const timeSortedSellOrders = filteredSellOrders.sort((a, b) => {
            const d1 = new Date(a.utcTime);
            const d2 = new Date(b.utcTime);

            if (d1 > d2) {
                return 1;
            }
            if (d2 > d1) {
                return -1;
            }
            return 0;
        })

        return timeSortedSellOrders[0];

    }


    //Write Statistics
    fs.writeFileSync('./stats.json', JSON.stringify(stats, null, 4))
    fs.writeFileSync('./sumDeltaHist.json', JSON.stringify(sumDeltaArr, null, 4));

}


module.exports = {
    calculateDelta
}