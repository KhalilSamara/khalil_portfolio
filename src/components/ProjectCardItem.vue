<script setup lang="ts">
import type { Project } from '@/models/Project';
import HeroIcon from './HeroIcon.vue';
import { getImagePath } from '@/helpers/Helper';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

defineProps<{ item: Project; separator: boolean }>();

const visibleRef = ref(false); // Controls lightbox visibility
const imgsRef = ref<string[]>([]); // Initializes as an empty array
const indexRef = ref(0); // Tracks the current image index in the lightbox

// Hide the lightbox
const onHide = () => (visibleRef.value = false);

// Show the lightbox with the images and selected index
const showImages = (images: Array, index: number) => {
  imgsRef.value = images.map((image) => getImagePath(image));
  indexRef.value = index;
  visibleRef.value = true;
};

const openUrl = (url: string) => {
  window.open(getImagePath(url), '_blank'); // Open the URL in a new tab
};
</script>

<template>
  <div class="mb-5 w-full items-start space-y-5 overflow-hidden">
    <!-- Main Project Information -->
    <div class="flex">
      <img
        :src="getImagePath(item.language.image)"
        alt="project logo"
        class="h-14 w-14 shrink-0 rounded-xl border-2 border-gray-50 shadow-sm dark:border-night-700" />
      <div class="mx-3 flex w-full justify-between space-y-5">
        <div class="space-y-1.5">
          <div class="font-medium dark:text-night-50">{{ item.name }}</div>
          <div class="flex space-x-5 text-gray-400 rtl:space-x-reverse dark:text-night-400">
            <!-- Project Metadata -->
            <div class="flex items-center gap-1 text-sm font-medium">
              <HeroIcon :icon="'CodeBracketIcon'" class="h-4 w-4 shrink-0 stroke-2" />
              <span>{{ item.language.name }}</span>
            </div>
            <div v-if="item.stars" class="flex items-center gap-1 text-sm font-medium">
              <HeroIcon :icon="'StarIcon'" class="h-4 w-4 shrink-0 stroke-2" />
              <span>{{ item.stars }}</span>
            </div>
            <div v-if="item.forks" class="flex items-center gap-1 text-sm font-medium">
              <HeroIcon :icon="'DocumentDuplicateIcon'" class="h-4 w-4 shrink-0 stroke-2" />
              <span>{{ item.forks }}</span>
            </div>
            <div v-if="item.downloads" class="flex items-center gap-1 text-sm font-medium">
              <HeroIcon :icon="'ArrowDownIcon'" class="h-4 w-4 shrink-0 stroke-2" />
              <span>{{ item.downloads }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-justify text-sm text-gray-600 dark:text-night-300" v-html="item.description"></p>

    <!-- Link -->
    <div class="w-full space-y-2 md:flex md:space-y-0 md:space-x-2">
      <a
        v-if="item.images.length > 0"
        @click="showImages(item.images)"
        class="block cursor-pointer items-center gap-1 rounded-lg border-2 border-gray-100 px-2 py-1.5 text-xs font-medium text-gray-400 hover:border-primary-500 hover:bg-primary-500 hover:text-white dark:border-night-700 dark:text-night-400 dark:hover:border-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-500">
        <HeroIcon :icon="'LinkIcon'" class="inline-flex h-4 w-4 shrink-0 stroke-2" />
        <span class="inline-flex pl-2">Images</span>
      </a>

      <a
        v-if="item.url.length > 0"
        v-for="(i, index) of item.url"
        @click.prevent="openUrl(i.url)"
        target="_blank"
        class="block cursor-pointer items-center gap-1 rounded-lg border-2 border-gray-100 px-2 py-1.5 text-xs font-medium text-gray-400 hover:border-primary-500 hover:bg-primary-500 hover:text-white dark:border-night-700 dark:text-night-400 dark:hover:border-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-500">
        <HeroIcon :icon="'LinkIcon'" class="inline-flex h-4 w-4 shrink-0 stroke-2" />
        <span class="inline-flex pl-2">{{ i.name }}</span>
      </a>
    </div>

    <div v-if="separator" class="border-b border-dashed border-gray-200 dark:border-night-600"></div>
  </div>

  <!-- Lightbox Component -->
  <vue-easy-lightbox :visible="visibleRef" :imgs="imgsRef" :index="indexRef" @hide="onHide"></vue-easy-lightbox>
</template>
