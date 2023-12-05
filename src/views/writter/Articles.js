import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleSelected, setArticleSelected] = useState({ title: '', content: '', category: [], image_url: '', slug: '' });
  const [newArticle, setNewArticle] = useState({ title: '', content: '', category: [], image_url: '', slug: '' });
  const [categories, setCategories] = useState([]);

  const fetchArticles = () =>{
    axios.get('http://localhost:8000/api/dashboard/articles', {
      headers: {
        Authorization: `Bearer ${token}`, // Sesuaikan dengan cara autentikasi Anda
      },
    })
      .then(response => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }

  useEffect(() => {
    // Ambil data artikel dari API
   fetchArticles()
      axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const closeModal = () => {
    setArticleSelected({ title: '', content: '', category: [], image_url: '', slug: '' });
    setIsModalOpen(false);
  };

  const openModal = (article) => {
    console.log(article.target);
    setIsModalOpen(true);
    setArticleSelected({
      id:article.id,
      slug:article.slug,
      title: article.title,
      content: article.content,
      image_url: article.image_url,
      category: article.categories.map(category=>(category.id)),

    });
  };


  const handleAddArticle = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8000/api/dashboard/new-article',newArticle,{
      headers: {
        Authorization: `Bearer ${token}`, // Sesuaikan dengan cara autentikasi Anda
      },
    }).then(res=>{
      console.log(res);
    })
    setNewArticle({ title: '', content: '', category: [], image_url: '', slug: '' })
    fetchArticles();
   
  };

  const handleEditArticle = (e) => {
    e.preventDefault();
  
    axios.put(`http://localhost:8000/api/dashboard/article/update/${articleSelected.slug}`,articleSelected,{
      headers: {
        Authorization: `Bearer ${token}`, // Sesuaikan dengan cara autentikasi Anda
      },
    }).then(res=>{
      console.log(res);
    })
    Swal.fire({
      title: "Berhasil!",
      text: "Berhasil Mengubah Artikel",
      icon: "success"
    });
    setNewArticle({ title: '', content: '', category: [], image_url: '', slug: '' })
    fetchArticles();
    closeModal()
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'title'){
      setNewArticle(prevState => ({ ...prevState, title : value }));
      setNewArticle(prevState => ({ ...prevState, slug: value.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s+/g, '-') }));
    }else{
      setNewArticle(prevState => ({ ...prevState, [name]: value }));

    }
  };

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    
    // Mengonversi id ke integer
    const categoryId = parseInt(id, 10);
  console.log(checked);
    // Mengecek apakah id ada di dalam array category
    const updatedCategories = checked
    ? [...newArticle.category, categoryId]
    : newArticle.category.filter(existingCategoryId => existingCategoryId !== categoryId);
  
  
    setNewArticle(prevState => ({ ...prevState, category: updatedCategories }));
  };
  

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setArticleSelected(prevState => ({ ...prevState, [name]: value }));
  };

  const handleModalCategoryChange = (e) => {
    const { name, checked } = e.target;
    const categoryId = parseInt(name, 10);  // Mengonversi ID kategori ke integer

  
    const updatedCategories = checked
      ? [...articleSelected.category, categoryId]
      : articleSelected.category.filter(existingCategoryId => existingCategoryId !== categoryId);
  
      setArticleSelected(prevState => ({ ...prevState, category: updatedCategories }));
  };

  const deleteArticle = (article) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`http://localhost:8000/api/dashboard/article/delete/${article.slug}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(() => fetchArticles())
          .catch(error => console.error('Error deleting article:', error));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });


    
  };




  return (
    <div className="container mx-auto my-8 bg-white  rounded relative p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard Articles</h1>
        <form className="mt-4" onSubmit={handleAddArticle}>
        <label className="block mb-2">Title:
          <input
            type="text"
            name="title"
            value={newArticle.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2 ">Slug:
          <input
            disabled
            type="text"
            name="slug"
            value={(newArticle.title).replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s+/g, '-')}
            onChange={handleChange}
            className="border bg-gray-200 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Content:
          <textarea
            name="content"
            value={newArticle.content}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>

        <label className="block mb-2">Image URL:
          <input
            type="text"
            name="image_url"
            value={newArticle.image_url}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Category:</label>
          {categories.map(category => (
            <label key={category.id} className="flex items-center mb-2">
              <input
                id={category.id} 
                type="checkbox"
                name={category.category_name}
                checked={newArticle.category.includes(category.id)}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              {category.category_name}
            </label>
          ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Add
        </button>
      </form>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && articles.length === 0 && <p>No articles found.</p>}

      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <div key={article.id} className="bg-white shadow-md p-6 rounded-md">
              <img src={article.image_url} alt={article.title} className="mb-4 rounded-md" />
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
              <div className="flex justify-between">
                <button className="text-blue-500 hover:text-blue-700" onClick={()=>openModal(article)}>Edit</button>
                <button className="text-red-500 hover:text-red-700" onClick={()=>deleteArticle(article)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

{isModalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center z-10">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 rounded-lg z-50 w-1/2">
        <div className='flex justify-between'>
            <h2 className="text-lg font-semibold mb-2">Edit Article</h2>
            <button className='w-5 h-5 rounded-full bg-red-400' onClick={closeModal}>X</button>
          </div>
          <form className="mt-4" onSubmit={handleEditArticle}>
        <label className="block mb-2">Title:
          <input
            type="text"
            name="title"
            value={articleSelected.title}
            onChange={handleModalChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2 ">Slug:
          <input
            disabled
            type="text"
            name="slug"
            value={(articleSelected.title).replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s+/g, '-')}
            onChange={handleModalChange}
            className="border bg-gray-200 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Content:
          <textarea
            name="content"
            value={articleSelected.content}
            onChange={handleModalChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>

        <label className="block mb-2">Image URL:
          <input
            type="text"
            name="image_url"
            value={articleSelected.image_url}
            onChange={handleModalChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Category:</label>
          {categories.map(category => (
            <label key={category.id} className="flex items-center mb-2">
              <input
                id={category.id} 
                type="checkbox"
                name={category.id}
                checked={articleSelected.category.includes(category.id)}
                onChange={handleModalCategoryChange}
                className="mr-2"
              />
              {category.category_name}
            </label>
          ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Edit
        </button>
      </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;