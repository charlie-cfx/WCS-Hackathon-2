import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import "./Users.scss";

function Users() {
  const AuthValue = useContext(AuthContext);
  const { userToken } = AuthValue;

  const [users, setUsers] = useState();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setUsers(res.data);
        setKeys(Object.keys(res.data[0]));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    users && (
      <div className="manage">
        <h1>Gestion des Utilisateurs</h1>
        <table>
          <thead>
            <tr>
              {keys.map((key) => {
                return (
                  key !== "id" &&
                  key !== "hashed_password" && <th key={key}>{key}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.mail}</td>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.phone}</td>
                <td>{user.is_admin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Users;
