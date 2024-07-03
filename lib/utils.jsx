export const groupAndSumTransactionsByDate = (transactions) => {
  const grouped = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);
    const amount =
      transaction.type.toLowerCase() === "expense"
        ? -transaction.amount
        : transaction.amount;
    grouped[date].amount += amount;
  }
  return grouped;
};
