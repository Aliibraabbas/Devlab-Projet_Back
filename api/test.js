// console.log('No value for FOO yet:', process.env);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
let value = process.env.api_key
console.log(value)
console.log('Now the value for FOO is:', process.env.api_key);
// api_key = process.env.api_key
// let trending = "https://api.themoviedb.org/3/movie/popular?api_key="+ api_key +"&language=fr-FR"