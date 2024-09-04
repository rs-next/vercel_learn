<template>
    <div class="post-list">
        <div v-for="post in posts" :key="post.id" class="post">
            <button @click="deletePost(post.id)" class="delete-button">
                X
            </button>
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <img
                v-if="post.image"
                :src="post.image"
                alt="Post Image"
                class="post-image"
            />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import axios from "axios";

const props = defineProps({
    posts: Array,
});

function deletePost(id) {
    if (confirm("Are you sure you want to delete this post?")) {
        axios
            .delete("/api/deletePost", { data: { id } })
            .then((response) => {
                alert("Post deleted successfully");
                const index = props.posts.findIndex((post) => post.id === id);
                if (index !== -1) {
                    props.posts.splice(index, 1);
                }
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    }
}
</script>

<style scoped>
.post-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
}
.delete-button {
    background-color: #905252;
    border: none;
    color: white;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
    float: right;
    transition: background-color 0.2s ease;
}

.delete-button:hover {
    background-color: #d83c3c;
}
</style>
