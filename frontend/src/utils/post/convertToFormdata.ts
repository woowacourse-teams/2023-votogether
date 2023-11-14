import { WritingPostInfo } from '@components/PostForm/type';

import { deleteOverlappingNewLine } from '@utils/deleteOverlappingNewLine';

export const convertToFormData = ({
  categoryOptionList,
  title,
  content,
  imageUrl,
  optionList,
  deadline,
  fileInputList,
}: WritingPostInfo): FormData => {
  const formData = new FormData();

  categoryOptionList.forEach(option => formData.append('categoryIds', option.id.toString()));

  formData.append('title', title);
  formData.append('content', deleteOverlappingNewLine(content));
  formData.append('imageUrl', imageUrl);
  optionList.forEach((option, index) => {
    option.isServerId && formData.append(`postOptions[${index}].id`, option.id.toString());
    formData.append(`postOptions[${index}].content`, deleteOverlappingNewLine(option.text));
    formData.append(`postOptions[${index}].imageUrl`, option.imageUrl);
  });
  formData.append('deadline', deadline);

  fileInputList.forEach((item: HTMLInputElement, index: number) => {
    if (!item.files) return;

    if (index === 0) {
      item.files[0] && formData.append('imageFile', item.files[0]);
    } else {
      item.files[0] && formData.append(`postOptions[${index - 1}].imageFile`, item.files[0]);
    }
  });

  return formData;
};
