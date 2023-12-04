import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const WriterManagement = () => {
  const [writers, setWriters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWriter, setNewWriter] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [selectedWriter, setSelectedWriter] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });
  const token = Cookies.get('token');

  useEffect(() => {
    // Fetch data saat komponen dimount
    fetchWriters();
  }, []);

  const openModal = (writer) => {
    setSelectedWriter({
      id: writer.id,
      name: writer.name,
      email: writer.email,
    });

    setIsModalOpen(true); // Tambahkan perintah untuk membuka modal
  };


  const fetchWriters = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard/admin/writers', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setWriters(response.data.writer);
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: error.response.data.message,
        icon: "warning"
      })
    }
  };

  const handleAddWriter = async () => {
    try {
      await axios.post('http://localhost:8000/api/dashboard/admin/add-writer', newWriter, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      // Refresh data setelah menambahkan penulis baru
      fetchWriters();
      // Reset form input
      setNewWriter({ name: '', email: '', password: '' });
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambahkan Writter",
        icon: "success"
      })
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: error.response.data.message,
        icon: "warning"
      })
    }
  };

  const handleEditWriter = async (writerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/dashboard/admin/edit-writer/${writerId}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      // Handle logic untuk mengedit data penulis
      console.log('Edit writer:', response.data.writer);
      Swal.fire({
        title: "Behrasil",
        text: "Berhasil Edit Writter",
        icon: "success"
      })
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: error.response.data.message,
        icon: "warning"
      })
    }
  };

  const handleUpdateWriter = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/dashboard/admin/update-writer/${selectedWriter.id}`, selectedWriter, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      // Refresh data setelah mengupdate penulis
      fetchWriters();
      closeModal();
      Swal.fire({
        title: "Behrasil",
        text: "Berhasil mengubah Writter",
        icon: "success"
      })
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: error.response.data.message,
        icon: "warning"
      })
    }
  };

  const closeModal = () => {
    setSelectedWriter({
      name: '',
      email: '',
      password: '',
    });
    setIsModalOpen(false);
  };

  const handleDeleteWriter = async (writerId) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/dashboard/admin/delete-writer/${writerId}`, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          // Refresh data setelah menghapus penulis
          fetchWriters();
          Swal.fire({
            title: "Behrasil",
            text: "Berhasil Menghapus Writter",
            icon: "success"
          })
        } catch (error) {
          Swal.fire({
            title: "Gagal",
            text: error.response.data.message,
            icon: "warning"
          })
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });


    
  };

  return (
    <div className="relative max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-4">Writer Management</h1>

      {/* Add Writer Form */}
      <div className="mb-6">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={newWriter.name}
          onChange={(e) => setNewWriter({ ...newWriter, name: e.target.value })}
          className="border border-gray-300 p-2 w-full rounded-md"
        />

        <label className="block mb-2 mt-4">Email:</label>
        <input
          type="text"
          value={newWriter.email}
          onChange={(e) => setNewWriter({ ...newWriter, email: e.target.value })}
          className="border border-gray-300 p-2 w-full rounded-md"
        />

        <label className="block mb-2 mt-4">Password:</label>
        <input
          type="password"
          value={newWriter.password}
          onChange={(e) => setNewWriter({ ...newWriter, password: e.target.value })}
          className="border border-gray-300 p-2 w-full rounded-md"
        />

        <button
          onClick={handleAddWriter}
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600"
        >
          Add Writer
        </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 rounded-lg z-50">
        <div className='flex justify-between'>
            <h2 className="text-lg font-semibold mb-2">Edit Article</h2>
            <button className='w-5 h-5 rounded-full bg-red-400' onClick={closeModal}>X</button>
          </div>

          <form>

                <div className="mb-6">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={selectedWriter.name}
                onChange={(e) => setSelectedWriter({ ...selectedWriter, name: e.target.value })}
                className="border border-gray-300 p-2 w-full rounded-md"
              />

              <label className="block mb-2 mt-4">Email:</label>
              <input
                type="text"
                value={selectedWriter.email}
                onChange={(e) => setSelectedWriter({ ...selectedWriter, email: e.target.value })}
                className="border border-gray-300 p-2 w-full rounded-md"
              />

              <button
                onClick={handleUpdateWriter}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600"
              >
                Edit Writer
              </button>
            </div>

          </form>


          </div>
        </div>
      )}
      {/* Display Writers */}
      <ul>
        {writers.map((writer) => (
          <li key={writer.id} className="mb-4 p-4 border border-gray-300 rounded-md">
            <span className="mr-2">{writer.name} - {writer.email}</span>
            <button
              onClick={() => openModal(writer)}
              className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteWriter(writer.id)}
              className="bg-red-500 text-white py-1 px-2 ml-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default WriterManagement;
