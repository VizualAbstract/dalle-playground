export function validateURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

export const DEFAULT_BACKEND_URL = 'http://127.0.0.1:8080';

export const DEFAULT_IMAGES_PER_QUERY = 1;

export const DEFAULT_MAX_IMAGES_PER_QUERY_OPTIONS = 9;

export const DEFAULT_QUERY_STRING = 'Apple';

export const PROCESSING_STEPS = [
  'Generating images',
  'This requires some fancy calculations',
  'Still processing',
  "We promise it's worth the wait",
  "Hang tight, we're almost there",
  'Loading results, we swear!',
];
