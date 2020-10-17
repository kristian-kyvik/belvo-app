import React, { useState, useEffect } from 'react';
import useSwr from 'swr'
import Link from 'next/link'
import Head from 'next/head'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {

  const [data, setData] = useState({ institutionsData: [], linksData: [] });
  
  useEffect(() => {
    const asyncFetchLinks = async () => {
      const linksRes = await fetch('/api/links')
      const linksData = await linksRes.json()

      const institutionsRes = await fetch('/api/institutions')
      const institutionsData = await institutionsRes.json()
      
      setData({ linksData, institutionsData });
    }

    asyncFetchLinks();
  }, []);

  // const onEventCallbackFunction = (data) => {
  //  // Do something with the event data
  //  console.log('event data', data)
  // }
  
  // const onExitCallbackFunction = (data) => {
  //  // Do something with the exit data
  //  console.log('exit data', data)
  // }
  
  // const successCallbackFunction = (link_id, institution) => {
  //  // Do something with the link_id or institution name
  //  console.log('link_id', link_id, institution)
  // }

  const openBelvoWidget = async () => {
    // fetch access token from server
    const res = await fetch('/api/token')
    const data = await res.json()
    const access_token = data.access

    // load belvo widget
    belvoSDK.createWidget(access_token, {
      locale: 'es', // 'en' for English or 'pt' for Portuguese
      company_name: "ACME Corp", // the name of the company to be displayed in the first screen
      //institution: 'banamex_mx_retail', // to start the widget directly on a specific institution credentials page
      //institution_types: ['fiscal', 'retail', 'business', 'gig'], // to select the type of institution to show in the widget
      // access_mode: "recurrent", // to specify the type of link to be created from the widget
      country_codes: ['MX', 'CO', 'BR'],
      callback: (link, institution) => successCallbackFunction(link, institution),
      onExit: (data) => onExitCallbackFunction(data),
      onEvent: (data) => onEventCallbackFunction(data)
    }).build();
  }

  const getInstitution = (institution) => data.institutionsData.find(i => i.name == institution)

  //if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>
  console.log(data)
  return (
    <div className="container py-16 mx-auto flex flex-wrap">
      <div id="belvo"></div>
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Existing links</h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-base">asymmetrical gentrify, subway tile poke farm-to-table.</p>
        <a className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openBelvoWidget}>Add bank account</a>
      </div>
      <div className="flex flex-wrap -m-4">
        {data.linksData.map((link) => (
          <Link key={link.id} href="/banks/[id]" as={`/banks/${link.id}`}>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <img src={getInstitution(link.institution).logo}/>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{getInstitution(link.institution).display_name}</h2>
                <p className="leading-relaxed text-large">{link.id}</p>
                <span className="leading-relaxed text-small">{link.access_mode} {link.last_accesed_at} {link.status}</span>
              </div>
            </div>
          </Link>
        ))}
        
        
      </div>
    </div>
  )
}
