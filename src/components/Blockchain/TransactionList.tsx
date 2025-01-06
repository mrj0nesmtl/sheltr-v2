interface TransactionListProps {
  limit?: number;
  className?: string;
}

export const TransactionList = ({ limit = 5, className }: TransactionListProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
      {/* Transaction list content */}
    </div>
  );
};

// Make sure we have a default export as well
export default TransactionList;
