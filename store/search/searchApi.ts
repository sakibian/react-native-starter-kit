import axios from "axios";

const searchApi = {
  search: (query) => {
    return axios.get(`/api/search?q=${query}`);
  },
  // Other search-related methods can be added here
};

export default searchApi;
