const axios = require("axios");

// Get all articles // Helper Function
async function downloadAllArticles() {
  let articles = [];
  let page = 0;
  let totalPages = 0;

  do {
    let { data: response } = await axios.get(
      `https://jsonmock.hackerrank.com/api/articles?page=${page++}`
    );

    totalPages = response.total_pages;
    articles = articles.concat(response.data);
  } while (page < totalPages);

  return articles;
}

const getTopArticles = (limit) => {
  const topTitles = [];

  return (
    downloadAllArticles()
      // sort articles //
      .then((data) => {
        data
          .sort((a, b) => {
            let n = a.num_comments - b.num_comments;
            if (n !== 0) {
              return n;
            }
            return a.title - b.title;
          })
          .reverse();

        // add to the list of top titles //
        for (const title of data) {
          if (topTitles.length >= limit) {
            return topTitles;
          }
          // filter duplicates //
          if (
            title.title === topTitles[topTitles.length - 1] ||
            title.story_title === topTitles[topTitles.length - 1]
          ) {
            continue;
          }

          if (title.title) {
            topTitles.push(title.title);
            continue;
          }

          if (title.story_title) {
            topTitles.push(title.story_title);
            continue;
          }
        }
        return topTitles;
      })
      .catch((err) => {
        console.log("oops something went wrong", err);
      })
  );
};

module.exports = { getTopArticles, downloadAllArticles };
