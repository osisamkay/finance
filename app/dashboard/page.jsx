import { Suspense } from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { ErrorBoundary } from "react-error-boundary";

import Range from "../../components/range";
import { types } from "../../lib/consts";
import { createClient } from "../../lib/supabase/server";
import { variants, sizes } from "../../lib/variants";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";

const getLinkClasses = () =>
  `flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`;

export default function Page({ searchParams }) {
  const range = searchParams?.range ?? "last30days";
  return (
    <>
      <section className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range />
        </aside>
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {types.map((type) => (
          <ErrorBoundary
            fallback={
              <div className="flex justify-center my-5 ">
                Cannot Fetch trend {type} data
              </div>
            }
          >
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>
      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link className={getLinkClasses()} href="/dashboard/transactions/add">
          <PlusCircle className="w-4 h-4" />
          <div className="add">Add</div>
        </Link>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
