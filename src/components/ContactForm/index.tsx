import { sendEmail } from '@/libs/send-mail';

import { RightArrowIcon } from '../Arrow';

export default function ContactForm() {
  return (
    <form className="py-8" action={sendEmail}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 font-medium text-[#595959]">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="border-b border-primary py-2 font-normal text-black focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 font-medium text-[#595959]">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="phone"
            id="phone"
            required
            className="border-b border-primary py-2 font-normal text-black focus:outline-none"
          />
        </div>

        <div className="col-span-2 font-medium text-[#595959]">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            cols={2}
            required
            className="w-full border-b border-primary py-2 font-normal text-black focus:outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-4 font-medium uppercase"
      >
        Submit
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <RightArrowIcon height="32" width="32" fill="#595959" />
        </span>
      </button>
    </form>
  );
}
