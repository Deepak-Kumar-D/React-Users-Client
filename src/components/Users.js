import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);
  let count = 0;

  // Fetch users on router load/refresh
  const userResult = async () => {
    const obj = await fetch("http://localhost:5000/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await obj.json();
    setUsers(data);
  };

  useEffect(() => {
    userResult();

    return () => {
      setUsers({});
    };
  }, []);
  return (
    <section className="sub-body">
      <h2 className="headings">Users</h2>

      <div className="row h-row">
        <h4 className="col r-border m-align  sm-width">Sl.No.</h4>

        <h4 className="col r-border">Username</h4>

        <h4 className="col m-align r-border  s-width">Profile</h4>

        <h4 className="col m-align s-width">Edit</h4>
      </div>

      {users.map((ele, index) => {
        return (
          <div
            key={ele._id}
            className={
              index === users.length - 1
                ? "row row-data curve-bottom"
                : "row row-data"
            }
          >
            <div className="col m-align r-border sm-width">{++count}</div>

            <div className="col ellip r-border">{ele.name}</div>

            {/* Link to open the profile of the selected user by their user id */}
            <div className="col m-align r-border s-width">
              <Link to={`/profile/${ele._id}`}>
                <FaRegUser className="profile" />
              </Link>
            </div>

            <div className="col m-align s-width">
              <FaRegEdit className="edit" />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Users;
