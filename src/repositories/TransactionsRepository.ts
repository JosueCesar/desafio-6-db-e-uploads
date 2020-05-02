import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(transactions: Transaction[]): Promise<Balance> {
    const income = transactions.reduce(
      (i, transaction) =>
        transaction.type === 'income' ? i + Number(transaction.value) : i,
      0,
    );
    const outcome = transactions.reduce(
      (i, transaction) =>
        transaction.type === 'outcome' ? i + Number(transaction.value) : i,
      0,
    );

    const balance: Balance = { income, outcome, total: income - outcome };

    return balance;
  }
}

export default TransactionsRepository;
