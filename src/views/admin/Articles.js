import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function Articles() {
  const [editing, setEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({ title: '', content: '', category: [], image_url: '', slug: '' });
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalArticle, setModalArticle] = useState({ title: '', content: '', image_url: '', category: [],slug: ''  });
  const token = Cookies.get('token');
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const fetchArticles = () => {
    axios.get('http://localhost:8000/api/articles')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => console.error('Error fetching articles:', error));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  

  useEffect(() => {
    fetchArticles();
  }, []);

  const openModal = (article) => {
    console.log(article);
    setEditing(true);
    setSelectedArticle(article);

    // // Isi nilai modalArticle dengan nilai artikel yang dipilih
    setModalArticle({
      id:article.id,
      slug:article.slug,
      title: article.title,
      content: article.content,
      image_url: article.image_url,
      category: article.categories.map(category=>(category.id)),
    });

    setIsModalOpen(true); // Tambahkan perintah untuk membuka modal
  };

  const closeModal = () => {
    setEditing(false);
    setSelectedArticle(null);
    setIsModalOpen(false);
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

        axios.delete(`http://localhost:8000/api/dashboard/admin/article/delete/${article.slug}`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'title'){
      setArticle(prevState => ({ ...prevState, title : value }));
      setArticle(prevState => ({ ...prevState, slug: value.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s+/g, '-') }));
    }else{
      setArticle(prevState => ({ ...prevState, [name]: value }));

    }
  };

 const handleCategoryChange = (e) => {
  const { id, checked } = e.target;
  
  // Mengonversi id ke integer
  const categoryId = parseInt(id, 10);
console.log(checked);
  // Mengecek apakah id ada di dalam array category
  const updatedCategories = checked
  ? [...article.category, categoryId]
  : article.category.filter(existingCategoryId => existingCategoryId !== categoryId);


  setArticle(prevState => ({ ...prevState, category: updatedCategories }));
};

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalArticle(prevState => ({ ...prevState, [name]: value }));
  };

  const handleModalCategoryChange = (e) => {
    const { name, checked } = e.target;
    const categoryId = parseInt(name, 10);  // Mengonversi ID kategori ke integer

    console.log(modalArticle.category);
  
    const updatedCategories = checked
      ? [...modalArticle.category, categoryId]
      : modalArticle.category.filter(existingCategoryId => existingCategoryId !== categoryId);
  
    setModalArticle(prevState => ({ ...prevState, category: updatedCategories }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(modalArticle);
    
  
    if (editing) {
      const formData = new FormData();
      formData.append('title', modalArticle.title);
      formData.append('content', modalArticle.content);
      formData.append('slug', modalArticle.slug);
      formData.append('image_url', modalArticle.image_url); // Tambahkan file gambar ke FormData
      modalArticle.category.forEach(categoryId => {
        formData.append('category[]', categoryId);
      });
      axios.put(`http://localhost:8000/api/dashboard/admin/article/update/${modalArticle.slug}`, modalArticle, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(() => {
          fetchArticles();
          closeModal();
        })
        .catch(error => console.error('Error updating article:', error));
    } else {
      const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    formData.append('slug', (article.title)
              .replace(/[^\w\s]/gi, ' ') // Ganti simbol dengan spasi
              .toLowerCase()
              .replace(/\s+/g, '-') // Ganti spasi dengan tanda -
              .replace(/^-+|-+$/g,''));
    formData.append('image_url', imageFile); // Tambahkan file gambar ke FormData
    article.category.forEach(categoryId => {
      formData.append('category[]', categoryId);
    });
      axios.post('http://localhost:8000/api/dashboard/admin/new-article', article, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(() => {
          fetchArticles();
          closeModal();
        })
        .catch(error => console.error('Error creating article:', error));
    }
  
    setEditing(false);
    setSelectedArticle(null);
    setArticle({ title: '', content: '', category: [], image_url: '' });
    setImageFile(null); // Reset file gambar setelah submit
  };
  


  return (
    <div className='bg-white container rounded relative '>
      <div className=" mx-auto p-5 z-0 ">
      <h2 className="text-2xl">{editing ? 'Edit Article' : 'Add Article'}</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label className="block mb-2">Title:
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2 ">Slug:
          <input
            disabled
            type="text"
            name="slug"
            value={(article.title)
              .replace(/[^\w\s]/gi, ' ') // Ganti simbol dengan spasi
              .toLowerCase()
              .replace(/\s+/g, '-') // Ganti spasi dengan tanda -
              .replace(/^-+|-+$/g,'')}
            onChange={handleChange}
            className="border bg-gray-200 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Content:
          <textarea
            name="content"
            value={article.content}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        {/* <label className="block mb-2">Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 w-full rounded"
        />
      </label> */}

        <label className="block mb-2">Image URL:
          <input
            type="text"
            name="image_url"
            value={ article.image_url}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Category:</label>
          {categories.map(category => (
            <label key={category.id} className="flex items-center mb-2">
              <input
                id={category.id} // Menggunakan id sebagai nilai checkbox
                type="checkbox"
                name={category.category_name}
                checked={article.category.includes(category.id)}
                onChange={ handleCategoryChange}
                className="mr-2"
              />
              {category.category_name}
            </label>
          ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          {editing ? 'Update' : 'Add'}
        </button>
      </form>
      <h2 className="text-2xl mt-8">Articles</h2>
      <input type='text' className="w-72 mx-auto font-nunito order-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari Artikel ..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Content</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.filter(val=>{
          if(searchTerm == "")
          {
            return val
          }
          else if(
            val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.content.toLowerCase().includes(searchTerm.toLowerCase()) )
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
              <td className="py-2 px-4 border-b">
                <button onClick={() => openModal(article)} className="mr-2 px-4 text-white py-2 bg-lightBlue-500 rounded hover:bg-lightBlue-300">Edit</button>
                <button onClick={() => deleteArticle(article)} className="mr-2 px-4 text-white py-2 bg-red-500 rounded hover:bg-red-300" >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 rounded-lg z-50">
        <div className='flex justify-between'>
            <h2 className="text-lg font-semibold mb-2">Edit Article</h2>
            <button className='w-5 h-5 rounded-full bg-red-400' onClick={closeModal}>X</button>
          </div>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title:
          <input
            type="text"
            name="title"
            value={modalArticle.title}
            onChange={handleModalChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Slug:
          <input
            name="slug"
            value={(modalArticle.title)
              .replace(/[^\w\s]/gi, ' ') // Ganti simbol dengan spasi
              .toLowerCase()
              .replace(/\s+/g, '-') // Ganti spasi dengan tanda -
              .replace(/^-+|-+$/g,'')}
            onChange={handleModalChange}
            className="border bg-gray-200 border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Content:
          <textarea
            name="content"
            value={modalArticle.content}
            onChange={handleModalChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Image URL:
          <input
            type="text"
            name="image_url"
            value={modalArticle.image_url}
            onChange={handleModalChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </label>
        <label className="block mb-2">Category:</label>
        {categories.map((category,index) => {
          console.log(); 
          return(
          <label key={category.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              name={String(category.id)}  // Menggunakan ID kategori sebagai nama checkbox
              checked={modalArticle.category && modalArticle.category.includes(category.id)}
              onChange={handleModalCategoryChange}
              className="mr-2"
            />
            {category.category_name}
          </label>
        )})}


        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Update
          </button>
        </div>
      </form>
          </div>
        </div>
      )}


    </div>
    </div>
  );
}

export default Articles;
