import Link from 'next/link';
import { GiSettingsKnobs } from 'react-icons/gi';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentGallery = ({ pathname }: Props) => {
  return (
    <MenuItem
      active={pathname === '/admin/gallery'}
      className={pathname === '/admin/gallery' ? 'active' : ''}
      component={<Link href="/admin/gallery" />}
      icon={<GiSettingsKnobs className="text-lg" />}
    >
      <span className="text-sm font-medium">Gallery</span>
    </MenuItem>
  );
};

export default SidebarSegmentGallery;
