<template>
    <div id="app">
        <h1>방명록이다 욘석들아</h1>
        <PostForm @post-submitted="addPost" />
        <PostList :posts="posts" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";

const posts = ref([]);

function addPost(post) {
    posts.value.unshift(post);
}

// 게시물을 Vercel Postgres에서 불러오기
onMounted(async () => {
    try {
        const response = await axios.get("/api/getPosts");
        posts.value = response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});
</script>
