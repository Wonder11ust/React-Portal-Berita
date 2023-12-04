import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Paggination from './Paggination';
import 'flowbite'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';


function WorkingSpace() {
  const [articles, setArticles] = useState([]);
  const [articlesPopular, setArticlesPopular] = useState([]);
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
    }, []);

    const fetchPopularArticle = () =>{
      axios.get('http://localhost:8000/api/views')
      .then(response => {
        console.log(response);
        setArticlesPopular(response.data.views);
      })
      .catch(error => console.error('Error fetching articles:', error));
      
    }

    // slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? articlesPopular.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
    console.log(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === articlesPopular.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
    console.log(newIndex);
  };
    
    

    const handlePindahArtikel = (artikel) =>{
      console.log(artikel.slug);
      history.push("/article/" + artikel.slug );
    }

    console.log(currentIndex);

  return (
      <div className=''>
        <div className="flex w-full">  
          <div className='w-2/3 '>
            
            <div  className="relative w-full p-3 bg-red-200">
            <div class="carousel-inner relative bg-center bg-cover overflow-hidden justify-center items-center mx-auto w-11/12  rounded-[2rem]">

            <div className='max-w-[1400px] w-full m-auto py-20 px-4 relative group'>
  {/* {articlesPopular.length >= 0 && (
    <div
      style={{ backgroundImage: `url(${articlesPopular[0].image_url})` }}
      className='w-full rounded-2xl bg-center bg-cover duration-500 sm:bg-cover bg-[#ECE3DE] h-72 sm:h-[20rem] rounded-[2rem]" alt="...'>
      <div class="md:block absolute w-full lg:w-6/12 px-0 sm:ml-24 ml-10 mr-auto text-left mb-12 mt-36 sm:mb-0">
        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>- Budi Berita</p>
      </div>
    </div>
  )}

  <div className='bg-red-200 hidden group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-30%] left-5 text-2xl rounded-full p-2 text-gray cursor-pointer'>
    <BsChevronCompactLeft onClick={prevSlide} size={30} />
  </div>

  <div className='hidden group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-30%] right-5 text-2xl rounded-full p-2 text-gray cursor-pointer'>
    <BsChevronCompactRight onClick={nextSlide} size={30} />
  </div> */}
</div>

                </div>


          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src={`https://tecdn.b-cdn.net/img/Photos/Slides/img%20(${index + 14}).jpg`}
                  className="absolute block w-full -translate-y-1/2 h-full "
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </div>`

          {/* <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {articlesPopular.map((item,index) => {
                console.log(item.image_url);
                return(
                <div key={index} className=" duration-700 ease-in-out" data-carousel-item>
                  <img
                    src={item.image_url}
                    className="absolute block w-full h-full -translate-y-1/2  "
                    alt={`Slide ${index}`}
                  />
                </div>
              )})}
            </div> */}

  {/* <div className="z-30 flex  pt-6 justify-center space-x-3 rtl:space-x-reverse">
    {[0, 1, 2].map((index) => (
      <button
        key={index}
        type="button"
        className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-current={index === 0}
        aria-label={`Slide ${index + 1}`}
        data-carousel-slide-to={index}
      ></button>
    ))}
  </div> */}

  <button
    type="button"
    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    data-carousel-prev
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
      <svg
        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
      </svg>
      <span className="sr-only">Previous</span>
    </span>
  </button>

  <button
    type="button"
    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    data-carousel-next
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
      <svg
        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
      </svg>
      <span className="sr-only">Next</span>
    </span>
  </button>
</div>



          </div>
          <div className='w-1/3 my-auto flex items-center'>
            <div className='grid grid-cols-1 sm:grid-cols-1 gap-6 pt-3 '>
              {articlesPopular.map((article,index)=>(
                <div className='flex' key={index}>
                  
                  <img src={`${article.image_url}`} alt={article.title} className="max-w-200-px max-h-24 rounded" />
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