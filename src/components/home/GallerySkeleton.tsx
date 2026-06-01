// src/components/home/GallerySkeleton.tsx
const cardSizes = [
  "md:col-span-2 md:row-span-2 min-h-[22rem] md:min-h-[28rem]",
  "min-h-[13rem]",
  "min-h-[13rem]",
  "min-h-[13rem]",
  "min-h-[13rem]",
  "md:col-span-2 min-h-[14rem]",
];

export function GallerySkeleton() {
  return (
    <section aria-hidden="true" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="h-4 w-40 animate-pulse rounded-full bg-surface-muted" />
            <div className="mt-5 h-12 w-80 max-w-full animate-pulse rounded-xl bg-surface-muted" />
          </div>
          <div className="h-20 w-80 max-w-full animate-pulse rounded-2xl bg-surface-muted" />
        </div>
        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-[auto_auto_auto]">
          {cardSizes.map((size, index) => (
            <div
              key={index}
              className={`${size} animate-pulse rounded-3xl border border-border bg-surface-muted`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
