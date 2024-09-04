<template>
    <div id="app">
        <h1>Simple Board</h1>
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
    // 서버에서 받아온 새로운 게시물을 목록에 추가
    posts.value.unshift(post);
}

// 페이지 로드 시 게시물 불러오기
onMounted(async () => {
    try {
        const response = await axios.get("/api/getPosts");
        posts.value = response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});
</script>
