import Link from 'next/link';
import { AiOutlineSetting } from 'react-icons/ai';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentSettings = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="Settings"
      icon={<AiOutlineSetting className="text-xl" />}
    >
      <MenuItem
        active={pathname === '/admin/settings/about'}
        className={pathname === '/admin/settings/about' ? 'active' : ''}
        component={<Link href="/admin/settings/about" />}
      >
        <span className="text-sm font-medium">About</span>
      </MenuItem>
      <MenuItem
        active={pathname === '/admin/settings/slider'}
        className={pathname === '/admin/settings/slider' ? 'active' : ''}
        component={<Link href="/admin/settings/slider" />}
      >
        <span className="text-sm font-medium">Slider</span>
      </MenuItem>

      <MenuItem
        active={pathname === '/admin/settings/footer'}
        className={pathname === '/admin/settings/footer' ? 'active' : ''}
        component={<Link href="/admin/settings/footer" />}
      >
        <span className="text-sm font-medium">Footer</span>
      </MenuItem>

      <MenuItem
        active={pathname === '/admin/settings/contact'}
        className={pathname === '/admin/settings/contact' ? 'active' : ''}
        component={<Link href="/admin/settings/contact" />}
      >
        <span className="text-sm font-medium">Contact</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentSettings;
