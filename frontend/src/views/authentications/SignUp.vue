<template>
  <div>
    <h1>ユーザー登録</h1>
    <form @submit.prevent>
      <div v-if="errorMessages">
        <div v-for="errorMessage in errorMessages" :key="errorMessage">
          <div>{{ errorMessage }}</div>
        </div>
      </div>
      <div>
        <label for="user-name">名前</label>
        <input type="text" id="user-name" v-model="user.name" placeholder="name">
      </div>
      <div>
        <label for="user-email">メールアドレス</label>
        <input type="email" id="user-email" v-model="user.email" placeholder="email">
      </div>
      <div>
        <label for="user-password">パスワード</label>
        <input type="password" id="user-password" v-model="user.password" placeholder="password">
      </div>
      <div>
        <label for="user-password-confirmation">パスワード再確認</label>
        <input type="password" id="user-password-confirmation" v-model="user.password_confirmation" placeholder="password">
      </div>
      <a href="/">ログイン画面に戻る</a>
      <button type="submit" @click="signUp">登録する</button>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const errorMessages = ref(null);

const user = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: ''
});

const signUp = () => {
  axios
    .post('/auth',{
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    })
    .then(response => {
      router.push({ name: "login" });
    })
    .catch(error => {
      errorMessages.value = error.response.data.errors.full_messages;
      console.error(error);
    })
}
</script>
