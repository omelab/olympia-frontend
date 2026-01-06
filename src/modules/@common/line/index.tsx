const Line = ({ className }: any) => {
  return (
    <div
      className={`my-4 h-px w-full bg-[#E5E7EB] ${className || ''}`}
    >
    </div>
  );
};

export default Line;
