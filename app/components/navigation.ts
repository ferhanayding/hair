// i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'ru', 'az',"tr"] as const;

export const {Link, redirect, usePathname, useRouter} = createNavigation({
  locales
});
