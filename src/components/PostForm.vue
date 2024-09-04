<template>
    <div class="post-form">
        <form @submit.prevent="submitPost">
            <input v-model="title" type="text" placeholder="Title" required />
            <textarea
                v-model="content"
                placeholder="Content"
                required
            ></textarea>
            <input type="file" @change="onFileChange" />
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const title = ref("");
const content = ref("");
const imageUrl = ref("");
let selectedFile = null;

function onFileChange(event) {
    selectedFile = event.target.files[0];
}

async function submitPost() {
    try {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64Image = reader.result.split(",")[1];
                const filename = `${Date.now()}-${selectedFile.name}`;

                const response = await axios.post("/api/uploadImage", {
                    image: base64Image,
                    filename: filename,
                });
                imageUrl.value = response.data.url;

                const newPost = {
                    title: title.value,
                    content: content.value,
                    image: imageUrl.value,
                };

                await axios.post("/api/savePost", newPost);
                title.value = "";
                content.value = "";
                imageUrl.value = "";
                selectedFile = null;
            };
            reader.readAsDataURL(selectedFile);
        } else {
            const newPost = {
                title: title.value,
                content: content.value,
            };

            await axios.post("/api/savePost", newPost);
            title.value = "";
            content.value = "";
        }
    } catch (error) {
        console.error("Error saving post:", error);
    }
}
</script>
