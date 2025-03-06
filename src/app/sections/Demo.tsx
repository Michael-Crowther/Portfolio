export function Demo() {
  return (
    <div
      className="min-h-screen border border-red-500  xl:pt-20 pb-10 w-full"
      id="demo"
    >
      <section
        className="sticky top-0 backdrop-blur py-8 px-0 sm:px-9 z-50 xl:hidden"
        style={{ paddingTop: `calc(env(safe-area-inset-top) + 2rem)` }}
      >
        <h1 className="uppercase font-bold text-lg tracking-widest block ">
          Demo
        </h1>
      </section>

      <section>This is going to be my demo</section>
    </div>
  );
}
