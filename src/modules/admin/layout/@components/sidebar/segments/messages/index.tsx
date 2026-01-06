import Link from 'next/link';
import { TbMessageUser } from 'react-icons/tb';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentMessages = ({ pathname }: Props) => {
  return (
    <MenuItem
      active={pathname === '/admin/messages'}
      className={pathname === '/admin/messages' ? 'active' : ''}
      component={<Link href="/admin/messages" />}
      icon={<TbMessageUser className="text-lg" />}
    >
      <span className="text-sm font-medium">Messages</span>
    </MenuItem>
  );
};

export default SidebarSegmentMessages;
