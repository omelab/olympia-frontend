import Link from 'next/link';
import { GoComment } from 'react-icons/go';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentComment = ({ pathname }: Props) => {
  return (
    <MenuItem
      active={pathname === '/admin/comment'}
      className={pathname === '/admin/comment' ? 'active' : ''}
      component={<Link href="/admin/comment" />}
      icon={<GoComment className="text-lg" />}
    >
      <span className="text-sm font-medium">Comment</span>
    </MenuItem>
  );
};

export default SidebarSegmentComment;
