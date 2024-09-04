<script setup>
import { ref } from "vue";
import axios from "axios";
import { defineEmits } from "vue"; // emit 사용

const title = ref("");
const content = ref("");
const imageUrl = ref("");
let selectedFile = null;

const emit = defineEmits(["post-submitted"]); // emit 선언

function onFileChange(event) {
    selectedFile = event.target.files[0];
}

async function submitPost() {
    try {
        let newPost = {
            title: title.value,
            content: content.value,
        };

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
                newPost.image = imageUrl.value;

                const postResponse = await axios.post("/api/savePost", newPost);
                emit("post-submitted", postResponse.data); // 부모 컴포넌트에 이벤트 전송
                resetForm();
            };
            reader.readAsDataURL(selectedFile);
        } else {
            const postResponse = await axios.post("/api/savePost", newPost);
            emit("post-submitted", postResponse.data); // 부모 컴포넌트에 이벤트 전송
            resetForm();
        }
    } catch (error) {
        console.error("Error saving post:", error);
    }
}

function resetForm() {
    title.value = "";
    content.value = "";
    imageUrl.value = "";
    selectedFile = null;
}
</script>
