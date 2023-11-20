<template>
  <div> 
    <h1>トップ</h1>
    <div v-if="currentUser">
      <div>ようこそ！{{currentUser.email}}さん!</div>
      <button type="button" @click="signOut">ログアウト</button>
    </div>
    <div v-else>
      <div>ログインしてください</div>
      <a href="/">ログイン画面へ</a>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from "vue";
import axios from "axios";

const router = useRouter();
const currentUser = ref({});

onMounted(() =>{
  getCurrentUser();
});

const getCurrentUser = () => {
  axios
    .get('/current_user',
    {
      headers: {
        uid: localStorage.getItem("uid"),
        'access-token': localStorage.getItem('access-token'),
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
  .delete('/auth/sign_out',
    {
      headers: {
        uid: localStorage.getItem("uid"),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem("client")
      }
    })
    .then(() => {
      localStorage.removeItem("uid");
      localStorage.removeItem("access-token");
      localStorage.removeItem("client");
      router.push({ name: "login" });
    })
    .catch(error => {
      console.error(error);
    })
};

</script>
