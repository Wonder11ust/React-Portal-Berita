// UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');

  useEffect(() => {
    // Mengambil data pengguna dari API
    axios.get('http://localhost:8000/api/dashboard/admin/users',{
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        setUsers(response.data.user);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
console.log(users);
  return (
    <div className="container mx-auto my-8 relative bg-gray-100 p-3" >
      <h1 className="text-2xl font-bold mb-4">User Table</h1>

      {loading && <p>Loading...</p>}

      {!loading && users.length === 0 && <p>No users found.</p>}

      {!loading && users.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
