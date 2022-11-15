const { getTopArticles } = require("../main");
const assert = require("assert");

describe("getUserByEmail", () => {
  it("should return only one title if parameter is only one", async () => {
    const data = await getTopArticles(1);
    assert.equal(data.length, 1);
  });
  it("should return only the title with more comments", async () => {
    const n1Title = "UK votes to leave EU";
    const data = await getTopArticles(1);
    assert.equal(data[0], n1Title);
  });
  it("should return top 3 titles and no duplicates", async () => {
    const arr = [
      "UK votes to leave EU",
      "F.C.C. Repeals Net Neutrality Rules",
      "EU approves internet copyright law, including ‘link tax’ and ‘upload filter’",
    ];
    const data = await getTopArticles(3);
    expect(data).toEqual(expect.arrayContaining(arr));
  });
  it("should return all titles if there is no parameter", async () => {
    const data = await getTopArticles();
    expect(data.length).toBeTruthy();
  });
});
