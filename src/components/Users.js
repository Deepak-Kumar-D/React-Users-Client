import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import RotateLoader from "react-spinners/RotateLoader";

function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  let count = 0;

  // Fetch users on router load/refresh
  const userResult = async () => {
    setLoading(true);
    const obj = await fetch("https://db-react-users.herokuapp.com/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await obj.json();
    setUsers(data);
    setLoading(false);
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

      {users.length === 0 ? (
        <div className="empty-msg">
          <p>Add new users to check them out here.</p>
        </div>
      ) : (
        <>
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
                  <Link to={`/edit-user/${ele._id}`}>
                    <FaRegEdit className="edit" />
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      )}

      <div className={loading ? "loader" : ""}>
        <RotateLoader loading={loading} color={"#ff4c29"} size={10} />
      </div>
    </section>
  );
}

export default Users;
