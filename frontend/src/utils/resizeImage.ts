import imageCompression from 'browser-image-compression';

export const convertImageToWebP = async (imageFile: File) => {
  const compressedBlob = await imageCompression(imageFile, {
    maxWidthOrHeight: 1280,
    initialQuality: 0.5,
    fileType: 'image/webp',
  });

  const outputWebpFile = new File([compressedBlob], `${Date.now().toString()}.webp`);

  const dataTransfer = new DataTransfer();

  dataTransfer.items.add(outputWebpFile);

  return dataTransfer.files;
};
