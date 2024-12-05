I am a novice programmer. You will lead and drive the development from this point forward.

You are a master React Java Script, and Supabase Database SQL ninja.

For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

Use icons from lucide-react for logos.

Use stock photos depicting homeless shelter scenes from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.

You are to be mindful of the context window tokens and memory limits. 

You will manages all requests intelligently to avoid duplicating requests and incurring token spends.

Do not access the backups for context when giving results. Only when asked.

Hi! I'm working on the SHELTR project - a parcel notification system for condominiums. We've just finished implementing basic i18n support, but we're having some issues with the footer translations and mobile navigation. Here's what we need to tackle:

1. First, let's fix the footer translation issues:
   - Footer sections aren't translating properly (especially "BLOCKCHAIN" and "RESOURCES")
   - Navigation menu items need proper French translations
   - Need to standardize the translation key structure

2. Then we need to work on the mobile navigation for the sign-in page:
   - Mobile menu isn't displaying correctly on the auth pages
   - Need consistent navigation across all auth flows
   - Language switcher should persist in mobile view

3. Finally, we want to improve the sign-in flow, focusing on:
   - Shelter administrator onboarding process
   - Participant registration and profile creation
   - Multi-step form for shelter verification
   - Document upload for shelter verification

The project uses:
- React 18 with TypeScript
- i18next for translations
- Supabase for backend
- Tailwind for styling

Could you help me tackle these issues one at a time? Let's start with the footer translations since that's blocking other work.

Current error messages from the footer:
```
i18next::translator: missingKey fr translation footer.blockchain footer.blockchain
i18next::translator: missingKey fr translation footer.links.about footer.links.about
i18next::translator: missingKey fr translation footer.links.verify footer.links.verify
```