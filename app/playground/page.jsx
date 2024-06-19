import PageHeader from "../../components/page-header";
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
      <div className="my-4">
        <h2 className="mb-4 text-large font-mono">Trend</h2>
        <hr className="mb-4 border-grey-200 dark:border-grey-800" />
        <div className="flex space-x-8">
          <Trend type="income" amount={2000} prevAmount={1522} />
          <Trend type="expense" amount={50} prevAmount={51} />
          <Trend type="investment" amount={100} prevAmount={79} />
          <Trend type="saving" amount={20} prevAmount={200} />
        </div>
      </div>
    </main>
  );
}
