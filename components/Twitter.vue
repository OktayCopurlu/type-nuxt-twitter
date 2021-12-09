<template>
  <div>
    <h3>Tweets</h3>
    <ul>
      <li v-for="tweet in tweets" :key="tweet._id">
        <div>
          <strong>{{ tweet.title }}</strong>
          <span>{{ tweet.username }}</span>
        </div>
        <div class="text">
          {{ tweet.text
          }}<i
            :id="tweet._id"
            @click="liked(tweet)"
            :class="[tweet.likes > 0 ? 'like' : '', 'fas fa-heart']"
          ></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent } from "@nuxtjs/composition-api";
import { useGetTweet, likeTweet } from "../store/tweet";
import { state } from "../store/index";

export default defineComponent({
  setup() {
    const { getTweets } = useGetTweet();
    getTweets();
    const tweets = computed(() => state.tweets);
    const { addLike, unLike } = likeTweet();
    const liked = (e: { _id: string; likes: number }) => {
      const _id = e._id;
      if (e.likes > 0 && state.usernameL) {
        unLike(_id, state.usernameL);
      } else if (e.likes < 1 && state.usernameL) {
        addLike(_id, state.usernameL);
      }
    };

    return {
      tweets,
      liked,
    };
  },
});
</script>

<style lang="sass" scoped>
$tablet: 768px

h3
  text-align: center

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
i
  cursor: pointer
  color: white
.like
  color: red
</style>