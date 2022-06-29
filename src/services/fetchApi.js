const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const fetchApiFunction = () => fetch(ENDPOINT).then((response) => response
  .json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export default fetchApiFunction;
