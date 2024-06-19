import Button from "../../components/button";
import PageHeader from "../../components/page-header";
import TransactionItem from "../../components/transaction-item";
import TransactionSummaryItem from "../../components/transaction-summary-item";
import Trend from "../../components/trend";

export default function Page(params) {
  return (
    <main>
      <h1 className="text-4xl mt-8">Playground</h1>
      <div>
        <h2 className="mb-4 text-large font-mono">PageHeader</h2>
        <hr className="mb-4 border-grey-200 dark:border-grey-800" />
        <div>
          <PageHeader />
        </div>
      </div>
      <div className="my-8">
        <h2 className="mb-4 text-large font-mono">Trend</h2>
        <hr className="mb-4 border-grey-200 dark:border-grey-800" />
        <div className="flex space-x-8">
          <Trend type="income" amount={2000} prevAmount={1522} />
          <Trend type="expense" amount={50} prevAmount={51} />
          <Trend type="investment" amount={100} prevAmount={79} />
          <Trend type="saving" amount={20} prevAmount={200} />
        </div>
      </div>
      <div className="my-8">
        <h2 className="mb-4 text-large font-mono">Transaction Items</h2>
        <hr className="mb-4 border-grey-200 dark:border-grey-800" />
        <div className="space-y-4">
          <TransactionItem type="income" description="Salary" amount={1522} />
          <TransactionItem
            type="expense"
            description="Food"
            category="Food"
            amount={1522}
          />
          <TransactionItem
            type="saving"
            description="For Children"
            amount={1522}
          />
          <TransactionItem
            type="investment"
            description="Microsoft"
            amount={1522}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">
          TransactionSummaryItem + TransactionItem
        </h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <TransactionSummaryItem date="2024-05-01" amount={3500} />
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <TransactionItem type="income" description="Salary" amount={2000} />
          <TransactionItem
            type="expense"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="saving"
            description="For children"
            amount={500}
          />
          <TransactionItem
            type="investment"
            description="In Microsoft"
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-x-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>

          <Button size="xs">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>
    </main>
  );
}
