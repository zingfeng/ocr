<script setup>
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
          Sign in to platform
        </h2>
        <form class="mt-8 space-y-6" action="#">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              id="email"
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your password</label
            >
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                name="remember"
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div class="ml-3 text-sm">
              <label
                for="remember"
                class="font-medium text-gray-900 dark:text-white"
                >Remember me</label
              >
            </div>
            <a
              href="#"
              class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
              >Lost Password?</a
            >
          </div>
          <button
            type="submit"
            class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Not registered?
            <a class="text-primary-700 hover:underline dark:text-primary-500"
              >Create account</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
