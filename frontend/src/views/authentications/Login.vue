<template>
  <div>
    <h1>ログイン</h1>
    <div>
      <div v-if="errorMessages">
        <div v-for="errorMessage in errorMessages" :key="errorMessage">
          {{ errorMessage }}
        </div>
      </div>
      <input type="email" v-model="user.email" name="user-email" placeholder="Eメール">
      <input type="password" v-model="user.password" name="user-password" placeholder="password">
      <button type="submit" @click="signIn">ログイン</button>
      <p><a href="/signUp">新規登録する</a></p>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();
const errorMessages = ref(null);

const user = reactive({
  email: null,
  password: null
});

const signIn = () => {
  axios
    .post('/auth/sign_in',{
      email: user.email,
      password: user.password
    })
    .then(response =>{
      localStorage.setItem("uid", response.headers["uid"]);
      localStorage.setItem('client', response.headers["client"]); 
      localStorage.setItem('access-token', response.headers["access-token"]);
      router.push({ name: "top" })
    })
    .catch(error =>{
      errorMessages.value = error.response.data.errors;
      console.error(error);
    })
}
</script>
