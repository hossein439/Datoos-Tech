export const getUrlPart = (url: string, part: 'origin' | 'host' | 'protocol' | 'pathname') => {
  const baseUrl = new URL(url);
  return baseUrl[part];
};
