import { Suspense } from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { createClient } from "../../lib/supabase/server";
import { variants, sizes } from "../../lib/variants";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";

const trends = ["income", "expense", "saving", "investment"];

const getLinkClasses = () =>
  `flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`;

export default function Page() {
  const client = createClient();
  console.log(client.from("transactions").select());

  return (
    <>
      <section>
        <div className="text-4xl">Summary</div>
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {trends.map((type) => (
          <Suspense fallback={<TrendFallback />}>
            <Trend type={type} />
          </Suspense>
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
