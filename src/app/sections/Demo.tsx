export function Demo() {
  return (
    <div
      className="min-h-screen border border-red-500  xl:pt-20 pb-10 w-full"
      id="demo"
    >
      <section
        className="sticky top-0 backdrop-blur-md py-8 px-6 sm:px-15 z-20 xl:hidden"
        style={{ paddingTop: `calc(env(safe-area-inset-top) + 2rem)` }}
      >
        <h1 className="uppercase font-bold text-lg tracking-widest block ">
          Demo
        </h1>
      </section>

      <section className="p-6">This is going to be my demo</section>
    </div>
  );
}
