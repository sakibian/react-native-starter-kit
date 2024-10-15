import axios from "axios";

const postApi = {
  getAllPosts: () => {
    return axios.get("/api/posts");
  },
  // Other post-related methods can be added here
};

export default postApi;
