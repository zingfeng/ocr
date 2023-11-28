<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
import { ILoginInput } from '~/types';
import { useMainStore } from '~/store';
import { useToast } from '@/components/Toast/components/ToastProvider/composables/useToast';

definePageMeta({
  layout: 'default',
});

// I18n
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return (locales.value as LocaleObject[]).filter(
    (i: LocaleObject) => i.code !== locale.value,
  );
});

// Env variable
const config = useRuntimeConfig();

// API
const { $api } = useNuxtApp();

const form = reactive<ILoginInput>({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    const credentials: ILoginInput = {
      email: form.email,
      password: form.password,
    };

    const response = await $api.auth.login(credentials);
    console.log(response);
    // allow user access into the app
  } catch (error) {
    console.error(error);
  }
};
// handleSubmit();

// Store
const mainStore = useMainStore();

const isShowModal = ref(false);
function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}

const activeTab = ref('first');
</script>

<template>
  <div>
    <div class="mb-5">
      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="my-3 px-4 py-2 bg-blue-400 text-white border border-gray-200 cursor-pointer hover:bg-blue-500"
      >
        {{ locale.name }}
      </NuxtLink>
    </div>
    <h1 class="mb-6 text-4xl">{{ $t('common.welcome') }}</h1>
    <hr class="mb-5" />
    <h1 class="mb-6 text-4xl">API secret: {{ config.public.appVersion }}</h1>
    <hr class="mb-5" />
    <h1 class="mb-6 text-4xl">Store: {{ mainStore.counter }}</h1>
    <button
      class="border-spacing-0 border bg-blue-500 text-white p-2 mb-5 rounded"
      @click="mainStore.increment"
    >
      Increase store
    </button>
    <button
      class="border-spacing-0 border bg-red-400 text-white p-2 mb-5 rounded"
      @click="mainStore.clear"
    >
      Clear store
    </button>
    <hr class="mb-5" />
    <h1 class="mb-6 text-4xl">Base component</h1>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/button"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Button</NuxtLink
      >
      <div class="flex space-x-2">
        <ButtonBaseComponent olor="default" class-name="!text-yellow-500">
          Click me
          <template #suffix>
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </template>
        </ButtonBaseComponent>
        <ButtonBaseComponent color="dark" :loading="true"
          >Dark</ButtonBaseComponent
        >
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/button-group"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Button Group</NuxtLink
      >
      <div class="flex space-x-2">
        <ButtonGroupBaseComponent
          ><ButtonBaseComponent olor="default" class-name="!text-yellow-500">
            Click me
            <template #suffix>
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template> </ButtonBaseComponent
          ><ButtonBaseComponent color="dark" :loading="true"
            >Dark</ButtonBaseComponent
          ></ButtonGroupBaseComponent
        >
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/alert"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Alert</NuxtLink
      >
      <div class="flex flex-col">
        <AlertBaseComponent type="info" class="">Info</AlertBaseComponent>
        <AlertBaseComponent type="warning" class="">Warning</AlertBaseComponent>
        <AlertBaseComponent type="danger" class="">Danger</AlertBaseComponent>
        <AlertBaseComponent type="dark" class="">Dark</AlertBaseComponent>
        <AlertBaseComponent type="success">Success</AlertBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/avatar"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Avatar</NuxtLink
      >
      <div class="flex space-x-2">
        <AvatarBaseComponent
          status="online"
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <AvatarBaseComponent
          status="online"
          rounded
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/badge"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Badge</NuxtLink
      >
      <div class="flex space-x-2">
        <BadgeBaseComponent>default</BadgeBaseComponent>
        <BadgeBaseComponent type="dark">dark</BadgeBaseComponent>

        <BadgeBaseComponent type="red">red</BadgeBaseComponent>
        <BadgeBaseComponent type="green">green</BadgeBaseComponent>
        <BadgeBaseComponent type="yellow">yellow</BadgeBaseComponent>
        <BadgeBaseComponent type="indigo">indigo</BadgeBaseComponent>
        <BadgeBaseComponent type="purple">purple</BadgeBaseComponent>
        <BadgeBaseComponent type="pink">pink</BadgeBaseComponent>
        <BadgeBaseComponent href="#">Link</BadgeBaseComponent>
        <BadgeBaseComponent>
          <template #icon>
            <svg
              aria-hidden="true"
              class="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </template>
          Default
        </BadgeBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/breadcrumb"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Breadcrumb
      </NuxtLink>
      <div class="flex space-x-2">
        <BreadcrumbBaseComponent>
          <BreadcrumbItem href="#" home> Home </BreadcrumbItem>
          <BreadcrumbItem href="#"> Projects </BreadcrumbItem>
          <BreadcrumbItem> Flowbite </BreadcrumbItem>
        </BreadcrumbBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/card"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Card
      </NuxtLink>
      <div class="flex space-x-2">
        <CardBaseComponent
          variant="image"
          img-src="https://flowbite.com/docs/images/blog/image-1.jpg"
          img-alt="Desk"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Noteworthy technology acquisitions 2021
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </CardBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/carousel"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Carousel
      </NuxtLink>
      <div class="">
        <CarouselBaseComponent />
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/dropdown"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Dropdown
      </NuxtLink>
      <div class="flex space-x-2">
        <DropdownBaseComponent acement="bottom" text="Bottom">
          Any content here
        </DropdownBaseComponent>
        <DropdownBaseComponent placement="top">
          <template #trigger="toggle">
            <ButtonBaseComponent
              @click="
                {
                  toggle;
                }
              "
            >
              Top
              <template #suffix>
                <svg
                  class="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </template>
            </ButtonBaseComponent>
          </template>
          <div class="p-2">Padding content</div>
        </DropdownBaseComponent>
        <DropdownBaseComponent placement="right" text="Right">
          <SpinnerBaseComponent size="6" class="m-4" />
        </DropdownBaseComponent>
        <DropdownBaseComponent placement="left" text="Left">
          hello world
        </DropdownBaseComponent>
        <DropdownBaseComponent text="List">
          <ListGroupBaseComponent>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </template>
              Profile
            </ListGroupItem>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                  ></path>
                </svg>
              </template>
              Settings
            </ListGroupItem>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </template>
              Messages
            </ListGroupItem>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </template>
              Download
            </ListGroupItem>
          </ListGroupBaseComponent>
        </DropdownBaseComponent>
        <DropdownBaseComponent text="Bottom">
          <template #trigger>
            <span>Click trigger</span>
          </template>
          <ListGroupBaseComponent>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </template>
              Profile
            </ListGroupItem>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                  ></path>
                </svg>
              </template>
              Settings
            </ListGroupItem>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </template>
              Messages
            </ListGroupItem>
            <ListGroupItem>
              <template #prefix>
                <svg
                  class="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </template>
              Download
            </ListGroupItem>
          </ListGroupBaseComponent>
        </DropdownBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/list-group"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >List Group</NuxtLink
      >
      <div class="flex space-x-2">
        <ListGroupBaseComponent>
          <ListGroupItem>
            <template #prefix>
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
            Profile
          </ListGroupItem>
          <ListGroupItem>
            <template #prefix>
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                ></path>
              </svg>
            </template>
            Settings
          </ListGroupItem>
          <ListGroupItem>
            <template #prefix>
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
            Messages
          </ListGroupItem>
          <ListGroupItem disabled>
            <template #prefix>
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
            Download
          </ListGroupItem>
        </ListGroupBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/input"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Input
      </NuxtLink>
      <div class="">
        <InputBaseComponent
          size="sm"
          placeholder="enter your first name"
          label="Small"
        />
        <InputBaseComponent
          size="md"
          placeholder="enter your last name"
          label="Medium"
        />
        <InputBaseComponent
          size="lg"
          placeholder="enter your second name"
          label="Large"
        />
        <InputBaseComponent
          size="lg"
          placeholder="enter your search query"
          label="Search"
        >
          <template #prefix>
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </template>
          <template #suffix>
            <ButtonBaseComponent>search</ButtonBaseComponent>
          </template>
        </InputBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/modal"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Modal
      </NuxtLink>
      <div class="">
        <button
          type="button"
          class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="showModal"
        >
          Show modal
        </button>
        <ModalBaseComponent v-if="isShowModal" @close="closeModal">
          <template #header>
            <div class="flex items-center text-lg">Terms of Service</div>
          </template>
          <template #body>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </template>
          <template #footer>
            <div class="flex justify-between">
              <button
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click="closeModal"
              >
                Decline
              </button>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="closeModal"
              >
                I accept
              </button>
            </div>
          </template>
        </ModalBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/progress"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Progress Bar
      </NuxtLink>
      <div class="">
        <!-- small size -->
        <ProgressBaseComponent
          size="sm"
          label="Small"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- medium size -->
        <ProgressBaseComponent
          size="md"
          label="Medium"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- large size -->
        <ProgressBaseComponent
          size="lg"
          label="Large"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- extra large size -->
        <ProgressBaseComponent
          size="xl"
          label="Extra Large"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Default color -->
        <ProgressBaseComponent
          label="Default"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Dark -->
        <ProgressBaseComponent
          color="dark"
          label="Dark"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Blue -->
        <ProgressBaseComponent
          color="blue"
          label="Blue"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Red -->
        <ProgressBaseComponent
          color="red"
          label="Red"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Green -->
        <ProgressBaseComponent
          color="green"
          label="Green"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Yellow -->
        <ProgressBaseComponent
          color="yellow"
          label="Yellow"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Indigo -->
        <ProgressBaseComponent
          color="indigo"
          label="Indigo"
          :progress="45"
        ></ProgressBaseComponent>
        <!-- Purple -->
        <ProgressBaseComponent
          color="purple"
          label="Purple"
          :progress="45"
        ></ProgressBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/tabs"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Tabs
      </NuxtLink>
      <div class="">
        <TabsBaseComponent v-model="activeTab" class="p-5">
          <!-- class appends to content DIV for all tabs -->
          <TabsComponentsTabItemBaseComponent name="first" title="First">
            Lorem1...
          </TabsComponentsTabItemBaseComponent>
          <TabsComponentsTabItemBaseComponent name="second" title="Second">
            Lorem2...
          </TabsComponentsTabItemBaseComponent>
          <TabsComponentsTabItemBaseComponent name="third" title="Third">
            Lorem3...
          </TabsComponentsTabItemBaseComponent>
          <TabsComponentsTabItemBaseComponent
            name="fourth"
            title="Fourth"
            :disabled="true"
          >
            Lorem4...
          </TabsComponentsTabItemBaseComponent>
        </TabsBaseComponent>
        <TabsBaseComponent v-model="activeTab" variant="underline" class="p-5">
          <!-- class appends to content DIV for all tabs -->
          <TabsComponentsTabItemBaseComponent name="first" title="First">
            Lorem1...
          </TabsComponentsTabItemBaseComponent>
          <TabsComponentsTabItemBaseComponent name="second" title="Second">
            Lorem2...
          </TabsComponentsTabItemBaseComponent>
          <TabsComponentsTabItemBaseComponent name="third" title="Third">
            Lorem3...
          </TabsComponentsTabItemBaseComponent>
          <TabsComponentsTabItemBaseComponent
            name="fourth"
            title="Fourth"
            :disabled="true"
          >
            Lorem4...
          </TabsComponentsTabItemBaseComponent>
        </TabsBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/toast"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Toast
      </NuxtLink>
      <div class="">
        <ToastBaseComponent type="empty">
          <!-- default -->
          You've unlocked achievement.
        </ToastBaseComponent>
        <ToastBaseComponent type="warning" closable>
          Improve password difficulty.
        </ToastBaseComponent>
        <ToastBaseComponent type="success" closable divide>
          Item moved successfully.
        </ToastBaseComponent>
        <ToastBaseComponent type="danger" closable divide>
          Item has been deleted.
        </ToastBaseComponent>
        <ToastBaseComponent type="empty" closable alignment="start">
          <template #icon>
            <img
              class="w-8 h-8 rounded-full shadow-lg"
              src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
              alt="Jese Leos image"
            />
          </template>
          <div class="text-sm font-normal">
            <span
              class="mb-1 text-sm font-semibold text-gray-900 dark:text-white"
              >Jese Leos</span
            >
            <div class="mb-2 text-sm font-normal">
              Hi Neil, thanks for sharing your thoughts regarding Flowbite.
            </div>
            <a
              href="#"
              class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >Reply</a
            >
          </div>
        </ToastBaseComponent>
        <ToastBaseComponent type="empty" closable>
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-earbuds"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6.825 4.138c.596 2.141-.36 3.593-2.389 4.117a4.432 4.432 0 0 1-2.018.054c-.048-.01.9 2.778 1.522 4.61l.41 1.205a.52.52 0 0 1-.346.659l-.593.19a.548.548 0 0 1-.69-.34L.184 6.99c-.696-2.137.662-4.309 2.564-4.8 2.029-.523 3.402 0 4.076 1.948zm-.868 2.221c.43-.112.561-.993.292-1.969-.269-.975-.836-1.675-1.266-1.563-.43.112-.561.994-.292 1.969.269.975.836 1.675 1.266 1.563zm3.218-2.221c-.596 2.141.36 3.593 2.389 4.117a4.434 4.434 0 0 0 2.018.054c.048-.01-.9 2.778-1.522 4.61l-.41 1.205a.52.52 0 0 0 .346.659l.593.19c.289.092.6-.06.69-.34l2.536-7.643c.696-2.137-.662-4.309-2.564-4.8-2.029-.523-3.402 0-4.076 1.948zm.868 2.221c-.43-.112-.561-.993-.292-1.969.269-.975.836-1.675 1.266-1.563.43.112.561.994.292 1.969-.269.975-.836 1.675-1.266 1.563z"
              />
            </svg>
          </template>
          Scroll down to see more examples.
        </ToastBaseComponent>
      </div>
    </div>
    <div
      class="space-x-3 w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        target="_blank"
        to="https://flowbite-vue.com/components/tooltip"
        class="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Tooltip
      </NuxtLink>
      <div class="">
        <TooltipBaseComponent>
          <template #trigger>
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Default Tooltip
            </button>
          </template>
          <template #content> Tooltip content </template>
        </TooltipBaseComponent>
      </div>
    </div>
    <h1 class="mb-6 text-4xl">Flowbite + Nuxt.js + Tailwind CSS Starter</h1>
    <div
      class="w-auto mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <NuxtLink
        to="/"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Home</NuxtLink
      >
      <NuxtLink
        to="/events"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Data attribute events</NuxtLink
      >
      <NuxtLink
        to="/accordion"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Accordion</NuxtLink
      >
      <NuxtLink
        to="/carousel"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Carousel</NuxtLink
      >
      <NuxtLink
        to="/modal"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Modal</NuxtLink
      >
      <NuxtLink
        to="/collapse"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Collapse</NuxtLink
      >
      <NuxtLink
        to="/dial"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Speed Dial</NuxtLink
      >
      <NuxtLink
        to="/dismiss"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Dismiss</NuxtLink
      >
      <NuxtLink
        to="/drawer"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Drawer</NuxtLink
      >
      <NuxtLink
        to="/dropdown"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Dropdown</NuxtLink
      >
      <NuxtLink
        to="/popover"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Popover</NuxtLink
      >
      <NuxtLink
        to="/tabs"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Tabs</NuxtLink
      >
      <NuxtLink
        to="/tooltip"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Tooltip</NuxtLink
      >
      <NuxtLink
        to="/sign-in"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Sign in</NuxtLink
      >
      <NuxtLink
        to="/sign-up"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Sign up</NuxtLink
      >
      <NuxtLink
        to="/forgot-password"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Forgot password</NuxtLink
      >
      <NuxtLink
        to="/reset-password"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >Reset password</NuxtLink
      >
    </div>
    <p class="mb-8">
      Learn more about
      <a
        href="https://flowbite.com/docs/getting-started/nuxt-js/"
        class="text-blue-600 hover:underline"
        >Flowbite + Nuxt.js here</a
      >.
    </p>
  </div>
</template>
