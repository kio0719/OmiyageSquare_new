<template>
  <div>
    <h1>Top</h1>
    <div v-if="currentUser">
      <p>ようこそ!{{ currentUser.email }}さん！</p>
      <button type="button" @click="signOut">ログアウト</button>
    </div>
    <div v-else>
      <p>ログインしてください</p>
      <a href="/">ログイン画面へ</a>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentUser = ref();

onMounted(() => {
  getCurrentUser()
})

const getCurrentUser = () => {
  axios
    .get('/current_user',{
      headers: {
        uid: localStorage.getItem("uid"),
        'access-token': localStorage.getItem("access-token"),
        client: localStorage.getItem("client")
      }
    })
    .then(response => {
      currentUser.value = response.data;
    })
    .catch(error => {
      console.error(error);
    })
}

const signOut = () => {
  axios
    .delete('/auth/sign_out',{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client:  localStorage.getItem("client")
      }
    })
    .then(response => {
      localStorage.removeItem('uid');
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      router.push({ name: "login" });
    })
    .catch(error => {
      console.error(error);
    })
}
</script>
