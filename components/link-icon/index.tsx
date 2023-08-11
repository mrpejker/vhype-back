/* eslint-disable @next/next/no-img-element */
import LinkIcon from '../icons/LinkIcon';
import ContractLink from '../icons/ContractLink';

interface LinkIconComponentProps {
  icon: string | null | undefined;
}

const LinkIconComponent: React.FC<LinkIconComponentProps> = ({ icon }) => {
  return icon !== undefined && icon !== '' && icon !== undefined ? (
    <img
      role="img"
      style={{ width: 21, height: 21 }}
      alt=""
      src={icon === null ? undefined : icon}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = '/defaultLink.svg';
      }}
    />
  ) : (
    <ContractLink className={'w-[21px] h-[21px]'} />
  );
};

export default LinkIconComponent;
