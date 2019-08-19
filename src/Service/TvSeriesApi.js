export function getCategories () {
    const url = 'http://localhost:8080/api/categories';
    return fetch(url)
      .then(response => response.json());
}