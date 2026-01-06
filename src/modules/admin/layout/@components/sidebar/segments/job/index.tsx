import Link from 'next/link';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentJob = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="Jobs"
      icon={<AiOutlineFileSearch className="text-xl" />}
    >
      <MenuItem
        className={pathname === '/job/list' ? 'active' : ''}
        component={<Link href="/job/list" />}
      >
        <span className="text-sm font-medium">All Jobs</span>
      </MenuItem>
      <MenuItem
        className={pathname === '/job/add' ? 'active' : ''}
        component={<Link href="/job/add" />}
      >
        <span className="text-sm font-medium">Add Job</span>
      </MenuItem>
      <MenuItem
        className={pathname === '/job/categories' ? 'active' : ''}
        component={<Link href="/job/categories" />}
      >
        <span className="text-sm font-medium">Categories</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentJob;
