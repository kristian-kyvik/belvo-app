import useSwr from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import Spinner from "../../components/Spinner";
import SlidePanel from "../../components/SlidePanel";

export default function Index() {
  const router = useRouter()
  const { link_id } = router.query

  const [data, setData] = useState({ invoicesData: null, taxReturnsData: null, taxStatusData: null });
  const [sidePanelState, setSidePanelState] = useState(false);
  const [sidePanelJSON, setSidePanelJSON] = useState({});
  
  useEffect(() => {
    const asyncFetchData = async () => {
      if (!link_id) return

      let [invoicesData, taxReturnsData, taxStatusData] = await Promise.all([
        fetch(`/api/invoices/?link=${link_id}`).then(response => response.json()),
        fetch(`/api/tax-returns/?link=${link_id}`).then(response => response.json()),
        fetch(`/api/tax-status/?link=${link_id}`).then(response => response.json()),
       ]);

      setData({
        invoicesData, 
        taxReturnsData, 
        taxStatusData
      });
    }

    try {
      asyncFetchData()
    } catch(err) {
      console.log('err', err)
    }
  }, [router]);

  const linkIcon = (
    <svg className="h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )

  const getInstitution = (institution) => data.institutionsData && data.institutionsData.find(i => i.name == institution)
  console.log('DATA FISCAL PAGE', data)
  return (
    <div className="container py-16 mx-auto flex flex-wrap">
      <SlidePanel open={sidePanelState} handler={setSidePanelState} JSON={sidePanelJSON}/>
      <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Fiscal data (mocked)</h1>
        <pre className="text-gray-600">{data.accountsData && `id: ${data.accountsData[0].link}`}</pre>
      </div>
      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3">Invoices</h2>
      { !data.invoicesData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {
          data.invoicesData && data.invoicesData.map((invoice) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-lg text-gray-900 font-medium title-font">{invoice.invoice_type}</h2>
                </div>
                <div className="leading-relaxed text-gray-600 text-small">{invoice.invoice_date}</div>
                <div className="leading-relaxed text-gray-600 text-small">Sender: {invoice.sender_name}</div>
                <div className="leading-relaxed text-gray-600 text-small">Receiver: {invoice.receiver_name}</div>
              </div>
              <svg className="cursor-pointer absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(invoice); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
        ))
        }
      </div>
      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3">Tax returns</h2>
      { !data.taxReturnsData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {
          data.taxReturnsData && data.taxReturnsData.map((taxReturn) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-lg text-gray-900 font-medium title-font">{taxReturn.invoice_type}</h2>
                </div>
                <div className="leading-relaxed text-gray-600 text-small">{taxReturn.collected_at}</div>
              </div>
              <svg className="cursor-pointer absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(taxReturn); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
        ))
        }
      </div>
      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3">Tax status</h2>
      { !data.taxStatusData && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {
          data.taxStatusData && data.taxStatusData.map((taxStatus) => (
            <div className="xl:w-1/3 md:w-1/2 p-4 relative">
              <div className="p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-lg text-gray-900 font-medium title-font">{taxStatus.official_name}</h2>
                </div>
                <div className="leading-relaxed text-gray-600 text-small">{taxStatus.collected_at}</div>
                <div className="leading-relaxed text-gray-600 text-small">{taxStatus.place_and_date_of_issuance}</div>
              </div>
              <svg className="cursor-pointer absolute right-0 bottom-0 h-5 w-5 m-10 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(taxStatus); setSidePanelState(true); }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
        ))
        }
      </div>
    </div>
  )
}