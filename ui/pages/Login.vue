<script lang="ts" setup>
import { useGoogleLogin } from '~~/composables/user/login';
import { User } from '~~/utils/app';
import { ResponseDto, ResponseStatusCode } from '~~/types/common';

const router = useRouter();
const user = useCookie('user');
const accessToken = useCookie('accessToken');

const isLoading = ref(false);
const hasError = ref(false);

const callback = async (response: {
  clientId?: string;
  credential: string;
}) => {
  hasError.value = false;
  isLoading.value = true;
  const { data } = await useGoogleLogin({
    token: response.credential,
  });
  isLoading.value = false;

  const res = data.value as ResponseDto;
  if (res.status === ResponseStatusCode.SUCCESS) {
    // Set user data
    const userData = res.data as User;
    user.value = userData as any;
    accessToken.value = userData.accessToken;
    router.push('/dashboard');
  } else {
    hasError.value = true;
  }
};

definePageMeta({
  layout: 'authentication',
});
</script>
<template>
  <div
    class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900"
  >
    <a
      href=""
      class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
    >
      <img src="/images/logo.svg" class="mr-4 h-11" alt="FlowBite Logo" />
      <span>Flowbite</span>
    </a>
    <!-- Card -->
    <div
      class="items-center justify-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-lg 2xl:max:max-w-screen-lg xl:p-0 dark:bg-gray-800"
    >
      <div class="hidden w-2/3 lg:flex">
        <img
          class="rounded-l-lg"
          src="/images/authentication/login.jpg"
          alt="login image"
        />
      </div>
      <div class="w-full p-6 space-y-8 sm:p-8 lg:p-16 lg:py-0">
        <h2
          class="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white"
        >
          Sign in to platform by Google
        </h2>

        <div>
          <div v-if="!isLoading">
            <GoogleLogin :callback="callback" />
          </div>
          <div v-if="isLoading">
            <div style="padding: 50px 10px">
              <SpinnerBaseComponent :size="8" />
            </div>
          </div>
          <div v-if="hasError">
            <div style="padding: 50px 10px">
              <p class="text-center">
                <strong>Something went wrong</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
