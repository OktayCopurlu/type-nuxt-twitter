import { reactive } from "@nuxtjs/composition-api";
import { TweetType } from "../store/types";

export const state = reactive({
  tweets: <TweetType[]>[],
  userLikedTweets: <TweetType[]>[],
  usernameL: <string | null>null,
  userId: <string | null>null,
  token: <string | null>null,
  userTweets: <TweetType[]>[],
});
