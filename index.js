const puppeteer = require('puppeteer')
const express = require('express')
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://lobste.rs/recent', { waitUntil: 'networkidle2' });
  const pdf = await page.pdf({ format: 'A4' });
 
  await browser.close();
  return pdf
}

const app = express()

app.get('/', (req, res) => {
  printPDF().then(pdf => {
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    res.send(pdf)
  })
})

app.listen(process.env.PORT || 3000)
