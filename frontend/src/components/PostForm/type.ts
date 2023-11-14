import { StringDate } from '@type/time';

import { WritingVoteOptionType } from '@hooks/useWritingOption';

import { Option } from '@components/common/MultiSelect/types';

interface OptionWithIsServerId extends WritingVoteOptionType {
  isServerId: boolean;
}

export interface WritingPostInfo {
  categoryOptionList: Option[];
  title: string;
  content: string;
  imageUrl: string;
  optionList: OptionWithIsServerId[];
  deadline: StringDate;
  fileInputList: HTMLInputElement[];
}
