import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import UserContext from './UserContext'; 

const UserManagement = ({ loggedUser, handleLogout }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [token, setToken] = useState('');
  const currentUser = useContext(UserContext);
  
  const SERVER_URL = 'https://task4-backend.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [SERVER_URL, token]);

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedUsers(users.map((user) => user.id));
      setSelectAll(true);
    } else {
      setSelectedUsers([]);
      setSelectAll(false);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      setSelectAll(false);
    } else {
      setSelectedUsers([...selectedUsers, userId]);
      if (selectedUsers.length + 1 === users.length) {
        setSelectAll(true);
      }
    }
  };

  const handleBlockUsers = async () => {
    try {
      await axios.put(`${SERVER_URL}/users/block`, {
        ids: selectedUsers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(
        users.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: 'blocked' }
            : user
        )
      );
      setSelectedUsers([]);
      setSelectAll(false);
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnblockUsers = async () => {
    try {
      await axios.put(`${SERVER_URL}/users/unblock`, {
        ids: selectedUsers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(
        users.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: 'active' }
            : user
        )
      );
      setSelectedUsers([]);
      setSelectAll(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUsers = async () => {
    console.log(selectedUsers);
    try {
      await axios.delete(`${SERVER_URL}/users`, {
        data: { ids: selectedUsers },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      setSelectAll(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                Welcome to User Management
              </h5>
              <div>
                <Button
                  variant="danger"
                  className="mr-2"
                  onClick={handleBlockUsers}
                  disabled={!selectedUsers.length}
                >
                  Block
                </Button>
                <Button
                  variant="success"
                  className="mr-2"
                  onClick={handleUnblockUsers}
                  disabled={!selectedUsers.length}
                >
                  Unblock
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDeleteUsers}
                  disabled={!selectedUsers.length}
                >
                  Delete
                </Button>
                <Button
                  variant="outline-secondary"
                  className="ml-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
            <div className="card-body">
              <Table hover>
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Last Login</th>
                    <th scope="col">Registration Time</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                          />
                        </div>
                      </th>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.last_login_time}</td>
                      <td>{user.registration_time}</td>
                      <td>
                        <span className={`badge ${user.status === "active" ? "badge-success" : "badge-danger"}`}>
                          {user.status === "active" ? "Active" : "Blocked"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default UserManagement;