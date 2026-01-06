type SplitNameProps = {
  name: string;
  className?: any;
};
const SplitName: React.FC<SplitNameProps> = ({ name, className }) => {
  const splitName = (name: string): string => {
    const parts: string[] = name?.split(' ');
    const initials: string = parts?.map(part => part.charAt(0)).join('');
    return initials;
  };

  return (
    <span
      className={`flex items-center justify-center ${
        className || ''
      }`}
    >
      {splitName(name)}
    </span>
  );
};

export default SplitName;
