import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Paggination from './Paggination';
import 'flowbite'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// Initialization for ES Users
import {
  Carousel,
  initTE,
} from "tw-elements";



function WorkingSpace() {
  const [articles, setArticles] = useState([]);
  const [articlesPopular, setArticlesPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  
  const fetchArticles = () => {
    axios.get('http://localhost:8000/api/articles')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => console.error('Error fetching articles:', error));
    };
    useEffect(() => {
      fetchArticles();
      fetchPopularArticle();
      initTE({ Carousel });
    }, []);

    const fetchPopularArticle = () =>{
      axios.get('http://localhost:8000/api/views')
      .then(response => {
        console.log(response);
        setArticlesPopular(response.data.views);
        setLoading(false)
      })
      .catch(error => console.error('Error fetching articles:', error));
      
    }

    
    

    const handlePindahArtikel = (artikel) =>{
      console.log(artikel.slug);
      history.push("/article/" + artikel.slug );
    }


    var CAROUSEL_HTML = ''

    if(loading)
    {
       CAROUSEL_HTML = loading
    }else{
      CAROUSEL_HTML = (articlesPopular.map((item,index)=>{return (
        <div
        class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-active
        data-te-carousel-item
        // style="backface-visibility: hidden"
        >
        <img
          src={item.image_url}
          class="block w-full"
          alt="..." />
        <div
          class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
          <h5 class="text-xl">First slide label</h5>
          <p>
            Some representative placeholder content for the first slide.
          </p>
        </div>
      </div>
      )}))
    }


  return (
      <div className=''>
        <div className="flex w-full">  
          <div className='w-2/3  flex items-center'>
            
            <div  className="relative w-full p-3  h-full">

          <div
  id="carouselExampleCaptions"
  class="relative h-full"
  data-te-carousel-init
  data-te-ride="carousel">
  <div
    class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%]  mb-4 flex list-none justify-center p-0"
    data-te-carousel-indicators>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="0"
      data-te-carousel-active
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-current="true"
      aria-label="Slide 1"></button>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="1"
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 2"></button>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="2"
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 3"></button>
  </div>

  <div
    class="relative w-full overflow-hidden after:clear-both after:block after:content-[''] h-full ">
    <div
      class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-active
      data-te-carousel-item
      // style="backface-visibility: hidden"
      >
      <img
        src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
        class="block w-full h-full"
        alt="..." />
      <div
        class="absolute inset-x-[15%] -bottom-28 hidden py-5 text-center text-black md:block">
        <h5 class="text-xl">First slide label</h5>
        <p>
          Some representative placeholder content for the first slide.
        </p>
      </div>
    </div>
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      // style="backface-visibility: hidden"
      >
      <img
        src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
        class="block w-full"
        alt="..." />
      <div
        class="absolute inset-x-[15%] -bottom-28 hidden py-5 text-center text-black md:block">
        <h5 class="text-xl">Second slide label</h5>
        <p>
          Some representative placeholder content for the second slide.
        </p>
      </div>
    </div>
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      // style="backface-visibility: hidden"
      >
      <img
        src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
        class="block w-full"
        alt="..." />
      <div
        class="absolute inset-x-[15%] -bottom-28 hidden py-5 text-center text-black md:block">
        <h5 class="text-xl">Third slide label</h5>
        <p>
          Some representative placeholder content for the third slide.
        </p>
      </div>
    </div>
  </div>

  <button
    class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="prev">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Previous</span
    >
  </button>
  <button
    class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="next">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Next</span
    >
  </button>
</div> 

          
</div>



          </div>
          <div className='w-1/3 my-auto flex items-center'>
            <div className='grid grid-cols-1 sm:grid-cols-1 gap-6 pt-3 '>
              {articlesPopular.map((article,index)=>(
                <div className='flex rounded shadow overflow-hidden hover:bg-gray-100 transition-all duration-500 flex-col hover:scale-105 transform bg-white  dark:bg-neutral-700 md:flex-row   cursor-pointer' key={index}
                
                  onClick={() => handlePindahArtikel(articlesPopular.id)}
                >
                  
                  <img src={`${article.image_url}`} alt={article.title} className="max-w-180-px h-full" />
                  <div className='p-2'>
                    <p className='font-bold '>{article.title}</p>
                    {/* <p className='line-clamp-3 overflow-hidden text-clip text-sm '>{article.content}</p> */}
                  </div>
                </div>
              ))

              }
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 my-6  py-6">
      {articles.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:flex-row max-h-40 "
          onClick={()=>handlePindahArtikel(item)}
        >
          <img
            className="max-h-20 w-full rounded-t-lg object-cover md:h-auto md:!rounded-none md:!rounded-l-lg"
            src={`${item.image_url}`}
            alt={item.title}
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              {item.title}
            </h5>
            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-200 text-clip overflow-hidden">
              {item.content}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-300">
              {item.lastUpdated}
            </p>
          </div>
        </div>
      ))}
    </div> */}
    <div className=''>
        <Paggination itemsPerPage={4} />
    </div>

      </div>
  )
}

export default WorkingSpace