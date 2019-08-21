export function getCategories () {
    const url = 'http://localhost:8080/api/categories';
    return fetch(url)
      .then(response => response.json());
}

export function findAllTvSeries(){
  const url = 'http://localhost:8080/api/tvseries';
  // const url = 'https://api.myjson.com/bins/qp5vv';
  return fetch(url)
      .then(response => response.json())
}

export function findTvSeriesByTitle(search){
  const url = 'http://localhost:8080/api/tvseries/' + search;
  return fetch(url)
    .then(response => response.json())
}
export function deleteTvSeries(id){
  const url = 'http://localhost:8080/api/tvseries/'+id;
  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(respond => respond.text());
}
export function saveOrUpdateTvSeries(tvSeries){
  const url = 'http://localhost:8080/api/tvseries';
  let method = 'POST';
  if (tvSeries.id.length !== 0){
    method = 'PUT';
  }
  return fetch(url, {
    method: method,
    body: JSON.stringify(tvSeries), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' }
  })
    .then(respond => respond.json());
}

// export function saveTvSeries(newTvSeries){
//   const url = 'http://localhost:8080/api/tvseries';
//     return fetch(url, {
//       method: 'POST', // or 'PUT'
//       // mode: 'cors',
//       body: JSON.stringify(newTvSeries), // data can be `string` or {object}!
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(respond => respond.json());
// }

// export function updateTvSeries(tvSeries) {
//   const url = 'http://localhost:8080/api/tvseries';
//     return fetch(url, {
//       method: 'PUT', // or 'PUT'
//       // mode: 'cors',
//       body: JSON.stringify(tvSeries), // data can be `string` or {object}!
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(respond => respond.json())
// }