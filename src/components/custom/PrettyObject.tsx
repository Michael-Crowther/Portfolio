export function PrettyObject({ children }: { children: unknown }) {
  return (
    <div className="flex leading-tight flex-col gap-2  p-2 text-primary text-sm overflow-hidden">
      {/* <p className="border-b text-center">Object</p> */}
      <pre>{JSON.stringify(children, null, "\t")}</pre>
    </div>
  );
}
