<template>
  <div>
    <HeaderBaseComponent />
    <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <!-- <SidebarBaseComponent /> -->
      <div
        id="main-content"
        class="relative w-full h-full overflow-y-auto bg-gray-50 lg:m-16 dark:bg-gray-900"
      >
        <main>
          <div class="px-4 pt-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
