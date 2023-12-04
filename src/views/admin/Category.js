import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ category_name: '', category_image: '' });
  const [editCategory, setEditCategory] = useState({ category_name: '', category_image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = Cookies.get('token');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (category) => {
    setModalIsOpen(true);
    setEditCategory({
      id:category.id,
      category_name: category.category_name, 
      category_image: category.category_image
    });
    console.log(category);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      setError('Error fetching categories');
      setLoading(false);
    }
  };

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setNewCategory(prevState => ({ ...prevState, [name] : value }));
  }

  const handleChangeEditKategori = (e) =>{
    const { name, value } = e.target;
    setEditCategory(prevState => ({ ...prevState, [name] : value }));
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/new-category', newCategory, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchCategories();
      setNewCategory({ category_name: '', category_image: '' })
      Swal.fire({
        title: "Berhasil",
        text: "Berhasi Menambahkan Kategori",
        icon: "success"
      })
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: error.response.data.message,
        icon: "warning"
      })
      setError('Error adding category');
    }
  };

  const handleEditCategory   = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/category/edit/${editCategory.id}`, editCategory, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      closeModal();
      fetchCategories();
      setNewCategory({ category_name: '', category_image: '' })
    } catch (error) {
      setError('Error adding category');
    }
  };

  const closeModal = () => {
    setEditCategory({id:'', category_name: '', category_image: '' });
    setModalIsOpen(false);
  };

  return (
    <div className='flex flex-col p-8  rounded-lg relative  min-w-0 break-words w-full mb-6 shadow-lg  bg-white'>
      <h1 className='text-3xl font-semibold mb-4'>Categories</h1>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className='mb-4 '>
        <label className='mr-2'>
          New Category:
          <input
            type="text"
            name="category_name"
            value={newCategory.category_name}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded'
          />
        </label>
        <label className='mr-2'>
          URL Image :
          <input
            type="text"
            name="category_image"
            value={newCategory.category_image}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded'
          />
        </label>
        <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
          Add Category
        </button>
      </form>

      {/* Display Categories */}
      {loading && <p className='text-gray-600'>Loading...</p>}
      {categories.length > 0 && (
        <ul className='list-disc pl-4'>
          {categories.map((category) => (
            <li key={category.id} className='flex items-center justify-between mb-2'>
              <span className='text-lg'>{category.category_name}</span>
              <button
                onClick={() =>openModal(category) }
                className='text-blue-500 hover:text-blue-700 focus:outline-none focus:underline'
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* modal */}
{modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 rounded-lg w-1/2 z-50">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Kategori</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <form onSubmit={handleEditCategory} className='mb-4 flex flex-col'>
        <label className=' my-4'>
          New Category:
          <input
            type="text"
            name="category_name"
            value={editCategory.category_name}
            onChange={handleChangeEditKategori}
            className='border border-gray-300 p-2 rounded'
          />
        </label>
        <label className=' my-4'>
          URL Image :
          <input
            type="text"
            name="category_image"
            value={editCategory.category_image}
            onChange={handleChangeEditKategori}
            className='border border-gray-300 p-2 rounded'
          />
        </label>
        <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
          Edit Category
        </button>
      </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Category;
