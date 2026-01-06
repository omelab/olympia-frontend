'use client';
import React, { useState, useEffect } from 'react';
import './color-guide.scss';
import rooms from './rooms.json';
import palettes from './palettes.json';
import { Palette, Pattern, Room } from './types';
import PickerContainer from './PickerContainer';

export const ColorGuide = () => {
  const [activeRoom, setActiveRoom] = useState<Room | undefined>(undefined);
  const [activePalette, setActivePalette] = useState<Palette | undefined>(
    undefined,
  );
  const [activePattern, setActivePattern] = useState<Pattern | undefined>(
    undefined,
  );

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setActiveRoom(rooms[0]);
    }

    if (palettes && palettes.length > 0) {
      setActivePalette(palettes[0]);
    }
  }, []);

  const handleRoom = (roomData: Room) => {
    setActiveRoom(roomData);
  };

  const handlePalette = (palette: Palette) => {
    setActivePalette(palette);
  };

  const handlePattern = (ptrn: Pattern) => {
    setActivePattern(ptrn);
  };

  return (
    <div className="colorguide">
      <div className="parent-color">
        <span className="guideBtn"> Colour Guide </span>
        <h3 className="guideTitle"> Your Home's Dream Look </h3>
        <h2 className="guideTitle"> Starts With A Single Click</h2>
        <div className="room-selection">
          {rooms.map((room, index) => {
            return (
              <button
                key={`room${index}`}
                className={`selector ${activeRoom?.name == room.name ? 'active' : ''}`}
                style={{
                  backgroundImage: `url(/assets/misc/${room.image})`,
                }}
                onClick={() => handleRoom(room)}
              >
                <span
                  className={`selector-btns ${activeRoom?.name == room.name ? 'active-btn' : ''}`}
                >
                  {room.name}
                </span>
              </button>
            );
          })}
        </div>
        <div className="parentPallet">
          {palettes.map((palette, index) => {
            return (
              <button
                id={`palette_${index}`}
                key={`palette_${index}`}
                style={{ backgroundColor: palette.background }}
                onClick={() => handlePalette(palette)}
              ></button>
            );
          })}
        </div>
      </div>
      <div className="color-picker-container">
        <PickerContainer
          activeRoom={activeRoom}
          activePattern={activePattern}
        />

        <div className="child-fix">
          <div id="childPalette">
            {activePalette?.childrens &&
              activePalette?.childrens.length > 0 &&
              activePalette?.childrens.map((ptrn, index) => (
                <button
                  key={`pattern_${index}`}
                  id={`pattern_${index}`}
                  className="162"
                  style={{ backgroundColor: ptrn.bg }}
                  onClick={() => handlePattern(ptrn)}
                ></button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ColorGuide;
