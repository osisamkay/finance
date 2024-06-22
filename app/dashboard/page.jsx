import { Suspense } from "react";

import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";

export default function Page() {
  return (
    <>
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
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
