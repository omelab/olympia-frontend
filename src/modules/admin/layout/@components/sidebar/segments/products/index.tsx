import Link from 'next/link';
import { GoProjectRoadmap } from 'react-icons/go';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
  menuItems?: Array<string>;
};

const SidebarSegmentProducts = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="products"
      icon={<GoProjectRoadmap className="text-xl" />}
      defaultOpen={pathname?.includes('/admin/products')}
    >
      <MenuItem
        active={pathname === '/admin/products'}
        className={pathname === '/products' ? 'active' : ''}
        component={<Link href="/admin/products" />}
      >
        <span className="text-sm font-medium">All Products</span>
      </MenuItem>

      <MenuItem
        active={pathname === '/admin/products/add'}
        className={pathname === '/products/add' ? 'active' : ''}
        component={<Link href="/admin/products/add" />}
      >
        <span className="text-sm font-medium">Add Product</span>
      </MenuItem>

      <SubMenu className="text-sm font-medium" label="Categories">
        <MenuItem
          active={pathname === '/admin/categories'}
          className={pathname === '/categories' ? 'active' : ''}
          component={<Link href="/admin/categories" />}
        >
          <span className="text-sm font-medium">Category List</span>
        </MenuItem>
        <MenuItem
          active={pathname === '/admin/categories/add'}
          className={pathname === '/categories/add' ? 'active' : ''}
          component={<Link href="/admin/categories/add" />}
        >
          <span className="text-sm font-medium">Add Category</span>
        </MenuItem>
      </SubMenu>

      <MenuItem
        active={pathname === '/admin/tags'}
        className={pathname === '/tags' ? 'active' : ''}
        component={<Link href="/admin/tags" />}
      >
        <span className="text-sm font-medium">Tags</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentProducts;
