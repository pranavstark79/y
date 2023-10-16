// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
// const fs = require('fs');

(async () => {
  // OPTION 1 - Launch new.
  // const browser = await puppeteer.launch({
  //   headless: false, // Puppeteer is 'headless' by default.
  // });

  // OPTION 2 - Connect to existing.
  // MAC: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
  // PC: start chrome.exe –remote-debugging-port=9222
  // Note: this url changes each time the command is run.
  const wsChromeEndpointUrl = 'ws://127.0.0.1:9222/devtools/browser/f2c884e5-1bf8-4b64-ab59-55ebf1bc67be';
  const browser = await puppeteer.connect({
      browserWSEndpoint: wsChromeEndpointUrl,
  });

  const page = await browser.newPage();
  let pageUrl = 'https://groww.in/options/nifty';

  // await page.goto(pageUrl, {
  //   waitUntil: 'networkidle0', // 'networkidle0' is very useful for SPAs.
  // });

  // const mostSearchedList = 
  
  try {
  await page.evaluate(() => {
    console.log('FN called');
    const objectList = document.getElementById('root');
    console.log("===>", objectList);
    // const mostSearched = [];

    // objectList.forEach((item) => {
    //   const child = item.firstChild;
    //   const title = child.innerText;
    //   const href = child.href;

    //   mostSearched.push(title + ' - ' + href);
    // });

    // return mostSearched;
    
  });
}catch (err){
  console.log(err);
}

  // fs.writeFile(
  //   'mostSearched.json',
  //   JSON.stringify(mostSearchedList),
  //   function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }

  //     console.log('The file was saved!');
  //   }
  // );

  browser.close();
})();