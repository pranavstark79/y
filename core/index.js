const utils = require('./utils');
const cheerio = require('cheerio');
const moment = require('moment');
const fs = require('fs');
const { calculateDelta } = require('./calcDelta');

const YEAR = 2023;

const { getMonthNum, parseHTML } = utils;

const folderPath = 'C:\\Users\\pranav2.kumar\\Desktop\\me\\market\\orders';
const fileName = 'Orders_Groww_0910.html';
const filePath = `${folderPath}/${fileName}`;

const data = [];
let tArray = [];


const htmlData = fs.readFileSync(filePath, 'utf8');
const parsedHtml = parseHTML(htmlData);
fs.writeFileSync('./data/index2.html', parsedHtml);
const $ = cheerio.load(parsedHtml);

const orderDay = ($('.ord131DateStyle').text()).split(',')[1];
const { month, day } = getMonthNum(orderDay);

const dateStr = `${YEAR}-${month}-${day}`;
let counter = 0;


const main = () => {
    $("div[class^=ord131Data]").each((index, elm) => {
        let tData = {};
        const text = $(elm).text();
        if (text.includes('Call')) {
            tData['chain'] = text.replace(/ /g, '');
            tData['trade'] = 'Call'

            if (text.includes('Buy')) {
                tData['type'] = 'Buy'
            }

            if (text.includes('Sell')) {
                tData['type'] = 'Sell'
            }
        }

        if (text.includes('Put')) {
            tData['chain'] = text.replace(/ /g, '');
            tData['trade'] = 'Put'

            if (text.includes('Buy')) {
                tData['type'] = 'Buy'
            }

            if (text.includes('Sell')) {
                tData['type'] = 'Sell'
            }
        }

        if (text.includes('Qty')) {
            tData['qty'] = text.split('Qty')[0];
        }

        if (text.includes('Price')) {
            tData['avgPrice'] = text.split('Avg')[0];
        }

        if (text === '-') {
            tData['avgPrice'] = '-'
        }

        if (text.includes('AM') || text.includes('PM')) {
            const strArr = text.split('##');
            tData['time'] = strArr[0].trim();
            tData['status'] = strArr[1].trim();
        }

        tArray.push(tData);

        if ((index + 1) % 4 == 0) {
            let obj = {};
            for (let i = 0; i < tArray.length; i++) {
                const tObj = tArray[i];
                Object.assign(obj, tObj);
            }

            const finalDateStr = dateStr + ' ' + obj.time;


            const utcTimeStamp = moment(finalDateStr, 'YYYY-MM-DD hh:mm A');
            const localTimeStamp = utcTimeStamp.local().format('YYYY-MM-DD:hh:mm A');
            obj.localTime = localTimeStamp;
            obj.utcTime = utcTimeStamp;
            counter++;
            obj.id = counter;
            const finalCost = (parseInt(obj.qty) * (parseFloat(obj.avgPrice.split('₹')[1]) ? parseFloat(obj.avgPrice.split('₹')[1]) : 0))
            obj.cost = Math.ceil(finalCost)
            data.push(obj);
        }

        fs.writeFileSync('./data.json', JSON.stringify(data, null, 4));


    });

    calculateDelta();
}

main();




// console.log(JSON.stringify(data, null, 4))