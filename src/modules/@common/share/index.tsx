'use client';

import { BsTwitterX } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { FiLinkedin } from 'react-icons/fi';
import { RiFacebookBoxLine } from 'react-icons/ri';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

type ShareProps = {
  sharedUrl: string;
  ulClassName?: string;
  liClassName?: string;
};

const ShareButtons: React.FC<ShareProps> = ({
  sharedUrl,
  ulClassName,
  liClassName,
}) => {
  return (
    <ul className={`${ulClassName}`}>
      <li className={liClassName}>
        <FacebookShareButton url={sharedUrl}>
          <RiFacebookBoxLine className="text-[24px] transition-all hover:text-primary" />
        </FacebookShareButton>
      </li>
      <li className={liClassName}>
        <TwitterShareButton url={sharedUrl}>
          <BsTwitterX className="text-[18px] transition-all hover:text-primary" />
        </TwitterShareButton>
      </li>
      <li className={liClassName}>
        <WhatsappShareButton url={sharedUrl}>
          <FaWhatsapp className="text-[24px] transition-all hover:text-primary" />
        </WhatsappShareButton>
      </li>
      <li className={liClassName}>
        <LinkedinShareButton url={sharedUrl}>
          <FiLinkedin className="text-[24px] transition-all hover:text-primary" />
        </LinkedinShareButton>
      </li>
    </ul>
  );
};

export default ShareButtons;
