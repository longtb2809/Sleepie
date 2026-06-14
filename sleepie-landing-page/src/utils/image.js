export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/assets') || path.startsWith('data:')) return path;
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5194';
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBaseUrl}${cleanPath}`;
};
