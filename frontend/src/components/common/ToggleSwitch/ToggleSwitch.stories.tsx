import type { Meta } from '@storybook/react';

import { useState } from 'react';

import ToggleSwitch from '.';

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
};

export default meta;

const useToggleSwitch = () => {
  const [selectedButton, setSelectedButton] = useState('first');

  const firstButton = {
    text: 'first',
    event: () => setSelectedButton('first'),
  };

  const secondButton = {
    text: 'second',
    event: () => setSelectedButton('second'),
  };

  return { selectedButton, firstButton, secondButton };
};

export const SizeS = () => {
  const { selectedButton, firstButton, secondButton } = useToggleSwitch();

  return (
    <ToggleSwitch
      size="sm"
      selectedButton={selectedButton}
      firstButton={firstButton}
      secondButton={secondButton}
    />
  );
};

export const SizeM = () => {
  const { selectedButton, firstButton, secondButton } = useToggleSwitch();

  return (
    <ToggleSwitch
      size="md"
      selectedButton={selectedButton}
      firstButton={firstButton}
      secondButton={secondButton}
    />
  );
};

export const SizeL = () => {
  const { selectedButton, firstButton, secondButton } = useToggleSwitch();

  return (
    <ToggleSwitch
      size="lg"
      selectedButton={selectedButton}
      firstButton={firstButton}
      secondButton={secondButton}
    />
  );
};

export const SizeFree = () => {
  const { selectedButton, firstButton, secondButton } = useToggleSwitch();

  return (
    <div style={{ height: '100px' }}>
      <ToggleSwitch
        size="free"
        selectedButton={selectedButton}
        firstButton={firstButton}
        secondButton={secondButton}
      />
    </div>
  );
};
