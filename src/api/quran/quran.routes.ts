import express, { query } from "express";
import { isPermited, isAuthenticated } from "../../middlewares";
import { checkSchema, validationResult, matchedData } from "express-validator";
import * as cheerio from "cheerio";
import axios from "axios";
import puppeteer from "puppeteer";

const router = express.Router();

// Validation Rules
const rules = {
  name: {
    optional: true,
  },
  action: {
    optional: true,
  },
  startDate: {
    optional: true,
    isDate: {
      errorMessage: "Start Date must be a valid date",
    },
  },
  endDate: {
    optional: true,
    isDate: {
      errorMessage: "End Date must be a valid date",
    },
  },
};

// Get all logs
router.get(
  "/",
  //   isAuthenticated,
  //   isPermited,
  //   checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const surahNumber = req.params.surahNumber;
    const from = req.query.from || 1;
    const to = req.query.to || 1;

    // scrape from cheerio
    const url = `https://quran.kemenag.go.id/quran/per-ayat/surah/${surahNumber}?from=${from}&to=${
      to + 1
    }`;

    // const response = await axios.get(url);
    // const body = response.data;

    // const $ = cheerio.load(body);

    // const dataSurah = [] as any;
    // const selectedElement = "div.card-surah > div.surah > div.surah-number";
    // $(selectedElement).each((index, element) => {
    //   console.log($(element).text());
    // });

    // scrape from puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForSelector("div[id^='ayat-']");

    const data = await page.$$eval('div[id^="ayat-"]', (elements) => {
      return elements.map((element) => {
        const surahNumber = element.querySelector(".surah-number")?.textContent;
        const surahArabic = element.querySelector(".arabic")?.textContent;
        return {
          surahNumber,
          surahArabic,
        };
      });
    });

    console.log(data);
    await browser.close();

    res.send({
      message: "success",
      data,
    });
  }
);

// Get all logs
router.get(
  "/surah/:surahNumber",
  //   isAuthenticated,
  //   isPermited,
  //   checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const surahNumber = req.params.surahNumber;
    const from = req.query.from || 1;
    const to = req.query.to || 1;

    const pad = (num: any, size: any) => {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };

    // scrape from cheerio
    const url = `https://quran.kemenag.go.id/quran/per-ayat/surah/${surahNumber}?from=${from}&to=${
      +to + 1
    }`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForSelector("div[id^='ayat-']");

    const data = await page.$$eval('div[id^="ayat-"]', (elements) => {
      return elements.map((element) => {
        const surahNumber = element.querySelector(".surah-number")?.textContent;
        const surahArabic = element.querySelector(".arabic")?.textContent;
        const surahText = element.querySelector(
          "div[class='surah-translate gold']"
        )?.textContent;
        const surahTranslate = element.querySelector(
          "div[class='surah-translate']"
        )?.textContent;

        return {
          surahNumber,
          surahArabic,
          surahText,
          surahTranslate,
        };
      });
    });

    const dataWithAudio = data.map((item: any, index: any) => {
      const audio = `https://media.qurankemenag.net/audio/Abu_Bakr_Ash-Shaatree_aac64/00${surahNumber}${pad(
        item.surahNumber,
        3
      )}.m4a`;
      return {
        ...item,
        audio,
      };
    });

    await browser.close();

    res.send({
      message: "success",
      data: dataWithAudio,
    });
  }
);

export default router;
