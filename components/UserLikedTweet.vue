<template>
  <div>
    <ul v-if="tweets.length > 0">
      <h3>I like these tweets</h3>
      <li v-for="tweet in tweets" :key="tweet._id">
        <div>
          <strong>{{ tweet.title }}</strong>
          <span>{{ tweet.username }}</span>
        </div>
        <p class="text">{{ tweet.text }}</p>
      </li>
    </ul>
    <h3 v-else>You have no liked tweet</h3>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref } from "@nuxtjs/composition-api";
import { state } from "../store/index";
import { useUserTweets } from "../store/tweet";

export default defineComponent({
  setup() {
    const { userLikedTweets } = useUserTweets();

    if (state.userId) {
      const _id: Ref<string> = ref(state.userId);
      userLikedTweets(_id.value);
    }

    const tweets = state.userLikedTweets;

    return { tweets };
  },
});
</script>

<style lang="sass" scoped>
$tablet: 768px

ul
  width: 30rem
  margin: auto
  @media (max-width: $tablet)
    width: 100%
    margin: 0
    padding: 0
li
  list-style: none
  margin-bottom: 1rem
  div
    display: flex
    justify-content: space-between
    padding: 1rem 2rem
    background-color: LightGray
.text
  text-align: start
  padding: 2rem
  background-color: CadetBlue
  margin: 0
  color: white
</style>