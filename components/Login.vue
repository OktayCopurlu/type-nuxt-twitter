<template>
  <form @submit.prevent="formHandler">
    <label for="username">Username</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="username"
      required
      placeholder="username"
    />
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      v-model="userEmail"
      required
      placeholder="email"
    />
    <label for="password">Password</label>
    <input
      required
      type="password"
      name="password"
      id="password"
      placeholder="password"
      v-model="userPassword"
    />
    <button
      :disabled="isFormValid"
      :class="[isFormValid ? '' : 'ready-button', 'button']"
    >
      {{ haveAccount ? "Login" : "Register" }}
    </button>

    <a v-if="haveAccount" href="#" @click="register">Create new account</a>
    <a v-else href="#" @click="login">Login</a>
  </form>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from "@nuxtjs/composition-api";
import { useLogin } from "../store/user";

export default defineComponent({
  setup() {
    const username = ref<string>("");
    const userPassword = ref<string>("");
    const userEmail = ref<string>("");
    const haveAccount = ref<boolean>(true);
    const isFormValid = ref<boolean>(true);
    const { getLogin, getRegister } = useLogin();

    const register = () => {
      haveAccount.value = false;
    };
    const login = () => {
      haveAccount.value = true;
    };
    watch(userPassword, () => {
      if (
        userEmail.value !== null &&
        userPassword.value !== null &&
        username !== null
      ) {
        isFormValid.value = false;
      } else {
        isFormValid.value = true;
      }
    });
    const formHandler = () => {
      if (haveAccount.value) {
        getLogin(username.value, userPassword.value, userEmail.value);
      } else {
        getRegister(username.value, userPassword.value, userEmail.value);
      }
    };
    return {
      formHandler,
      login,
      register,
      username,
      userPassword,
      userEmail,
      haveAccount,
      isFormValid,
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
  label
    text-align: start
    color: black
    margin-bottom: 0
  .button
    background-color: gray
    color: white
    padding: .8rem
    border: 0
  .ready-button
    cursor: pointer
    background-color: green
    transition: all 1s ease
    &:hover
      background-color: limegreen
      transition: all 0.5s linear
</style>

