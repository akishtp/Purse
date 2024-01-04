import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../features/user/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type UserInputs = {
  name: string;
  password: string;
};

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userDetails } = useAppSelector((state) => state.user);

  const { register, handleSubmit } = useForm<UserInputs>();
  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    dispatch(signup({ name: data.name, password: data.password }));
  };

  useEffect(() => {
    console.log(userDetails);

    if (userDetails) {
      navigate("/");
    }
  }, [userDetails]);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="bg-neutral-900 rounded-2xl flex flex-col w-full items-center justify-center md:w-3/5 p-16">
        <div className="text-4xl font-playfair w-3/4 text-left mb-2">
          Signup
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
          <label className="py-3">
            Name:
            <input
              {...register("name", { required: true })}
              className="h-12 px-4 w-full rounded-lg my-1 bg-neutral-800 focus:outline-none"
            />
          </label>
          <label className="py-3">
            Password:
            <input
              {...register("password", { required: true })}
              className="h-12 px-4 w-full rounded-lg my-1 bg-neutral-800 focus:outline-none"
            />
          </label>
          <button className="bg-purple-700 h-12 hover:bg-purple-800 rounded-lg text-lg">
            Signup
          </button>
        </form>
        <div className="mt-6 w-3/4">
          Already have an account?&nbsp;
          <span className="font-bold underline">Login</span>
        </div>
      </div>
      <div className="mt-6 w-1/4 flex justify-around text-neutral-700">
        <Link to={"/about"}>About</Link>
        <a href="https://akish.tech">Akishtp</a>
        <a href="https://github.com/akishtp">Github</a>
      </div>
    </div>
  );
};

export default Signup;
