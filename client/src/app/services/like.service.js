import httpService from "./http.service";

const likeEndpoint = "like/";

const likeService = {
  getLikes: async () => {
    const { data } = await httpService.get(likeEndpoint);
    return data;
  },
  editLike: async (likeId, payLoad) => {
    const { data } = await httpService.patch(likeEndpoint + likeId, payLoad);
    return data;
  }
};

export default likeService;
