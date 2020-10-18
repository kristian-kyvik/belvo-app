import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });


export default function SlidePanel(props) {

	if (!props.open) return null;

  return (
		<div className="fixed inset-0 overflow-hidden z-10">
		  <div className="absolute inset-0 overflow-hidden">
		    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => props.handler(false)}></div>
		    <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
		      <div className="relative w-screen max-w-lg">
		        <div className="absolute right-0 pt-6 -ml-8 pr-2 flex sm:-ml-10 sm:pr-4">
		          <button aria-label="Close panel" className="text-gray-300 hover:text-white transition ease-in-out duration-150" onClick={() => props.handler(false)}>
		            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
		            </svg>
		          </button>
		        </div>
		        <div className="h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll">
		          <header className="px-4 sm:px-6">
		            <h2 className="text-lg leading-7 font-medium text-gray-900">
		            	JSON Inspection
		            </h2>
		          </header>
		          <div className="relative flex-1 px-4 sm:px-6">
		            <div className="absolute inset-0 px-4 sm:px-6">
		              <div className="h-full border-2 border-dashed border-gray-200">
		              	<DynamicReactJson displayDataTypes={false} enableClipboard={false} src={props.JSON} theme="monokai" />
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
		    </section>
		  </div>
		</div>
  );
}

