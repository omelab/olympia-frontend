import Link from 'next/link';
import { GrMultimedia } from 'react-icons/gr';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentMedia = ({ pathname }: Props) => {
  return (
    <MenuItem
      active={pathname === '/admin/media'}
      className={pathname === '/admin/media' ? 'active' : ''}
      component={<Link href="/admin/media" />}
      icon={<GrMultimedia className="text-lg" />}
    >
      <span className="text-sm font-medium">Media</span>
    </MenuItem>
  );
};

export default SidebarSegmentMedia;
