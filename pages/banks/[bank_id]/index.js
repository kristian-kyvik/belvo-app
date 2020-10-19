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

      setData({
        accountsData, 
        balancesData, 
        ownersData, 
        statementsData,
        institutionsData,
      });
    }

    try {
      asyncFetchData()
    } catch(err) {
      console.log('err', err)
    }
  }, [router]);

  const currencyFlags = {
    MXN: <span clasasName="" role="img">🇲🇽</span>,
  };

  const linkIcon = (
    <svg className="h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )

  const getInstitution = (institution) => data.institutionsData && data.institutionsData.find(i => i.name == institution)
  console.log('DATA LINK PAGE', data)
  return (
    <div className="container py-16 mx-auto flex flex-wrap">
      <SlidePanel open={sidePanelState} handler={setSidePanelState} JSON={sidePanelJSON}/>
      <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Link data</h1>
        <pre className="text-gray-600">{data.accountsData && `id: ${data.accountsData[0].link}`}</pre>
      </div>
      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3">Owners</h2>
      { !data.ownersData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {data.ownersData && data.ownersData.map((owner) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-lg text-gray-900 font-medium title-font">{owner.display_name}</h2>
                </div>
                <span className="leading-relaxed text-gray-600 text-small">{owner.email}</span>
              </div>
              <svg className="cursor-pointer absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(owner); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
        ))}
      </div>
      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3">Accounts</h2>
      { !data.accountsData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {data.accountsData && data.accountsData.map((account) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div className="h-5 w-5 rounded-full float-right" src="https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80">
                  {currencyFlags[account.currency]}
                </div>
                <Link key={account.id} href="/banks/[bank_id]/accounts/[account_id]" as={`/banks/${bank_id}/accounts/${account.id}`}>
                  <div>
                    <h2 className="text-lg cursor-pointer text-gray-900 font-medium title-font">{account.name} {linkIcon}</h2>
                  </div>
                </Link>
                <span className="leading-relaxed text-gray-600 text-small">{account.currency}</span>
                <div className="font-mono font-light text-gray-900 text-2xl leading-none mb-2 truncate pt-4">${account.balance.current}</div>
              </div>
              <svg className="cursor-pointer absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(account); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeaWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
        ))}
      </div>
      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3">Balances</h2>
      { !data.balancesData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {data.balancesData && data.balancesData.map((balance) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-lg text-gray-900 font-medium title-font">{balance.display_name}</h2>
                </div>
                <span className="leading-relaxed text-gray-600 text-small">{balance.email}</span>
              </div>
              <svg className="cursor-pointer absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(balance); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
        ))}
      </div>
      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3">Statements</h2>
      { !data.statementsData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {data.statementsData && data.statementsData.map((statement) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-lg text-gray-900 font-medium title-font">{statement.display_name}</h2>
                </div>
                <span className="leading-relaxed text-gray-600 text-small">{statement.email}</span>
              </div>
              <svg className="cursor-pointer absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(statement); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
        ))}
      </div>
    </div>
  )
}