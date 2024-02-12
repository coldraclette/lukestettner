import { ProjectTextBlock } from '../types';
import { composeClassNames } from '../utils';

interface SingleTextblockProps {
  content: ProjectTextBlock;
  inModal: boolean;
}

export default function SingleTextblock({
  content,
  inModal,
}: SingleTextblockProps) {
  const { text } = content;
  const textClasses = inModal
    ? 'inline-block text-[20pt] overflow-y-scroll p-5 h-[85.5vh] w-[calc(80vh*0.7)] bg-white'
    : 'relative w-[110px] h-[145px] overflow-hidden whitespace-normal text-[6pt] inline-block pl-1 pr-1 ';

  return <p className={textClasses}>{text}</p>;
}
