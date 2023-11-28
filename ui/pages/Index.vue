<template>
  <div>
    <div>
      <div>
        <img
          style="
            display: block;
            margin-left: auto;
            margin-right: auto;
            height: 120px;
          "
          src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/375px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png?20210110184431"
        />
      </div>
      <div class="text-center p-8" style="font-size: 20px; font-weight: bold">
        Phần mềm nhận diện ký tự quang học
      </div>
    </div>
    <div v-show="!hasResult" class="flex items-center justify-center w-full">
      <div style="width: 50%">
        <label
          for="file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <div v-if="!hasFile">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-center text-xs text-gray-500 dark:text-gray-400">
                DOC, DOCX, PDF, XLS, XLSX, PPT, PPTX, PNG, JPG
                <br />(Max size 100MB)
              </p>
            </div>
            <div v-if="hasFile">
              <p style="font-size: 20px">Filename: {{ filename }}</p>
              <p style="font-size: 20px">Size: {{ fileSize }}</p>
            </div>
          </div>
          <input
            id="file"
            name="file"
            type="file"
            class="hidden"
            @change="onFileChanged($event)"
          />
        </label>
      </div>
    </div>

    <div class="text-center m-5">
      <ButtonBaseComponent
        v-if="hasFile"
        v-show="!hasResult"
        size="lg"
        @click="submit"
      >
        Convert
      </ButtonBaseComponent>
      <ButtonBaseComponent v-show="hasResult" size="lg" @click="refreshPage">
        Try a new one
      </ButtonBaseComponent>
    </div>

    <div v-if="hasResult" class="grid grid-cols-3 gap-4">
      <div class="my-card">
        <p class="my-title">Input</p>
        <div>
          <img :src="inputImgSrc" />
        </div>
      </div>
      <div class="my-card">
        <p class="my-title">Output</p>
        <div>
          <img :src="outputImgSrc" />
        </div>
      </div>
      <div class="my-card">
        <p class="my-title">Text extraction</p>

        <div
          v-for="(extraction, index) in textExtraction"
          :key="index"
          style="padding-bottom: 15px"
        >
          <p class="font-bold">Box {{ extraction.symbol }}</p>
          <p>Text: {{ escapeSpecialCharacters(extraction.text) }}</p>
          <p>Height: {{ extraction.h }}</p>
          <p>Width: {{ extraction.w }}</p>
          <p>X: {{ extraction.x }}</p>
          <p>Y: {{ extraction.y }}</p>
        </div>

        <!-- <div>
          <p>Response: {{ response }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const hasFile = ref(false);
const hasResult = ref(false);
const response = ref('');
const filename = ref('');
const fileSize = ref('');

const inputImgSrc = ref('');
const outputImgSrc = ref('');
const textExtraction = ref<
  {
    scale: number;
    symbol: string;
    text: string;
    text_x: number;
    text_y: number;
    thickness: number;
    w: number;
    h: number;
    x: number;
    y: number;
  }[]
>([]);

const submitFile = ref<File | null>();
const form = ref<HTMLFormElement>();

const onFileChanged = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    submitFile.value = event.target.files[0];
    filename.value = event.target.files[0].name;

    const sizeInMB = event.target.files[0].size / 1024 / 1024;
    fileSize.value = `${sizeInMB.toFixed(2)} MB`;
    hasFile.value = true;
  } else {
    submitFile.value = null;
    hasFile.value = false;
  }
};

const escapeSpecialCharacters = (inputString: string): string => {
  // Sử dụng hàm replace cùng với regular expressions để thay thế các ký tự đặc biệt
  return inputString.replace(/\n/g, '\\n').replace(/\f/g, '\\f');
};

const refreshPage = () => {
  window.location.reload();
};

const submit = async () => {
  if (submitFile.value) {
    try {
      const formData = new FormData();
      formData.append(
        'file',
        submitFile.value,
        '/C:/Users/zingfeng/Desktop/sample.pdf',
      );

      const data = await fetch('http://localhost:8000/converter/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          hasResult.value = true;
          response.value = result;

          try {
            result = JSON.parse(result);
          } catch (e) {
            console.log(e);
          }
          inputImgSrc.value = result?.imagePath;
          textExtraction.value = result?.extraction;

          const first = result?.extraction?.[0]?.output_path;
          outputImgSrc.value = first;
        })
        .catch((error) => console.log('error', error));
      console.log(data);
    } catch (error) {
      console.error(error);
      form.value?.reset();
      submitFile.value = null;
    } finally {
      //
    }
  }
};
</script>
<style scoped>
.my-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;
}

.my-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.my-card img {
  width: 100%;
}
</style>
