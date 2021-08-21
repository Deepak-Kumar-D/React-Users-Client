import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  avatar: yup.string(),
  age: yup.number().required(),
  phone: yup.number().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
});

function CreateUser() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch("https://db-react-users.herokuapp.com/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        avatar: data.avatar,
        age: data.age,
        phone: data.phone,
        email: data.email,
        address: data.address,
      }),
    });

    const user = await obj.json();

    if (obj.status !== 200) {
      alert(user.error);
    } else {
      alert(user.message);
      reset();
    }
  };

  return (
    <section className="sub-body">
      <h2 className="headings">Create user</h2>

      <form method="POST" onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-content">
          <label htmlFor="fname">Name</label>
          <input
            type="text"
            name="fname"
            placeholder="Full Name"
            {...register("name")}
          />
        </div>
        <p className="messages">{errors.name && "⚠ Name is important!"}</p>

        <div className="form-content">
          <label htmlFor="avatar">Avatar</label>
          <input type="file" name="avatar" {...register("avatar")} />
        </div>

        <div className="form-content">
          <label htmlFor="age">Age</label>
          <input type="text" name="age" placeholder="18" {...register("age")} />
        </div>
        <p className="messages">{errors.age && "⚠ Age is important!"}</p>

        <div className="form-content">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="00-0000-0000"
            {...register("phone")}
          />
        </div>
        <p className="messages">
          {errors.phone && "⚠ Phone number is important!"}
        </p>

        <div className="form-content">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="react.users@reactuser.com"
            {...register("email")}
          />
        </div>
        <p className="messages">{errors.email && "⚠ Email is important!"}</p>

        <div className="form-content">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Baker Street"
            {...register("address")}
          />
        </div>
        <p className="messages">
          {errors.address && "⚠ Address is important!"}
        </p>

        <div className="form-submit">
          <input type="submit" value="SUBMIT" />
        </div>
      </form>
    </section>
  );
}

export default CreateUser;
