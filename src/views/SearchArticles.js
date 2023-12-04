import axios from 'axios';
import Footer from 'components/Landing/Footer';
import Navbar from 'components/Landing/Navbar';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function SearchArticles() {
    const { id }  = useParams();
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


  return (
    <div>
        <Navbar />

        <div className='w-full items-center justify-between max-w-screen-lg mx-auto'>
            <div className=' py-10  flex justify-center'>
                <p className='text-4xl'>Hasil Pencarian : "{id}"</p>
            </div>
        <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Content</th>
          </tr>
        </thead>
        <tbody>
          {articles.filter(val=>{
          if(id == "")
          {
            return val
          }
          else if(
            val.title.toLowerCase().includes(id.toLowerCase()) ||
            val.content.toLowerCase().includes(id.toLowerCase()) )
          {
            return val
          }
        }).map((article,index) => (
            <tr key={article.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{article.title}</td>
              <td className="py-2 px-4 border-b">
                <img src={`${article.image_url}`} alt={article.title} className="max-w-200-px" />
              </td>
              <td className="py-2 px-4 border-b">{article.content}</td>
            </tr>
          ))}
        </tbody>
      </table>    
        </div>         

        <Footer />
    </div>
  )
}

export default SearchArticles