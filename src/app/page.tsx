export default function Home() {
  return (
    <div className="h-screen w-full flex">
      <span className="w-1/6 hidden 2xl:block" />
      <div className="w-full flex flex-col 2xl:flex-row px-6 md:px-10 2xl:px-0">
        <section className="border border-pink-500 w-full h-full p-16 2xl:min-w-[600px] 2xl:w-1/3">
          <p className="text-[55px] font-bold">Michael Crowther</p>
          <p className="text-[20px]">Full Stack Engineer</p>
        </section>

        <section className="border border-blue-500 2xl:min-w-[900px] h-full w-full 2xl:w-2/3 flex items-center justify-center">
          Section 2
        </section>
      </div>
      <span className="w-1/6 hidden 2xl:block" />
    </div>
  );
}
