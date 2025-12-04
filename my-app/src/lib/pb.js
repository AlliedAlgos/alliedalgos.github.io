import PocketBase from 'pocketbase';

// Use local PocketBase server
export const pb = new PocketBase('http://127.0.0.1:8090');

if (typeof window !== 'undefined') {
  // Only run this on the client
  pb.authStore.loadFromCookie(document.cookie || '');
  pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie();
  });
}
