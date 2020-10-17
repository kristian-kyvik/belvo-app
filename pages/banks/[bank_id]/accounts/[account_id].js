import useSwr from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';

export default function Index() {
  const router = useRouter()
  const { bank_id } = router.query
  const [data, setData] = useState({ transactionsData: [] });

    useEffect(() => {
      const fetchData = async () => {
        const transactionsRes = await fetch('/api/transactions')
        const transactionsData = await transactionsRes.json()

        setData({
          transactionsData, 
        });
      };

      try {
        fetchData();
      } catch(err) {
        console.log('err', err)
      }
    }, []);


  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {data.transactionsData.map((t) => (
          <li key={t.id}>
            {t.id}
          </li>
        ))}
      </ul>
    </div>
  )
}