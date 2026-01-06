'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ColorCarousel() {
  const [paintImage, _] = useState(
    "/assets/images/colors/red-paints-ap35884.webp",
  );
  const colors = [
    "#f7f3e5",
    "#efe9d3",
    "#81b993",
    "#dbbdc7",
    "#a3d5af",
    "#f7bdd7",
    "#874139",
    "#ab553b",
    "#d7c9b9",
    "#a70059",
    "#4d7b9b",
    "#d9615f",
    "#019dc5",
    "#f3efeb",
    "#8dd7f7",
    "#35b9a1",
    "#59b77f",
    "#f59f9d",
    "#f59f9d",
    "#8fbdcf",
    "#8fc7a1",
    "#ffdbab",
    "#9a2e21",
    "#addde7",
    "#a78f7d",
    "#f59f9d",
    "#8fbdcf",
    "#8fc7a1",
    "#72b0ad",
    "#e7ed41",
    "#7f10d2",
    "#7cb247",
    "#51a161",
    "#1f912d",
    "#bbbc93",
    "#54eb13",
    "#e0af0f",
    "#ae98de",
    "#6c7563",
    "#36c7e8",
    "#60f832",
    "#a09103",
  ];

  return (
    <div className="mx-auto grid grid-cols-1 lg:grid-cols-2  max-w-7xl gap-5 p-5">
      {/* Left Section */}
      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative -mt-5 w-full">
          <Image
            src={paintImage}
            height={429}
            width={654}
            alt="Room styled with Marsh Green color"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center overflow-hidden text-center py-3 lg:py-0">
        <div className="-ml-12 -mr-12 grid w-full  grid-cols-7 gap-3">
          {colors.map((col, index) => (
            <button
              type="button"
              key={index}
              className="h-12 w-16 max-w-full cursor-pointer rounded-md border-2 border-white shadow-lg transition-transform hover:scale-110"
              style={{ backgroundColor: col }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
