import Button from '../Button';

export default function ConsultancyForm() {
  return (
    <form className="mx-auto grid grid-cols-1 lg:grid-cols-4 max-w-7xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-4">
      <header className="uppercase text-primary">
        <h4 className="text-2xl font-bold leading-6">Need Consultancy?</h4>
        <p>Our Representative will connect to you</p>
      </header>

      <div className="col-span-3">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              required
              minLength={3}
              maxLength={20}
              className="block w-full border-2 border-primary p-2 text-base outline-none placeholder:text-sm placeholder:text-[#595959] md:w-64"
            />
          </div>
          <div>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              minLength={11}
              maxLength={14}
              placeholder="Enter Your Mobile Number"
              className="block w-full border-2 border-primary p-2 text-base outline-none placeholder:text-sm placeholder:text-[#595959] md:w-64"
            />
          </div>

          <Button classNames="w-full md:w-52 hover:bg-primary/90">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
