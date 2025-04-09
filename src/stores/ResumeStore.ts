import { defineStore } from 'pinia';
import type { Resume } from '../models/Resume';
/** Resume files */
import arJO from '@/assets/json/resume.ar.json';
import enUS from '@/assets/json/resume.en.json';

const languages = [
  { code: 'en-US', data: enUS },
  { code: 'ar-JO', data: arJO },
];

export const useResumeStore = defineStore('resume', {
  state: () => {
    return {
      resume: languages[0].data as Resume,
    };
  },
  actions: {
    loadResume() {
      if ('locale' in localStorage) {
        const selected = languages.find((lang) => lang.code == localStorage.locale)?.data;
        if (selected) this.resume = selected;
      }
    },
  },
});
