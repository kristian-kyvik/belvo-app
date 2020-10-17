import React, { useState, useEffect } from 'react';
import useSwr from 'swr'
import Link from 'next/link'
import Head from 'next/head'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    const asyncFetchLinks = async () => {
      const res = await fetch('/api/links')
      const data = await res.json()
      setData(data);
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

  //if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log('data', data)

  return (
    <div>
      <Head>
        <title>Belvo app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {
          //<script src="https://cdn.belvo.io/belvo-widget-1-stable.js" async></script>
        }
        <script src="https://cdn.belvo.io/belvo-widget-sandbox-1-stable.js"></script>
      </Head>
      <div id="belvo"></div>
      <button onClick={openBelvoWidget}>Add bank account</button>
      <h2>Existing links</h2>
      <ul>
        {data.map((link) => (
          <li key={link.id}>
            <Link href="/banks/[id]" as={`/banks/${link.id}`}>
              <div>
                <div>id: {link.id}</div>
                <div>institution: {link.institution}</div>
                <div>access_mode: {link.access_mode}</div>
                <div>last_accesed_at: {link.last_accesed_at}</div>
                <div>status: {link.status}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
