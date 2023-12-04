import axios from 'axios';
import Footer from 'components/Landing/Footer'
import Navbar from 'components/Landing/Navbar'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Kategori() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const history = useHistory();


    const handlePindahArtikel = (categoryId) =>{
      history.push("/category/" + categoryId );
    }

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch articles of the selected category
  const fetchCategoryArticles = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/category/${categoryId}`);
      setSelectedCategory(response.data.category);
    } catch (error) {
      console.error('Error fetching category articles:', error);
    }
  };


  return (
    <>
      <Navbar/>
        <div className='bg-gray-100 my-8 rounded mx-auto max-w-screen-lg'>


        <div className="container mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handlePindahArtikel(category.id)}
            className={`bg-white rounded-md overflow-hidden shadow-md transition transform hover:scale-105 cursor-pointer`}
          >
            <img
              src={category.category_image} // Assuming category_image is the URL of the category image
              alt={category.category_name}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{category.category_name}</h3>
              {/* Add any additional information or buttons here */}
            </div>
          </div>
        ))}
      </div>

      {/* Display Selected Category and Articles */}
      {selectedCategory && (
        <div>
          <h2 className="text-xl font-bold mb-4">{selectedCategory.category_name}</h2>
          <ul>
            {selectedCategory.articles.map((article) => (
              <li key={article.id} className="mb-2">
                {article.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>


        </div>
      <Footer />
    </>
  )
}

export default Kategori 