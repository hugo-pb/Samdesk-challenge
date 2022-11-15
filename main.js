// function // parasm limit number //return top name articles
// alp  dec comment count// dec alph (if same comment count)
const axios = require("axios");

const topArticles = (limit) => {
  // make a request to Api/multiple request to get all pages
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

  // query response in comment dec (most comments on top) if there is a tie
  // query aph order

  //  top names of articles First get the article name.
  //     If the title field is not null, use title.
  //     Otherwise, if the story_title field is not null, use story_title.
  //     If both fields are null, ignore the article.
  // Sort the titles decreasing by comment count, then decreasing alphabetically by article name if there is a tie in comments count. Return a list of the top limit names.

  downloadAllArticles()
    .then((data) => {
      console.log(data);

      console.log(
        "sorted data",
        data.sort((a, b) => {
          let n = a.num_comments - b.num_comments;
          if (n !== 0) {
            return n;
          }
          return a.title - b.title;
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
topArticles();
