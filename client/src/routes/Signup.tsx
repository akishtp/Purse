import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../features/user/userActions";
import { AppDispatch } from "../app/store";

type UserInputs = {
  name: string;
  password: string;
};

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit } = useForm<UserInputs>();
  const onSubmit: SubmitHandler<UserInputs> = (data) =>
    dispatch(signup({ name: data.name, password: data.password }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-black">
      <input {...register("name", { required: true })} />
      <input {...register("password", { required: true })} />
      <button className="bg-red-500">Signup</button>
    </form>
  );
};

export default Signup;
