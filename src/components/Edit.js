import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RotateLoader from "react-spinners/RotateLoader";

export default function Edit() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const obj = await fetch(
      `https://db-react-users.herokuapp.com/edit-user/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name ? data.name : profileData.name,
          age: data.age ? data.age : profileData.age,
          phone: data.phone ? data.phone : profileData.phone,
          email: data.email ? data.email : profileData.email,
          address: data.address ? data.address : profileData.address,
        }),
      }
    );

    const user = await obj.json();

    if (obj.status !== 200) {
      setLoading(false);
      alert("Invalid attempt!");
    } else {
      setLoading(false);
      alert(user.message);
    }
  };

  const DeleteUser = async () => {
    setLoading(true);
    const obj = await fetch(
      `https://db-react-users.herokuapp.com/delete-user/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = await obj.json();

    if (obj.status !== 200) {
      setLoading(false);
      alert("Invalid attempt!");
    } else {
      setLoading(false);
      alert(user.message);
      history.push("/");
    }
  };

  useEffect(() => {
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

    userProfile();
    return () => {
      setProfileData({});
    };
  }, [setLoading]);
  return (
    <section className="sub-body">
      <h2 className="headings">Edit User</h2>

      <form method="PATCH" onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-content">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder={profileData.name}
            {...register("name")}
          />
        </div>

        <div className="form-content">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            name="age"
            placeholder={profileData.age}
            {...register("age")}
          />
        </div>

        <div className="form-content">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder={profileData.phone}
            {...register("phone")}
          />
        </div>

        <div className="form-content">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder={profileData.email}
            {...register("email")}
          />
        </div>

        <div className="form-content">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder={profileData.address}
            {...register("address")}
          />
        </div>

        <div className="form-submit">
          <input
            className="btn-delete"
            type="button"
            value="DELETE"
            onClick={() => {
              DeleteUser();
            }}
          />
          <input type="submit" value="SUBMIT" />
        </div>
      </form>

      <div className={loading ? "loader" : ""}>
        <RotateLoader loading={loading} color={"#ff4c29"} size={10} />
      </div>
    </section>
  );
}
