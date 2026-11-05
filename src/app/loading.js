export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] items-center justify-center bg-[#FAF9F4] px-5 pb-24"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden="true"
          className="h-10 w-10 animate-spin rounded-full border-4 border-[#9DAD98]/40 border-t-[#C9A227]"
        />
        <p className="text-sm text-[#101820]/60">Loading…</p>
      </div>
    </div>
  );
}