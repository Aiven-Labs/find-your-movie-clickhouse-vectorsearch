
import {useRef, useState} from 'react';

export default function Home() {
    const [plots, setPlots] = useState([])
    const searchInput = useRef();
    function search(event) {
        event.preventDefault();
        const enteredSearch = searchInput.current.value;
        fetch('/api/recommendations', {
            method: 'POST',
            body: JSON.stringify({
                search: enteredSearch
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => setPlots(data));
    }
  return (
      <>
          <section id="shorten" >
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                  <form onSubmit={search}>
                      <label htmlFor="default-search"
                             className="mb-2 text-sm font-medium sr-only text-white">Search</label>
                      <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-400" aria-hidden="true"
                                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                          </div>
                          <input type="search" id="default-search" ref={searchInput}
                                 className="block w-full p-4 pl-10 text-sm border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                 placeholder="Type what do you want to watch about" required />
                              <button type="submit"
                                      className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-lightBlue hover:bg-darkBlue focus:ring-blue-800">Search
                              </button>
                      </div>
                  </form>
              </div>
          </section>
          <div className="flex gap-8 flex-wrap flex-col grow shrink items-start mx-24">
              {plots.map(item =>
              <div key={item.title} className="relative p-10 rounded-xl binline-block justify-start rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-darkBlue items-start" >
                  <div className="text-6xl absolute top-4 right-4 opacity-80">🍿</div>
                  <div>
                      <h4 className="opacity-90 text-xl">From {item.director}</h4>
                      <p className="opacity-50 text-sm">Year {item.year}</p>
                  </div>
                  <h1 className="text-4xl mt-6">{item.title}</h1>
                  <p className="relative mt-6 text opacity-80 italic">
                      {item.plot}
                  </p>
                  <div>
                      <p className="opacity-50 text-sm mt-6"><a
                          href={item.wiki}
                          className="underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit"
                      >{item.wiki}</a
                      ></p>
                  </div>
              </div>)}
          </div>
      </>
  )
}
