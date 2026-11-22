/**
 * Utility to compress and resize image files client-side before uploading.
 * Ensures avatars and uploads stay lightweight (<100KB) and load lightning fast.
 */
export const compressImage = (file, maxWidth = 400, maxHeight = 400, quality = 0.85) => {
  return new Promise((resolve) => {
    // If not an image, return original
    if (!file || !file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve(file); // fallback to original file on read error
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(file); // fallback on image load error
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio scale
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        // Draw image smoothly
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to Blob (JPEG for universal browser support)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const cleanFileName = (file.name || 'avatar').replace(/\.[^/.]+$/, '') + '.jpg';
              const compressedFile = new File([blob], cleanFileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Resolves an avatar or image URL to ensure relative paths like /uploads/...
 * resolve correctly against the backend server even when hosted on a custom domain.
 */
export const getAvatarSrc = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');
  const backendBase = isLocal ? '' : 'https://namah-siddham-corp.onrender.com';
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

