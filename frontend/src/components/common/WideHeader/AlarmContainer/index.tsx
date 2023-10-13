import React from 'react';

import ToggleSwitch from '@components/common/ToggleSwitch';

const contentButton = {
  text: 'content',
  event: () => {},
};

const reportButton = {
  text: 'report',
  event: () => {},
};

export default function AlarmContainer() {
  return (
    <ToggleSwitch
      size="free"
      selectedButton="content"
      firstButton={contentButton}
      secondButton={reportButton}
    />
  );
}
