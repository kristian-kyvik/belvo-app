import React, { useState, useEffect } from 'react';
import useSwr from 'swr'
import Link from 'next/link'
import Head from 'next/head'
import Spinner from "../components/Spinner";
import SlidePanel from "../components/SlidePanel";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {

  const [data, setData] = useState({ institutionsData: null, linksData: null });
  const [sidePanelState, setSidePanelState] = useState(false);
  const [sidePanelJSON, setSidePanelJSON] = useState({});
  
  useEffect(() => {
    const asyncFetchData = async () => {
      let [linksData, institutionsData] = await Promise.all([
        fetch('/api/links').then(response => response.json()),
        fetch('/api/institutions').then(response => response.json()),
       ]);
      setData({ linksData, institutionsData });
    }
    asyncFetchData();
  }, []);

  const onEventCallbackFunction = (data) => {
   // Do something with the event data
   console.log('event data', data)
  }
  
  const onExitCallbackFunction = (data) => {
   // Do something with the exit data
   console.log('exit data', data)
  }
  
  const successCallbackFunction = (link_id, institution) => {
   // Do something with the link_id or institution name
   console.log('link_id', link_id, institution)
  }

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

  const linkIcon = (
    <svg className="h-4 w-4 inline cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )

  const getInstitution = (institution) => data.institutionsData.find(i => i.name == institution)

  //if (error) return <div>Failed to load</div>

  const bankLinks = data.linksData && data.linksData.filter(l => !l.institution.includes('fiscal'))
  const fiscalLinks = data.linksData && data.linksData.filter(l => l.institution.includes('fiscal'))
  
  console.log('DATA LINKS PAGE', data)

  return (
    <div className="container py-16 mx-auto flex flex-wrap">
      <SlidePanel open={sidePanelState} handler={setSidePanelState} JSON={sidePanelJSON}/>
      <div id="belvo"></div>
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Links</h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-base">An overview of your existing links and their status</p>
        <a className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openBelvoWidget}>Add new link</a>
      </div>

      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3 w-full">Bank Links</h2>
      { (!bankLinks || !data.institutionsData) && <Spinner/>}
      <div className="flex flex-wrap -m-4 pb-10">
        { bankLinks && bankLinks.map((link) => (
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <svg className="cursor-pointer border-blue-400 float-right h-5 w-5 m-6 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(link); setSidePanelState(true); }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div className="p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <img src={getInstitution(link.institution).logo}/>
              </div>
              <Link className="" key={link.id} href="/banks/[id]" as={`/banks/${link.id}`}>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-3 cursor-pointer">{getInstitution(link.institution).display_name} {linkIcon}</h2>
              </Link>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${link.status === 'valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {link.status}
              </span>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                {link.access_mode}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-medium title-font mb-2 text-gray-900 mb-3 flex-1">Fiscal Links</h2>

      { (!fiscalLinks || !data.institutionsData) && <Spinner/>}
      <div className="flex flex-wrap -m-4 w-full pb-10">
        {fiscalLinks && fiscalLinks.map((link) => (
          <div className="xl:w-1/3 w-1/2 p-4">
            <svg className="cursor-pointer border-blue-400 float-right h-5 w-5 m-6 text-gray-600 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setSidePanelJSON(link); setSidePanelState(true); }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div className="p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <img src={getInstitution(link.institution).logo}/>
              </div>
              <Link className="" key={link.id} href="/fiscal/[id]" as={`/fiscal/${link.id}`}>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-3 cursor-pointer">{getInstitution(link.institution).display_name} {linkIcon}</h2>
              </Link>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${link.status === 'valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {link.status}
              </span>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                {link.access_mode}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
