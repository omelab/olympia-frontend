import Link from 'next/link';
import { IoMdOptions } from 'react-icons/io';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentFeatures = ({ pathname }: Props) => {
  return (
    <MenuItem
      className="text-sm font-medium"
      component={<Link href="/admin/features/list" />}
      icon={<IoMdOptions className="text-xl" />}
    >
      <span className="text-sm font-medium">Features</span>

      <MenuItem
        className={pathname === '/features/list' ? 'active' : ''}
        component={<Link href="/admin/features/list" />}
      >
        <span className="text-sm font-medium">Features List</span>
      </MenuItem>
      <MenuItem
        className={pathname === '/features/create' ? 'active' : ''}
        component={<Link href="/admin/features/addFeatures" />}
      >
        <span className="text-sm font-medium">Add Features</span>
      </MenuItem>
    </MenuItem>
  );
};

export default SidebarSegmentFeatures;
