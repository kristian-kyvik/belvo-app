import useSwr from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';

export default function Index() {
  const router = useRouter()
  const { bank_id } = router.query

  const [data, setData] = useState({ accountsData: [], balancesData: [], ownersData: [], statementsData: [] });

    useEffect(() => {
      const fetchData =  async () => {
        console.log('bank_id', bank_id)

        if (!bank_id) return

        const accountRes = await fetch(`/api/accounts/?link=${bank_id}`)
        const accountsData = await accountRes.json()

        const balancesRes = await fetch(`/api/balances/?link=${bank_id}`)
        const balancesData = await balancesRes.json()

        const ownersRes = await  fetch(`/api/owners/?link=${bank_id}`)
        const ownersData = await ownersRes.json()

        const statementsRes = await fetch(`/api/statements/?link=${bank_id}`)
        const statementsData = await statementsRes.json()

        setData({
          accountsData, 
          balancesData, 
          ownersData, 
          statementsData
        });
      };

      try {
        fetchData();
      } catch(err) {
        console.log('err', err)
      }
    }, [router]);


  return (
    <div>
      <h2>Bank details</h2>

      <h2>Accounts</h2>

      <ul>
        {data.accountsData.map((account) => (
          <li key={account.id}>
            <Link href="/banks/[bank_id]/accounts/[account_id]" as={`/banks/${bank_id}/accounts/${account.id}`}>
            <a>{`account ${account.id}`} {`name ${account.name}`}</a>
            </Link>
          </li>
        ))}
      </ul>

      <h2>Balances</h2>

      <ul>
        {data.balancesData.map((balance) => (
          <li key={balance.id}>
            <a>{`balance ${balance.id}`}</a>
          </li>
        ))}
      </ul>

      <h2>Owners</h2>

      <ul>
        {data.ownersData.map((owner) => (
          <li key={owner.id}>
            <a>{`owner ${owner.id}`}</a>
          </li>
        ))}
      </ul>

      <h2>Statements</h2>

      <ul>
        {data.statementsData.map((statement) => (
          <li key={statement.id}>
            <a>{`owner ${statement.id}`}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}