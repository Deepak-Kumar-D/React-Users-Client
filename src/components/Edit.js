// import * as yup from "yup";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// const schema = yup.object().shape({
//   name: yup.string(),
//   avatar: yup.string(),
//   age: yup.number(),
//   phone: yup.number(),
//   email: yup.string().email(),
//   address: yup.string(),
// });

export default function Edit() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const obj = await fetch(`http://localhost:5000/edit-user/${id}`, {
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
    });

    const user = await obj.json();

    if (obj.status !== 200) {
      alert("Invalid attempt!");
    } else {
      alert(user.message);
    }
  };

  useEffect(() => {
    const userProfile = async () => {
      const obj = await fetch(`http://localhost:5000/profile/${id}`, {
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

    userProfile();
    return () => {
      setProfileData({});
    };
  }, []);
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
          <input type="submit" value="SUBMIT" />
        </div>
      </form>
    </section>
  );
}
