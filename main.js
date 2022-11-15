const axios = require("axios");

const topArticles = (limit) => {
  const topTitles = [];
  async function downloadAllArticles() {
    let articles = [];
    let page = 0;
    let totalPages = 0;

    do {
      let { data: response } = await axios.get(
        `https://jsonmock.hackerrank.com/api/articles?page=${page++}`
      );
      totalPages = response.total_pages;
      console.log(
        `downloadarticles: page ${page} of ${totalPages} downloaded...`
      );
      articles = articles.concat(response.data);
      console.log("articles.length:", articles.length);
    } while (page < totalPages);

    console.log("downloadarticles: download complete.");

    return articles;
  }

  return downloadAllArticles()
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

      for (const title of data) {
        if (topTitles.length >= limit) {
          return topTitles;
        }

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
    })
    .catch((err) => {
      console.log(err);
    });
};
topArticles(10).then((data) => console.log(data));
