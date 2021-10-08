import axios from "axios";

/**
 *Takes in an array of urls then fetches everything and combines the results
 * @param {Array} urls
 * @returns {Promise} Promise object represents the sum of a and b
 */
export const makeMultipleRequestsAndCombineResults = urls => {
    if (!urls || !Array.isArray(urls)) return;
    const requests = urls.map(url => axios.get(url));

    return axios
        .all(requests)
        .then(responses => responses.map(response => response.data))
        .catch(err => err);
};
