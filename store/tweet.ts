import {
  CREATE_TWEET,
  GET_ALL_TWEETS,
  GET_USER_TWEETS,
  ADD_LIKE_TWEET,
  UN_LIKE_TWEET,
  GET_USER_LIKED_TWEETS,
} from "./request";
import { useRouter, useContext, ref } from "@nuxtjs/composition-api";
import { TweetType } from "./types";
import { state } from "./index";

export function usePostTweet(): {
  postTweet(
    title: string,
    text: string,
    username: string,
    user: string
  ): Promise<void>;
} {
  const context = useContext();
  const router = useRouter();
  const client = context.app.apolloProvider.defaultClient;
  const postTweet = async (
    title: string,
    text: string,
    username: string,
    user: string
  ) => {
    const payload = {
      title,
      text,
      username,
      user,
    };
    try {
      await client.mutate({
        mutation: CREATE_TWEET,
        variables: payload,
      });
      await router.push("/twitter");
    } catch (error) {
      console.error(error);
    }
  };
  return {
    postTweet,
  };
}
export function useGetTweet() {
  const context = useContext();
  const client = context.app.apolloProvider.defaultClient;
  const tweets = ref<TweetType[]>([]);
  const getTweets = async () => {
    try {
      const response = await client.query({
        query: GET_ALL_TWEETS,
        fetchPolicy: "network-only",
      });
      const data = await response.data.getTweets.sort(
        (a: TweetType, b: TweetType) => b.createdAt - a.createdAt
      );
      state.tweets = [...data];
      tweets.value = data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getTweets,
    tweets,
  };
}
export function likeTweet(): {
  addLike(_id: string, username: string): Promise<void>;
  unLike(_id: string, username: string): Promise<void>;
} {
  const context = useContext();
  const client = context.app.apolloProvider.defaultClient;
  const { getTweets } = useGetTweet();

  const addLike = async (_id: string, username: string) => {
    const payload = {
      _id,
      username,
    };
    try {
      await client.mutate({
        mutation: ADD_LIKE_TWEET,
        variables: payload,
      });
      await getTweets();
    } catch (error) {
      console.error(error);
    }
  };
  const unLike = async (_id: string, username: string) => {
    const payload = {
      _id,
      username,
    };
    try {
      await client.mutate({
        mutation: UN_LIKE_TWEET,
        variables: payload,
      });
      await getTweets();
    } catch (error) {
      console.error(error);
    }
  };
  return { addLike, unLike };
}

export function useUserTweets(): {
  getUserTweets(_id: string): Promise<void>;
  userLikedTweets(_id: string): Promise<void>;
} {
  const context = useContext();
  const client = context.app.apolloProvider.defaultClient;

  const getUserTweets = async (_id: string) => {
    let payload = {
      _id,
    };
    try {
      const response = await client.query({
        query: GET_USER_TWEETS,
        variables: payload,
        fetchPolicy: "network-only",
      });
      const tweets = response.data.getUserTweets.sort(
        (a: TweetType, b: TweetType) => b.createdAt - a.createdAt
      );
      state.userTweets = [...tweets];
    } catch (error) {
      console.error(error);
    }
  };
  const userLikedTweets = async (_id: string) => {
    let payload = {
      _id,
    };
    try {
      const response = await client.query({
        query: GET_USER_LIKED_TWEETS,
        variables: payload,
        fetchPolicy: "network-only",
      });
      const tweets = response.data.getUserLikedTweets.sort(
        (a: TweetType, b: TweetType) => b.createdAt - a.createdAt
      );
      state.userLikedTweets = [...tweets];
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    getUserTweets,
    userLikedTweets,
  };
}
