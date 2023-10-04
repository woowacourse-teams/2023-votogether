import type { Meta } from '@storybook/react';

import { useToggleSwitch } from '@hooks';

import ToggleSwitch from '.';

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
};

export default meta;

export const SizeS = () => {
  const { selectedButton, firstButton, secondButton } = useToggleSwitch('first', 'second');

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
  const { selectedButton, firstButton, secondButton } = useToggleSwitch('first', 'second');

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
  const { selectedButton, firstButton, secondButton } = useToggleSwitch('first', 'second');

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
  const { selectedButton, firstButton, secondButton } = useToggleSwitch('first', 'second');

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
