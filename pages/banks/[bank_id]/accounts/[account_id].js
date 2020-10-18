import useSwr from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import Spinner from "../../../../components/Spinner";
import SlidePanel from "../../../../components/SlidePanel";

export default function Index() {
  const router = useRouter()
  const { bank_id } = router.query
  const [data, setData] = useState({ transactionsData: null });
  const [sidePanelState, setSidePanelState] = useState(false);
  const [sidePanelJSON, setSidePanelJSON] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        if (!bank_id) return

        const transactionsRes = await fetch(`/api/transactions/?link=${bank_id}`)
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
    }, [router]);

    console.log('DATA TRANSACTION PAGE', data)

  return (
    <div className="container py-16 mx-auto">
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Transactions</h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-base">Here is an overview over your last transactions</p>
      </div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Transaction id
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Ammount
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Inspect
                    </th>
                    <th class="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  {!data.transactionsData ? <tr className="absolute w-full"><Spinner/></tr> : data.transactionsData.map((t) => (
                    <tr>
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm leading-5 font-medium text-gray-900">
                              {t.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <div class="text-sm leading-5 text-gray-900">{t.value_date}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {t.status}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {t.currency}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        <a href="#" class="text-indigo-600 hover:text-indigo-900">{t.amount}</a>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap">
                        <svg className="h-5 w-5 mx-3 text-gray-600 hover:text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(t); setSidePanelState(true); }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SlidePanel open={sidePanelState} handler={setSidePanelState} JSON={sidePanelJSON}/>
    </div>
  )
}

