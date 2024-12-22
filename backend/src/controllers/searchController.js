// import axios from 'axios';

// export const searchQuestion = async (req, res) => {
//   const { query } = req.body;

//   if (!query) {
//     return res.status(400).json({ success: false, message: 'Query is required' });
//   }
//   console.log("query from searchController.js: ", query); // query from OCRResult.jsx [frontend]

//   try {
//     const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
//     const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;
//     // console.log("apiKey: ", apiKey);

//     if (!query.trim()) {
//       return res.status(400).json({ success: false, message: 'Query cannot be empty or just whitespace' });
//     }
//     const capital = "what is capital of india";
//     const response = await axios.get(
//       `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}&num=10`
//     );
    
//     // console.log("response from searchController.js: ", response);

//     const results = response.data.items
//   ? response.data.items.map(item => ({
//       title: item.title,
//       link: item.link,
//       snippet: item.snippet,
//     }))
//   : [];

//     res.json({ success: true, results });
//   } catch (error) {
//     console.error("Error making search request:", {
//       message: error.message,
//       responseData: error.response?.data,
//       status: error.response?.status,
//       config: error.config,
//     });
//     res.status(500).json({ success: false, message: 'Search failed', error: error.message });
//   }
  
// };



import axios from 'axios';
import puppeteer from 'puppeteer';

export const searchQuestion = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Query is required' });
  }
  console.log("query from searchController.js: ", query); // query from OCRResult.jsx [frontend]

  try {
    if (!query.trim()) {
      return res.status(400).json({ success: false, message: 'Query cannot be empty or just whitespace' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=10`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    // Extract search results
    const results = await page.evaluate(() => {
      const searchItems = [];
      const searchResults = document.querySelectorAll('.tF2Cxc'); // Google's search result container

      searchResults.forEach((result) => {
        const titleElement = result.querySelector('h3');
        const linkElement = result.querySelector('a');
        const snippetElement = result.querySelector('.VwiC3b');

        if (titleElement && linkElement && snippetElement) {
          searchItems.push({
            title: titleElement.innerText,
            link: linkElement.href,
            snippet: snippetElement.innerText,
          });
        }
      });

      return searchItems;
    });

    await browser.close();

    res.json({ success: true, results });
  } catch (error) {
    console.error("Error making search request:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, message: 'Search failed', error: error.message });
  }
};
