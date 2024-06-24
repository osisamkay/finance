import Skeleton from "@/components/skeleton";

export default function TransactionListFallback() {
  return (
    <div className="space-y-8">
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="space-y-4">
          <TransactionSummaryItemSkeleton />
          {[...Array(4)].map((_, idx) => (
            <TransactionItemSkeleton key={idx} />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkeletonLayout({ layout }) {
  return (
    <div className="flex space-x-4">
      {layout.map((className, idx) => (
        <div key={idx} className={className}>
          <Skeleton />
        </div>
      ))}
    </div>
  );
}

function TransactionItemSkeleton() {
  return (
    <SkeletonLayout
      layout={[
        "flex items-center grow",
        "min-w-[150px] items-center hidden md:flex",
        "min-w-[70px] text-right",
        "min-w-[50px] flex justify-end",
      ]}
    />
  );
}

function TransactionSummaryItemSkeleton() {
  return <SkeletonLayout layout={["grow", "min-w-[70px]", "min-w-[50px]"]} />;
}
