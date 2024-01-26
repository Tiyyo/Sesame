

export default class ProductsService {
  async get() {
    const fetchData = await fetch('https://cdn.builder.io/api/v3/content/articles?apiKey=6e139f4f71454a88b3f01ee85b1a35b5', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .catch((err) => ({ error: 'Could not retrieve products from ProductsService.get' + err, status: 404 }));

    return fetchData.results[0].data.articles

  }
}