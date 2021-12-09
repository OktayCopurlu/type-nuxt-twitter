<template>
  <div>
    <nav id="nav">
      <ul>
        <nuxt-link to="/user-page/user-tweets">My Tweets</nuxt-link>
        |
        <nuxt-link to="/user-page/user-liked-tweets">Liked Tweets</nuxt-link>
      </ul>
    </nav>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "@nuxtjs/composition-api";
import { useUserTweets } from "../store/tweet";
import { state } from "../store/index";
export default defineComponent({
  setup() {
    const { getUserTweets, userLikedTweets } = useUserTweets();
    if (state.userId) {
      getUserTweets(state.userId);
      userLikedTweets(state.userId);
    }
  },
});
</script>
