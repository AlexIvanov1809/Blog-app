import httpService from "./http.service";

const postEndpoint = "post/";

const postService = {
  createPost: async (payLoad) => {
    const { data } = await httpService.post(postEndpoint, payLoad);
    return data;
  },
  getPosts: async () => {
    const { data } = await httpService.get(postEndpoint);
    return data;
  },
  removePost: async (postId) => {
    const { data } = await httpService.delete(postEndpoint + postId);
    return data;
  },
  editPost: async (postId, payLoad) => {
    const { data } = await httpService.patch(postEndpoint + postId, payLoad);
    return data;
  }
};

export default postService;
