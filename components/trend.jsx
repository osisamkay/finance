import { useMemo } from "react";
import { ArrowDownLeft } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export default function Trend({ type, amount, prevAmount }) {
  const colorClasses = {
    income: "text-green-700 dark:text-green-300",
    expense: "text-red-700 dark:text-red-300",
    investment: "text-indigo-700 dark:text-indigo-300",
    saving: "text-yellow-700 dark:text-yellow-300",
  };

  const calcPercentageChange = (amount, prevAmount) => {
    if (!prevAmount || !amount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  const percentageChange = useMemo(() =>
    calcPercentageChange(amount, prevAmount).toFixed(0)
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white">
        {amount ? formatCurrency(amount) : formatCurrency(0)}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {percentageChange <= 0 && <ArrowDownLeft color="red" />}
        {percentageChange >= 0 && <ArrowUpRight color="green" />}
        {percentageChange}% vs last Period
      </div>
    </div>
  );
}
<ArrowDownLeft color="#cb1010" />;
