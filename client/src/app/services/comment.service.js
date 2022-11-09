import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
  createComment: async (payLoad) => {
    const { data } = await httpService.post(commentEndpoint, payLoad);
    return data;
  },
  getComments: async (postId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: "postId",
        equalTo: `${postId}`
      }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId);
    return data;
  }
};

export default commentService;
