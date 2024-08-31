import React from 'react';
import Image from "next/image";

interface SectionHeaderProps {
  sectionName: string;
  title: string;
  isComplete: boolean;
  onClick: (sectionName: string) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ sectionName, title, isComplete, onClick }) => {
  return (
    <div
      onClick={() => onClick(sectionName)}
      style={{
        backgroundColor: '#f3f4f6',
        cursor: 'pointer',
        padding: '20px',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        marginBottom: '1rem',
        position: 'relative',
      }}
    >
      <h2 className="text-lg font-bold text-dark-600">{title}</h2>
      {isComplete && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            width: '95px',
            height: '95px',
          }}
        >
          <Image
            src="/assets/icons/checkMark.svg"
            alt="credit coins"
            layout="fill"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default SectionHeader;