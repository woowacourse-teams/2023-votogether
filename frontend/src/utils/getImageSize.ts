export const getImageSize = (imageFile: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      resolve({ width, height });
    };

    reader.onload = () => {
      img.src = reader.result?.toString() ?? '';
    };

    reader.readAsDataURL(imageFile);

    img.onerror = error => {
      reject(error);
    };

    reader.onerror = error => {
      reject(error);
    };
  });
};
