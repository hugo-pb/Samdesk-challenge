// function // parasm limit number //return top name articles
// alp  dec comment count// dec alph (if same comment count)
const axios = require("axios");

const topArticles = (limit) => {
  // make a request to Api/multiple request to get all pages
  axios
    .get("https://jsonmock.hackerrank.com/api/articles?page=1")
    .then((res) => console.log(res.data));

  // query response in comment dec (most comments on top) if there is a tie
  // query aph order

  //  top names of articles First get the article name.
  //     If the title field is not null, use title.
  //     Otherwise, if the story_title field is not null, use story_title.
  //     If both fields are null, ignore the article.
  // Sort the titles decreasing by comment count, then decreasing alphabetically by article name if there is a tie in comments count. Return a list of the top limit names.
};
topArticles();
