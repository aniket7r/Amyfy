// import puppeteer from 'puppeteer';

// export const translateText = async (ocrText) => {
//   try {
//     if (!ocrText.trim()) {
//       throw new Error('No text provided for translation');
//     }

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const googleTranslateUrl = 'https://translate.google.co.in/?sl=auto&tl=en&op=translate';

//     // Open the Google Translate page
//     await page.goto(googleTranslateUrl, { waitUntil: 'networkidle2' });

//     // Input the OCR text into the source textarea
//     const inputSelector = '/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/div/c-wiz/span/span/div/textarea';
//     const outputSelector = '/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz/div/div[6]';

//     await page.waitForXPath(inputSelector);
//     const inputElement = (await page.$x(inputSelector))[0];
//     await inputElement.type(ocrText, { delay: 100 });

//     // Wait for the translation to appear or timeout after 10 seconds
//     await page.waitForXPath(outputSelector, { timeout: 10000 }).catch(() => {
//       throw new Error('There is an internet problem or translation took too long');
//     });

//     // Extract the translated text
//     const outputElement = (await page.$x(outputSelector))[0];
//     const translatedText = await page.evaluate((el) => el.textContent, outputElement);

//     await browser.close();

//     return translatedText.trim();
//   } catch (error) {
//     console.error('Error during translation:', error.message);
//     return 'Translation failed. Please try again.';
//   }
// };




// import puppeteer from 'puppeteer';

// export const translateText = async (text) => {
//   if (!text) {
//     throw new Error("Text for translation cannot be empty.");
//   }

//   const url = "https://translate.google.co.in/?sl=auto&tl=en&op=translate";

//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.goto(url, { waitUntil: 'domcontentloaded' });

//     // Enter the OCR text in the input field
//     const inputSelector = "/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/div/c-wiz/span/span/div/textarea";
//     await page.waitForXPath(inputSelector);
//     const inputField = await page.$x(inputSelector);
//     await inputField[0].type(text, { delay: 50 });

//     // Wait for the translated text to appear
//     const outputSelector = "/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz/div/div[6]";
//     await page.waitForXPath(outputSelector, { timeout: 10000 }).catch(() => {
//       throw new Error("There is an internet problem or the translation took too long.");
//     });

//     const outputField = await page.$x(outputSelector);
//     const translatedText = await page.evaluate((el) => el.textContent, outputField[0]);

//     await browser.close();

//     return translatedText.trim();
//   } catch (error) {
//     console.error("Translation failed:", error.message);
//     throw new Error(error.message);
//   }
// };




// using css selectors

// import puppeteer from 'puppeteer';

// export const translateText = async (text) => {
//   if (!text) {
//     throw new Error("Text for translation cannot be empty.");
//   }

//   const url = "https://translate.google.co.in/?sl=auto&tl=en&op=translate";

//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.goto(url, { waitUntil: 'domcontentloaded' });

//     // Enter the OCR text in the input field
//     const inputSelector = '#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > div > c-wiz > span > span > div > textarea';
//     await page.waitForSelector(inputSelector);
//     await page.type(inputSelector, text, { delay: 50 });

//     // Wait for the translated text to appear
//     const outputSelector = '#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz > div';
//     await page.waitForSelector(outputSelector, { timeout: 10000 });

//     const translatedText = await page.$eval(outputSelector, (el) => el.textContent);

//     await browser.close();

//     return translatedText.trim();
//   } catch (error) {
//     console.error("Translation failed:", error.message);
//     throw new Error(error.message);
//   }
// };






export const translateText = async (text, sourceLang = 'si', targetLang = 'en') => {
  if (!text) {
    throw new Error('Text for translation cannot be empty.');
  }

  try {
    // Construct the API URL with valid source and target language codes
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${sourceLang}|${targetLang}`;

    // Fetch translation from the API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch translation. Status: ${response.status}`);
    }

    const data = await response.json();

    // Check for valid translation response
    if (!data.responseData || !data.responseData.translatedText) {
      throw new Error('No valid translation found in the response.');
    }

    return data.responseData.translatedText.trim();
  } catch (error) {
    console.error('Translation failed:', error.message);
    throw new Error(error.message);
  }
};
