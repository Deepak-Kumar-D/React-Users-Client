import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import RotateLoader from "react-spinners/RotateLoader";

function Profile() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);

  const userProfile = async () => {
    setLoading(true);
    const obj = await fetch(
      `https://db-react-users.herokuapp.com/profile/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await obj.json();

    if (obj.status === 422) {
      setLoading(false);
      alert(data.error);
    } else {
      setLoading(false);
      setProfileData(data);
    }
  };

  useEffect(() => {
    userProfile();

    return () => {
      setProfileData({});
    };
  }, []);
  return (
    <section className="sub-body">
      <h2 className="headings">Profile</h2>

      <div className="avatar-frame">
        <FaRegUser className="avatar" />
      </div>

      <div className="user-profile">
        <div className="profile-data">
          <p className="profile-label">Name: </p>
          <p className="profile-desc">{profileData.name}</p>
        </div>

        <div className="profile-data">
          <p className="profile-label">Age: </p>
          <p className="profile-desc">{profileData.age}</p>
        </div>

        <div className="profile-data">
          <p className="profile-label">Phone: </p>
          <p className="profile-desc">{profileData.phone}</p>
        </div>

        <div className="profile-data">
          <p className="profile-label">Email: </p>
          <p className="profile-desc">{profileData.email}</p>
        </div>

        <div className="profile-data">
          <p className="profile-label">Address: </p>
          <p className="profile-desc">{profileData.address}</p>
        </div>
      </div>

      <div className={loading ? "loader" : ""}>
        <RotateLoader loading={loading} color={"#ff4c29"} size={10} />
      </div>
    </section>
  );
}

export default Profile;
