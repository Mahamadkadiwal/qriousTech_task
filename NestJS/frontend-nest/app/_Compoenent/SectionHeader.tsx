"use client";

type SectionHeaderProps = {
  title: string;
  buttonText?: string;
  onAddClick?: () => void;
  showButton?: boolean;
};

export default function SectionHeader({
  title,
  buttonText = "Add",
  onAddClick,
  showButton = true,
}: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center px-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        {title}
      </h3>

      {showButton && (
        <button
          onClick={onAddClick}
          className='px-4 py-1.5 text-sm rounded-md border border-blue-950 text-blue-900
            hover:bg-blue-900 hover:text-white
            transition-all duration-200'>
          {buttonText}
        </button>
      )}
    </div>
  );
}
