const findArticle = (articles: any, slug: string) => {
  const article = articles.find((article: any) => article.slug === slug);
  return article;
};

const getPrevArticle = (articles: any, slug: string) => {
  const index = articles.findIndex((article: any) => article.slug === slug);
  const prevArticle = index > 0 ? articles[index - 1] : false;
  return prevArticle;
};

const getNextArticle = (articles: any, slug: string) => {
  const index = articles.findIndex((article: any) => article.slug === slug);
  const nextArticle = index < articles.length -1 ? articles[index + 1] : false;
  return nextArticle;
};

async function getArticles(id: string = "") {
  const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/insights";
  let data = await fetch(url);
  let result = await data.json();
  const articles: any = result.data.blog;
  if (id) {
    const article = findArticle(articles, id);
    const prevArticle = getPrevArticle(articles, id);
    const nextArticle = getNextArticle(articles, id);
    return { article, prevArticle, nextArticle };
  }
  return result;
}

export { getArticles };
