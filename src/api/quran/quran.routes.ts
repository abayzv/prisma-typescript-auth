import express, { query } from "express";
import { isPermited, isAuthenticated } from "../../middlewares";
import { checkSchema, validationResult, matchedData } from "express-validator";
import * as cheerio from "cheerio";
import axios from "axios";
import puppeteer from "puppeteer";
import Cache from "node-cache";
import { getSurahByNumber, getAllQuran } from "./quran.services";

const router = express.Router();
const dataCache = new Cache({
  stdTTL: 60 * 60 * 24,
});

// // Get all logs
// router.get(
//   "/",
//   //   isAuthenticated,
//   //   isPermited,
//   //   checkSchema(rules),
//   async (req: any, res: any, next: any) => {
//     const surahNumber = req.params.surahNumber;
//     const from = req.query.from || 1;
//     const to = req.query.to || 1;

//     // scrape from cheerio
//     const url = `https://quran.kemenag.go.id/quran/per-ayat/surah/${surahNumber}?from=${from}&to=${
//       to + 1
//     }`;

//     // const response = await axios.get(url);
//     // const body = response.data;

//     // const $ = cheerio.load(body);

//     // const dataSurah = [] as any;
//     // const selectedElement = "div.card-surah > div.surah > div.surah-number";
//     // $(selectedElement).each((index, element) => {
//     //   console.log($(element).text());
//     // });

//     // scrape from puppeteer
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url, {
//       waitUntil: "networkidle2",
//     });
//     await page.setViewport({ width: 1920, height: 1080 });
//     await page.waitForSelector("div[id^='ayat-']");

//     const data = await page.$$eval('div[id^="ayat-"]', (elements) => {
//       return elements.map((element) => {
//         const surahNumber = element.querySelector(".surah-number")?.textContent;
//         const surahArabic = element.querySelector(".arabic")?.textContent;
//         return {
//           surahNumber,
//           surahArabic,
//         };
//       });
//     });

//     console.log(data);
//     await browser.close();

//     res.send({
//       message: "success",
//       data,
//     });
//   }
// );

// // Get all logs
// router.get(
//   "/surah/:surahNumber",
//   //   isAuthenticated,
//   //   isPermited,
//   //   checkSchema(rules),
//   async (req: any, res: any, next: any) => {
//     const surahNumber = req.params.surahNumber;
//     const from = req.query.from || 1;
//     const to = req.query.to || 1;

//     // if from > to then return error
//     if (from > to) return res.status(400).send({ message: "invalid range" });

//     const pad = (num: any, size: any) => {
//       var s = num + "";
//       while (s.length < size) s = "0" + s;
//       return s;
//     };

//     const memoryName = `https://quran.kemenag.go.id/quran/per-ayat/surah/${surahNumber}`;

//     if (dataCache.has(memoryName)) {
//       const data = dataCache.get(memoryName) as any;

//       const dataFilter = data.filter((item: any) => {
//         return item.surahNumber >= from && item.surahNumber <= to;
//       });

//       // if dataFilter length not equal to to - from + 1 then scrape again
//       if (dataFilter.length == to - from + 1) {
//         return res.status(200).send({
//           message: "success",
//           data: dataFilter,
//         });
//       }
//     }

//     // scrape from cheerio
//     const url = () => {
//       let url = `https://quran.kemenag.go.id/quran/per-ayat/surah/${surahNumber}?from=${from}&to=${10}`;
//       // if "to" less than 10, then set "to" to 10, if less than 20 then set "to" to 20, and so on
//       for (let i = 10; i <= to; i += 10) {
//         if (to < i) {
//           url = `https://quran.kemenag.go.id/quran/per-ayat/surah/${surahNumber}?from=${from}&to=${i}`;
//         }
//       }

//       return url;
//     };

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page
//       .goto(url(), {
//         waitUntil: "networkidle2",
//       })
//       .catch((err) => {
//         return res.status(500).send({
//           message: "failed to connect to server",
//         });
//       });
//     await page.setViewport({ width: 1920, height: 1080 }).catch((err) => {
//       return res.status(500).send({
//         message: "failed to connect to server",
//       });
//     });
//     await page.waitForSelector("div[id^='ayat-']").catch((err) => {
//       return res.status(500).send({
//         message: "failed to connect to server",
//       });
//     });

//     const data = await page
//       .$$eval('div[id^="ayat-"]', (elements) => {
//         return elements.map((element) => {
//           const surahNumber =
//             element.querySelector(".surah-number")?.textContent;
//           const surahArabic = element.querySelector(".arabic")?.textContent;
//           const surahText = element.querySelector(
//             "div[class='surah-translate gold']"
//           )?.textContent;
//           const surahTranslate = element.querySelector(
//             "div[class='surah-translate']"
//           )?.textContent;

//           return {
//             surahNumber,
//             surahArabic,
//             surahText,
//             surahTranslate,
//           };
//         });
//       })
//       .catch((err) => {
//         return res.status(500).send({
//           message: "failed to connect to server",
//         });
//       });

//     const dataWithAudio = data?.map((item: any, index: any) => {
//       const audio = `https://media.qurankemenag.net/audio/Abu_Bakr_Ash-Shaatree_aac64/00${surahNumber}${pad(
//         item.surahNumber,
//         3
//       )}.m4a`;
//       return {
//         ...item,
//         audio,
//       };
//     });

//     dataCache.set(memoryName, dataWithAudio);

//     await browser.close();

//     const dataFilter = dataWithAudio.filter((item: any) => {
//       return item.surahNumber >= from && item.surahNumber <= to;
//     });

//     res.status(200).send({
//       message: "success",
//       data: dataFilter,
//     });
//   }
// );

// Get all logs
router.get(
  "/",
  //   isAuthenticated,
  //   isPermited,
  //   checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const search = req.query.search;

    let data = getAllQuran();

    // if search is not empty then filter data
    if (search) {
      data = data.filter((item: any) => {
        return item.transliteration
          .toLowerCase()
          .includes(search.toLowerCase());
      });
    }

    res.send({
      message: "success",
      data,
    });
  }
);

router.get(
  "/surah/:surahNumber",
  //   isAuthenticated,
  //   isPermited,
  //   checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const surahNumber = +req.params.surahNumber;
    let start = req.query.start || 1;
    let limit = req.query.limit;

    const surah = getSurahByNumber(surahNumber);
    const { num_ayah } = surah;

    if (start > num_ayah) {
      return res.status(400).send({
        message: `Max ayah is ${num_ayah}`,
      });
    }

    const response = await axios.get(
      `https://web-api.qurankemenag.net/quran-ayah?start=${
        start - 1
      }&limit=${limit}&surah=${surahNumber}`
    );

    const surahData = {
      ...surah,
      ayahs: response.data.data.map((item: any) => {
        return {
          surah_id: item.surah_id,
          ayah: item.ayah,
          page: item.page,
          juz: item.juz,
          manzil: item.manzil,
          arabic: item.arabic,
          kitabah: item.kitabah,
          latin: item.latin,
          translation: item.translation,
          footnotes: item.footnotes,
        };
      }),
    };

    res.status(200).send({
      message: "success",
      test: "tests",
      data: surahData,
    });
  }
);

export default router;
