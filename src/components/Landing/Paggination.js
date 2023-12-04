import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];



function Items({ currentItems }) {
    const history = useHistory();

    const handlePindahArtikel = (artikel) =>{
      console.log(artikel.slug);
      history.push("/article/" + artikel.slug );
    }
    return (
      <>
       <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 my-6  py-6">
        {currentItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:flex-row h-40 "
          onClick={()=>handlePindahArtikel(item)}
        >
          <img
            className=" w-1/3 rounded object-cover md:h-auto md:!rounded-none md:!rounded-l-lg"
            src={`${item.image_url}`}
            alt={item.title}
          />
          <div className="flex w-2/3 flex-col justify-start px-6">
            <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50 line-clamp-2">
              {item.title}
            </h5>
            <p className="mb-4 text-sm text-gray-800 dark:text-neutral-200 line-clamp-3 overflow-hidden">
              {item.content}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-300">
              {item.lastUpdated}
            </p>
          </div>
        </div>
      ))}
      </div>
      </>
    );
  }

function Paggination({ itemsPerPage }) {

    const [articles, setArticles] = useState([]);
    const fetchArticles = () => {
    axios.get('http://localhost:8000/api/articles')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => console.error('Error fetching articles:', error));
    };
    useEffect(() => {
      fetchArticles();
    }, []);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = articles.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(articles.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items currentItems={currentItems} />
      <div className='flex justify-center'>
      <ReactPaginate
            breakLabel="..."
            nextLabel="Next ⇒"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="⇐ Previous"
            renderOnZeroPageCount={null}
            containerClassName='isolate  inline-flex -space-x-px rounded-md shadow-sm my-2'
            pageLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-500 focus:z-20 focus:outline-offset-0 h-full'
            previousLinkClassName='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-gray-100'
            nextLinkClassName='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-gray-100'
            activeLinkClassName='relative z-10 inline-flex items-center bg-gray-600 px-5 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 h-full'
          />
      </div>
      </>
    );
  }

export default Paggination
  