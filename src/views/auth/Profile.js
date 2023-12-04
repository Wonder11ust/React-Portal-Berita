import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Profile = () => {
  // State variables
  const [account, setAccount] = useState({});
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = Cookies.get('token');

  // Fetch user account on component mount
  useEffect(() => {
    fetchAccount();
  }, []);

  // Fetch user account data
  const fetchAccount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/account', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setAccount(response.data.account);
    } catch (error) {
      console.error('Error fetching account:', error);
    }
  };

  // Handle update name
  const handleUpdateName = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/account/update/${account.id}`, { name: newName, email:newEmail }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      Swal.fire({
        title: "Berhasil ",
        text: "Berhasil mengganti nama anda dengan" + newName,
        icon: "success"
      })
      setNewName('')
      fetchAccount(); 
    } catch (error) {
        Swal.fire({
            title: "Gagal ",
            text: error,
            icon: "error"
          })
    }
  };

  // Handle update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/account/update-pass/${account.id}`, {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmNewPassword,
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage();
      Swal.fire({
        title: "berhasil mengubah password ",
        text: 'Password updated successfully.',
        icon: "success"
      })
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
        console.log(error.response.data.message);
        Swal.fire({
            title: "Gagal ",
            text: error.response.data.message,
            icon: "error"
          })
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white  shadow-mdcontainer rounded relative">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      {/* Display user information */}
      <div className="mb-4">
        <p className="font-semibold">Name: {account.name}</p>
        <p>Email: {account.email}</p>
      </div>

      {/* Update Name Form */}
      <form onSubmit={handleUpdateName} className="mb-6">
        <label className="block mb-2">New Name:</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border rounded-md w-full p-2"
        />

        <label className="block mb-2">New Email:</label>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border rounded-md w-full p-2"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Name
        </button>
      </form>

      {/* Update Password Form */}
      <form onSubmit={handleUpdatePassword}>
        <label className="block mb-2">Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border rounded-md w-full p-2 mb-4"
        />

        <label className="block mb-2">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border rounded-md w-full p-2 mb-4"
        />

        <label className="block mb-2">Confirm New Password:</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="border rounded-md w-full p-2 mb-4"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Update Password
        </button>
      </form>

      {/* Display success/error message */}
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default Profile;
