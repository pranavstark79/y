const utils = require('./utils');
const cheerio = require('cheerio');
const moment = require('moment');
const fs = require('fs');
const { calculateDelta } = require('./calcDelta');

const YEAR = 2023;

const { getMonthNum } = utils;

const folderPath = 'C:\\Users\\pranav2.kumar\\Desktop\\me\\market\\orders';
const fileName = 'Orders - Groww.html';
const filePath = `${folderPath}/${fileName}`;

const data = [];
let tArray = [];


const htmlData = fs.readFileSync(filePath, 'utf8');
const $ = cheerio.load(htmlData);

const orderDay = ($('.ord131DateStyle').text()).split(',')[1];
const { month, day } = getMonthNum(orderDay);

const dateStr = `${YEAR}-${month}-${day}`;
let counter = 0;
// var target12 = '2016-12-08 9:32:45 PM';
// console.log(moment(target12, 'YYYY-MM-DD h:m:s A').format('YYYY-MM-DD HH:mm:ss'));


const main = () => {
    $("div[class^=ord131Data]").each((index, elm) => {
        let tData = {};
        const text = $(elm).text();
        if (text.includes('Call')) {
            tData['chain'] = text;
            tData['trade'] = 'Call'

            if (text.includes('Buy')) {
                tData['type'] = 'Buy'
            }

            if (text.includes('Sell')) {
                tData['type'] = 'Sell'
            }
        }

        if (text.includes('Put')) {
            tData['chain'] = text;
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
            tData['time'] = text;
        }

        tArray.push(tData);

        // console.log("==>", index);
        // console.log(tArray);
        if ((index + 1) % 4 == 0) {
            // console.log("::::", tArray);
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
            data.push(obj);
        }

        fs.writeFileSync('./data.json', JSON.stringify(data, null, 4));


    });

    calculateDelta();
}

main();




// console.log(JSON.stringify(data, null, 4))