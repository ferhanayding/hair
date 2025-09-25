export type Locale = 'en' | 'ru' | 'az';

export function buildLocaleHref(pathname: string | null | undefined, code: Locale) {
  const p = pathname ?? '/';
  const cleaned = p.replace(/^\/(en|ru|az)(?=\/|$)/, '');
  const withSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  return `/${code}${withSlash}`;
}
