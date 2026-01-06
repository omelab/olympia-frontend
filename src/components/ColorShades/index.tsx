'use client';
import React, { useEffect, useState } from 'react';

const ColorShades = () => {
  const [shades, setShades] = useState([]);

  useEffect(() => {
    const fetchShades = async () => {
      const res = await fetch('/api/color-shade');
      const result: any = await res.json();
      setShades(result.data);
    };
    fetchShades();
  }, []);

  return (
    <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-3 px-4">
      {shades.map((shade: any, index) => (
        <button
          type="button"
          key={`${shade.name}_${index}`}
          className="h-32 w-full max-w-full cursor-pointer rounded-md border-2 border-white shadow-lg transition-transform hover:scale-105 shadebtn"
          style={{
            backgroundColor: shade.background,
            color: '#000',
            padding: '10px',
            margin: '5px 0',
          }}
        >
          <h3 className="shadeCardName">{shade.name}</h3>
        </button>
      ))}
    </div>
  );
};

export default ColorShades;
