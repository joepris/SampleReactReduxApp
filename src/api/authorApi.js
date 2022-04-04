import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  //fetch is built in modern browsers. It is a promised based api
  return fetch(baseUrl)
    //then is called when promise is resolved
    .then(handleResponse)
    //catch is then called when error occurs
    .catch(handleError);
}
