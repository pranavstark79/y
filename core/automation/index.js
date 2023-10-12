const cheerio = require('cheerio');
const axios = require('axios');
const puppeteer = require('puppeteer');
const SECONDS = 1;
const LOAD_INRERVAL = SECONDS * 1000;
const { parseText } = require('./utils');

const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const main = async () => {
  try {
    app.get('/', (req, res) => {
      res.send('<h1>Hello world</h1>');
    });

    let totalUsers = 0;
    //When client gets connected
    io.on('connection', (socket) => {
      totalUsers++;
      console.log(
        `a user is connected with id: ${socket.id}, total users: ${totalUsers}`
      );
      // setInterval(() => {
      //   io.emit('data', { time: new Date().toISOString() });
      // }, 200);

      socket.on('disconnect', () => {
        totalUsers--;
        console.log(`a user is disconnected, total users: ${totalUsers}`);
      });
    });

    server.listen(3000, () => {
      console.log('server running at http://localhost:3000');
    });

    console.log('Main func called');
    const { data: debugJSON } = await axios.get(
      'http://127.0.0.1:9222/json/version'
    );
    console.log('RESPONSE', debugJSON);

    const { webSocketDebuggerUrl } = debugJSON;

    const dataUrl = `https://groww.in/options/sp-bse-sensex`;

    const browser = await puppeteer.connect({
      browserWSEndpoint: webSocketDebuggerUrl,
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();
    // await page.setViewport({ width: 1366, height: 768 });
    await page.goto(dataUrl);

    setInterval(async () => {
      const pageData = await page.evaluate(() => {
        const rows = document.querySelectorAll('.tb10Table');
        return Array.from(rows, (row) => {
          const columns = row.querySelectorAll('td');
          return Array.from(columns, (column) => column.innerText);
        });
      });

      const data = parseText(pageData[0]);
      const fObj = data[0];
      fObj.time = new Date().toISOString();
      io.emit('data', { data: fObj });

      process.stdout.write('.');
      //Sending data via socket server
    }, LOAD_INRERVAL);
  } catch (err) {
    console.log(err);
  }
};

main();
