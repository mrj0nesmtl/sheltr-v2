export const markdownFiles = {
  intro: {
    en: () => import('@/docs/sheltr_intro_eng.md?raw'),
    fr: () => import('@/docs/shelter_inro_fr.md?raw')
  },
  whitepaper: {
    en: () => import('@/docs/whitepaper_eng.md?raw'),
    fr: () => import('@/docs/whitepaper_fr.md?raw')
  },
  techStack: () => import('@/docs/tech_stack.md?raw')
};

export async function loadMarkdown(type: keyof typeof markdownFiles, lang?: 'en' | 'fr'): Promise<string> {
  try {
    if (lang) {
      const module = await markdownFiles[type][lang]();
      return module.default;
    } else {
      const module = await markdownFiles[type]();
      return module.default;
    }
  } catch (error) {
    console.error(`Error loading markdown: ${error}`);
    return '';
  }
} 