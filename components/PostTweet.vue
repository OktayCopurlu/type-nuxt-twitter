<template>
  <div>
    <h3>Create a new Tweet</h3>
    <form @submit.prevent="formHandler">
      <input
        type="text"
        name="title"
        id="title"
        v-model="title"
        required
        maxlength="20"
        placeholder="title"
      />
      <textarea
        placeholder="tweet"
        name="tweet"
        id="tweet"
        required
        v-model="tweet"
        rows="6"
        maxlength="250"
      />
      <button
        :disabled="isFormValid"
        :class="[isFormValid ? '' : 'ready-button', 'button']"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "@nuxtjs/composition-api";
import { usePostTweet } from "../store/tweet";
import { state } from "../store/index";

export default defineComponent({
  setup() {
    const title = ref<string>("");
    const tweet = ref<string>("");
    const isFormValid = ref<boolean>(true);

    const { postTweet } = usePostTweet();

    watch(tweet, () => {
      if (title.value !== null && tweet.value !== null) {
        isFormValid.value = false;
      } else {
        isFormValid.value = true;
      }
    });

    const formHandler = () => {
      if (state.usernameL && state.userId) {
        postTweet(title.value, tweet.value, state.usernameL, state.userId);
      }
    };

    return {
      formHandler,
      isFormValid,
      title,
      tweet,
    };
  },
});
</script>

<style lang="sass" scoped>
$tablet: 768px
form
  display: flex
  flex-direction: column
  width: 30rem
  padding: 2rem
  box-shadow: (1px 1px 5px gray)
  border-radius: 8px
  margin: auto
  background-color: LightGray
  @media (max-width: $tablet)
    width: 100%
    border-radius: 0px
    box-shadow: none
    margin-left: 0
    margin-right: 0
  *
    padding: .5rem
    margin: 0.4rem
    outline: 0
    font-family: ("Times New Roman", Times, serif)
    font-size: 1.2rem
  .button
    background-color: gray
    color: white
    padding: .8rem
    border: 0
  .ready-button
    background-color: green
    transition: all 1s ease
    cursor: pointer
    &:hover
      background-color: limegreen
      transition: all 0.5s linear
</style>