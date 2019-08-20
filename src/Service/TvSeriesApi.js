export function getCategories () {
    const url = 'http://localhost:8080/api/categories';
    return fetch(url)
      .then(response => response.json());
}

export function findTvSeriesByTitle(search){
  const url = 'http://localhost:8080/api/tvseries/' + search;
  return fetch(url)
    .then(response => response.json())
}

export function saveTvSeries(newTvSeries){
  const url = 'http://localhost:8080/api/tvseries';
    return fetch(url, {
      method: 'POST', // or 'PUT'
      // mode: 'cors',
      body: JSON.stringify(newTvSeries), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' }
    })
      .then(respond => respond.json());
}

export function updateTvSeries(tvSeries) {
  const url = 'http://localhost:8080/api/tvseries';
    return fetch(url, {
      method: 'PUT', // or 'PUT'
      // mode: 'cors',
      body: JSON.stringify(tvSeries), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' }
    })
      .then(respond => respond.json())
}