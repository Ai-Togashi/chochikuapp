// // 口座一覧取得UI
'use client';

import { useEffect, useState } from 'react';

type Account = {
  accountId: string;
  branchName?: string;
  accountTypeName?: string;
  accountNumber?: string;
  displayName: string; // UI表示用
};

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch('/api/acount');
        if (!res.ok) throw new Error('Failed to fetch accounts');

        const data = await res.json();

        // 通常口座のデータを整形（代表口座を除外）
        const normalAccounts: Account[] = data.accounts
        .filter((acc: any) => acc.accountId !== data.accounts[0].accountId) // 代表口座を除外
        .map((acc: any) => ({
          accountId: acc.accountId,
          branchName: acc.branchName,
          accountTypeName: acc.accountTypeName,
          accountNumber: acc.accountNumber,
          displayName: `(${acc.accountName})`, // 表示用の名前
        }));

        // 特定口座のデータを整形（親口座を除外）
        const specialAccounts: Account[] = data.spAccounts
          .filter((acc: any) => acc.spAccountTypeCodeName !== '親口座') // 親口座は別で処理するので削除
          .map((acc: any) => ({
            accountId: acc.accountId,
            branchName: acc.spAccountBranchName,
            accountTypeName: '普通預金（有利息）', // ここを固定に変更
            accountNumber: acc.spAccountNumber,
            displayName: `(${acc.spAccountName})`, // 表示用
          }));

        // 親口座のデータを修正
        const parentAccount = data.spAccounts.find((acc: any) => acc.spAccountTypeCodeName === '親口座');
        if (parentAccount) {
          const mainAccount = data.accounts[0]; // 代表口座（普通預金の口座情報）を取得
          specialAccounts.unshift({
            accountId: parentAccount.accountId,
            branchName: mainAccount.branchName,
            accountTypeName: mainAccount.accountTypeName,
            accountNumber: mainAccount.accountNumber,
            displayName: `(親口座)`, // ここを修正
          });
        }

        setAccounts([...specialAccounts, ...normalAccounts]); // 親口座を先頭にして並べる
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-white rounded">
      <h2 className="text-lg font-bold mb-4">口座一覧</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.accountId} className="p-2 border-b">
            {account.displayName} {account.branchName} {account.accountTypeName} {account.accountNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}
