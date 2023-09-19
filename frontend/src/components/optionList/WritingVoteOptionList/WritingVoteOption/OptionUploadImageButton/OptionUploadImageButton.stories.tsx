import type { Meta } from '@storybook/react';

import { useRef } from 'react';

import OptionUploadImageButton from '.';

const meta: Meta<typeof OptionUploadImageButton> = {
  component: OptionUploadImageButton,
};

export default meta;

export const Default = () => {
  const ref = useRef([]);

  return (
    <OptionUploadImageButton
      isImageVisible={true}
      optionId={123}
      contentInputRefList={ref}
      index={0}
    />
  );
};
