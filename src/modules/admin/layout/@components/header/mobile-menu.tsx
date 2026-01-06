'use client';

import type { SetStateAction } from 'react';
import { GrMenu } from 'react-icons/gr';

type MobileMenuProps = {
  toggled: boolean;
  setToggled: React.Dispatch<SetStateAction<boolean>>;
};

export function MobileMenu({ setToggled, toggled }: MobileMenuProps) {
  return (
    <button onClick={() => setToggled(!toggled)} className="block lg:hidden">
      <GrMenu />
    </button>
  );
}
