import { Suspense } from "react";

import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { variants, sizes } from "../../lib/variants";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";

export default function Page() {
  return (
    <>
      <section>
        <div className="text-4xl">Summary</div>
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense fallback={<TrendFallback />}>
          <Trend type="income" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="expense" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="saving" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="investment" />
        </Suspense>
      </section>
      <section className="flex justify-between item-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
          href="/dashboard/transactions/add"
        >
          <PlusCircle className="w-d h-4" />
          <div className="add">Add</div>
        </Link>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
