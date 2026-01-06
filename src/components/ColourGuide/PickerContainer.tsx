import Image from 'next/image';
import { Pattern, Room } from './types';
import React, { Fragment, useState } from 'react';

interface PickerContainerProps {
  activeRoom?: Room;
  activePattern?: Pattern;
}

export const PickerContainer: React.FC<PickerContainerProps> = ({
  activeRoom,
  activePattern,
}) => {
  if (!activeRoom) {
    return (
      <div className="design placeholder">
        Please select a room to see the design preview.
      </div>
    );
  }

  const {
    component,
    leftImage,
    rightImage,
    leftWidth,
    leftHeight,
    rightWidth,
    rightHeight,
  } = activeRoom;

  const [leftPattern, setLeftPattern] = useState<Pattern | undefined>(
    undefined,
  );
  const [rightPattern, setRightPattern] = useState<Pattern | undefined>(
    undefined,
  );

  const [itemHovered, setItemHovered] = useState('');

  const handleLeftPattern = (data: Pattern | undefined) => {
    setLeftPattern(data);
  };

  const handRightPattern = (data: Pattern | undefined) => {
    setRightPattern(data);
  };

  return (
    <Fragment>
      <div id={`${component}Tab`} className="design">
        <button
          className="wall wall-1st"
          style={{ background: leftPattern?.bg }}
          onClick={() => handleLeftPattern(activePattern)}
          onMouseEnter={() => setItemHovered('left')}
          onMouseLeave={() => setItemHovered('')}
        >
          <Image
            src={`/assets/misc/${leftImage}`}
            width={leftWidth}
            height={leftHeight}
            alt={`Left wall of ${component}`}
            decoding="async"
            className="entered lazyloaded"
          />
        </button>
        <button
          className="wall wall-2nd"
          style={{ background: rightPattern?.bg }}
          onClick={() => handRightPattern(activePattern)}
          onMouseEnter={() => setItemHovered('right')}
          onMouseLeave={() => setItemHovered('')}
        >
          <Image
            src={`/assets/misc/${rightImage}`}
            width={rightWidth}
            height={rightHeight}
            alt={`Right wall of ${component}`}
            decoding="async"
            className="entered lazyloaded"
          />
        </button>
      </div>

      <div className="color-description">
        <div>
          <span>Colour Name : </span>
          <span className="colorName">
            {itemHovered === 'left' && leftPattern?.name
              ? leftPattern.name
              : itemHovered === 'right' && rightPattern?.name
                ? rightPattern.name
                : ''}
          </span>
        </div>
        <div>
          <span>Colour Code : </span>
          <span className="colorCode">
            {itemHovered === 'left' && leftPattern?.code
              ? leftPattern.code
              : itemHovered === 'right' && rightPattern?.code
                ? rightPattern.code
                : ''}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default PickerContainer;
