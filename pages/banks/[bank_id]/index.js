import useSwr from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import Spinner from "../../../components/Spinner";

export default function Index() {
  const router = useRouter()
  const { bank_id } = router.query

  const [data, setData] = useState({ accountsData: null, balancesData: null, ownersData: null, statementsData: null });

    useEffect(() => {
      const asyncFetchData = async () => {
        if (!bank_id) return

        let [accountsData, balancesData, ownersData, statementsData] = await Promise.all([
          fetch(`/api/accounts/?link=${bank_id}`).then(response => response.json()),
          fetch(`/api/balances/?link=${bank_id}`).then(response => response.json()),
          fetch(`/api/owners/?link=${bank_id}`).then(response => response.json()),
          fetch(`/api/statements/?link=${bank_id}`).then(response => response.json()),
         ]);
        setData({
          accountsData, 
          balancesData, 
          ownersData, 
          statementsData,
        });
      }

      try {
        asyncFetchData()
      } catch(err) {
        console.log('err', err)
      }
    }, [router]);

  console.log(data.ownersData)
  return (
    <div className="container py-16 mx-auto flex flex-wrap">
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Link data</h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-base">{data && data.ownersData && `Owner: ${data.ownersData[0].first_name}`}</p>
      </div>
      { !data.accountsData && <Spinner/>}
      <div className="flex flex-wrap -m-4">
        {data.accountsData && data.accountsData.map((account) => (
          <Link key={account.id} href="/banks/[bank_id]/accounts/[account_id]" as={`/banks/${bank_id}/accounts/${account.id}`}>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2"></h2>
                <p className="leading-relaxed text-large">{account.id}</p>
                <span className="leading-relaxed text-small">{account.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// <h2>Balances</h2>

// <ul>
//   {data.balancesData.map((balance) => (
//     <li key={balance.id}>
//       <a>{`balance ${balance.id}`}</a>
//     </li>
//   ))}
// </ul>


// <h2>Statements</h2>

// <ul>
//   {data.statementsData.map((statement) => (
//     <li key={statement.id}>
//       <a>{`owner ${statement.id}`}</a>
//     </li>
//   ))}
// </ul>