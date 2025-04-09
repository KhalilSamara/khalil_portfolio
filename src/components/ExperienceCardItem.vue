<script setup lang="ts">
import type { Experience } from '@/models/Experience';
import HeroIcon from './HeroIcon.vue';
import { getImagePath } from '@/helpers/Helper';

defineProps<{ item: Experience; separator: boolean }>();
</script>

<template>
  <div class="mb-5 w-full items-start space-y-5 overflow-hidden">
    <!-- Main Experience Information -->
    <div class="flex">
      <!-- Company Logo -->
      <img
        :src="getImagePath(item.companyLogo)"
        alt="Avatar"
        class="h-14 w-14 shrink-0 rounded-xl border-2 border-gray-50 shadow-sm dark:border-night-700" />

      <!-- Job Details -->
      <div class="mx-3 flex w-full justify-between">
        <div class="space-y-1.5">
          <!-- Job Title -->
          <div class="font-medium dark:text-night-50">{{ item.job }}</div>
          <div class="flex space-x-5 text-gray-400 rtl:space-x-reverse dark:text-night-400">
            <!-- Company Name -->
            <div class="flex items-center gap-1 text-sm font-medium">
              <HeroIcon :icon="'BriefcaseIcon'" class="h-4 w-4 shrink-0" />
              <span>{{ item.company }}</span>
            </div>
            <!-- Location -->
            <div class="flex items-center gap-1 text-sm font-medium">
              <HeroIcon :icon="'MapPinIcon'" class="h-4 w-4 shrink-0" />
              <span>{{ item.location }}</span>
            </div>
          </div>
        </div>

        <!-- Work Type and Dates (Only on larger screens) -->
        <div class="hidden items-start justify-between space-y-1 sm:block sm:text-right">
          <div
            class="order-last inline-flex items-center rounded-lg bg-primary-500/20 px-2 py-1 text-xs font-medium text-primary-500">
            {{ item.workType }}
          </div>
          <div class="flex items-center gap-1 text-sm font-medium text-gray-400 dark:text-night-400">
            <HeroIcon :icon="'CalendarIcon'" class="h-4 w-4 shrink-0" />
            <span>{{ item.start }} - {{ item.end }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Work Type and Dates (Visible on mobile) -->
    <div class="flex flex-col space-y-1 sm:hidden">
      <div class="inline-flex items-center rounded-lg bg-primary-500/20 px-2 py-1 text-xs font-medium text-primary-500">
        {{ item.workType }}
      </div>
      <div class="flex items-center gap-1 text-sm font-medium text-gray-400 dark:text-night-400">
        <HeroIcon :icon="'CalendarIcon'" class="h-4 w-4 shrink-0" />
        <span>{{ item.start }} - {{ item.end }}</span>
      </div>
    </div>

    <!-- Description -->
    <p class="text-justify text-justify text-sm text-gray-600 dark:text-night-300" v-html="item.description"></p>

    <!-- Separator -->
    <div v-if="separator" class="border-b border-dashed border-gray-200 dark:border-night-600"></div>
  </div>
</template>
