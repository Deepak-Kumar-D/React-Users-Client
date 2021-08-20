import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState([]);

  const userProfile = async () => {
    const obj = await fetch(`http://localhost:5000/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await obj.json();

    if (obj.status === 422) {
      alert(data.error);
    } else {
      setProfileData(data);
    }
  };

  useEffect(() => {
    console.log(userId);
    userProfile();
  });
  return (
    <div>
      <h2 className="headings">Profile</h2>
      <p>
        {profileData.map((ele) => {
          return ele;
        })}
      </p>
    </div>
  );
}

export default Profile;
