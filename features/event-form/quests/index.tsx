/* eslint-disable @next/next/no-img-element */
import React from 'react';
// Models and types
import { Quest } from '../../../models/Event';
// Components And Styles

export type QuestChangeCallback = (field: string, value: string, file?: File) => void;

interface QuestProps {
  quest: Quest;
  onQuestChange: QuestChangeCallback;
  setFile: (file: File) => void;
}

const QuestComponent: React.FC<QuestProps> = ({ quest, onQuestChange }) => {
  const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    onQuestChange(event.currentTarget.name, event.currentTarget.value);
  };

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onQuestChange(event.target.name, event.target.value);
  };

  return (
    <div className="mt-[20px]">
      <input
        autoComplete="off"
        type="text"
        name="reward_title"
        onChange={onInputChange}
        value={quest.reward_title}
        className="form-control block w-full mb-2 px-3 py-1.5 text-base font-normal text-black bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
        placeholder="Title"
      />
      <textarea
        name="reward_description"
        onChange={onTextAreaChange}
        value={quest.reward_description}
        rows={7}
        className="form-control block w-full mb-2 px-3 py-1.5 text-base font-normal text-black bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
        placeholder="Description"
      />
    </div>
  );
};

export default QuestComponent;
