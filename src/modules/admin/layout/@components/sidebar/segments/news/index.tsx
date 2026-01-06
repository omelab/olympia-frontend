import Link from 'next/link';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
  menuItems?: Array<string>;
};

const SidebarSegmentProducts = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="Blogs"
      icon={<HiOutlineNewspaper className="text-xl" />}
      defaultOpen={pathname?.includes('/admin/news')}
    >
      <MenuItem
        active={pathname === '/admin/news'}
        className={pathname === '/news' ? 'active' : ''}
        component={<Link href="/admin/news" />}
      >
        <span className="text-sm font-medium">All Blog</span>
      </MenuItem>

      <MenuItem
        active={pathname === '/admin/news/add'}
        className={pathname === '/news/add' ? 'active' : ''}
        component={<Link href="/admin/news/add" />}
      >
        <span className="text-sm font-medium">Add Blog</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentProducts;
