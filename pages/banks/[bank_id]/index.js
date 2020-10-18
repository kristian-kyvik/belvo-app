import useSwr from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import Spinner from "../../../components/Spinner";
import SlidePanel from "../../../components/SlidePanel";

export default function Index() {
  const router = useRouter()
  const { bank_id } = router.query

  const [data, setData] = useState({ accountsData: null, balancesData: null, ownersData: null, statementsData: null, institutionsData: null });
  const [sidePanelState, setSidePanelState] = useState(false);
  const [sidePanelJSON, setSidePanelJSON] = useState({});
  
  useEffect(() => {
    const asyncFetchData = async () => {
      if (!bank_id) return

      let [accountsData, balancesData, ownersData, statementsData, institutionsData] = await Promise.all([
        fetch(`/api/accounts/?link=${bank_id}`).then(response => response.json()),
        fetch(`/api/balances/?link=${bank_id}`).then(response => response.json()),
        fetch(`/api/owners/?link=${bank_id}`).then(response => response.json()),
        fetch(`/api/statements/?link=${bank_id}`).then(response => response.json()),
        fetch('/api/institutions').then(response => response.json()),

       ]);

    console.log('institutionsData', institutionsData)
      setData({
        accountsData, 
        balancesData, 
        ownersData, 
        statementsData,
        //institutionsData,
      });
    }

    try {
      asyncFetchData()
    } catch(err) {
      console.log('err', err)
    }
  }, [router]);

  console.log(data.ownersData)

  const currencyFlags = {
    MXN: <span clasasName="" role="img">🇲🇽</span>,
  };

  const getInstitution = (institution) => data.institutionsData && data.institutionsData.find(i => i.name == institution)

  //getInstitution(account.institution.name)
  return (
    <div className="container py-16 mx-auto flex flex-wrap">
      <SlidePanel open={sidePanelState} handler={setSidePanelState} JSON={sidePanelJSON}/>
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Link data</h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-base">{data && data.ownersData && `${data.ownersData[0].display_name}`}</p>
        <p className="lg:w-1/2 w-full leading-relaxed text-base">{data && data.ownersData && `${data.ownersData[0].email}`}</p>
        <svg className="h-5 w-5 m-2 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(data.ownersData); setSidePanelState(true); }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
      { !data.accountsData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full">
        {data.accountsData && data.accountsData.map((account) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div className="h-5 w-5 rounded-full float-right" src="https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80">
                  {currencyFlags[account.currency]}
                </div>
                <Link key={account.id} href="/banks/[bank_id]/accounts/[account_id]" as={`/banks/${bank_id}/accounts/${account.id}`}>
                  <div>
                    <h2 className="text-lg text-gray-900 font-medium title-font">{account.name}</h2>
                  </div>
                </Link>
                <span className="leading-relaxed text-gray-600 text-small">{account.currency}</span>
                <div className="font-mono font-light text-gray-900 text-2xl leading-none mb-2 truncate pt-4">${account.balance.current}</div>
              </div>
              <svg className="absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(account); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
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