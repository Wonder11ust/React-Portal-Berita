import axios from 'axios';
import Footer from 'components/Footers/Footer';
import Navbar from 'components/Landing/Navbar';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ArtikelKategori() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { id }  = useParams();
    const history = useHistory();

    const fetchArticles = () =>{
        
             axios.get(`http://localhost:8000/api/category/${id}`).then(response=>
            setSelectedCategory(response.data.category))

    }
    const handlePindahArtikel = (artikel) =>{
        console.log(artikel.slug);
        history.push("/article/" + artikel.slug );
      }

    useEffect(() => {
       fetchArticles();
    }, [])
  return (
    <div c>
    <Navbar/>
            

            <div className='flex justify-center my-8 mb-12  rounded mx-auto max-w-screen-lg'>
            {selectedCategory && (
                    <div className=''>
                    <h2 className="text-xl font-bold mb-4">{selectedCategory.category_name}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 my-6  py-6">
                        {selectedCategory.articles.map((item) => (
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
                            </div>
                    </div>
                )}
            </div>



      <Footer />


    </div>
  )
}

export default ArtikelKategori