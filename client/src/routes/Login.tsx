import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../features/user/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

type UserInputs = {
  name: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    userDetails,
    loading,
    error: userError,
  } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UserInputs>();
  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    dispatch(login({ name: data.name, password: data.password }));
  };

  useEffect(() => {
    if (userDetails) {
      navigate("/");
    }
  }, [userDetails]);

  useEffect(() => {
    if (formErrors.password && formErrors.name) {
      toast.error("Enter your name and password", {
        style: {
          background: "rgb(23 23 23)",
          color: "rgb(245 245 245)",
        },
      });
    }
  }, [formErrors.password, formErrors.name]);
  useEffect(() => {
    if (formErrors.password && !formErrors.name) {
      toast.error("Enter your password", {
        style: {
          background: "rgb(23 23 23)",
          color: "rgb(245 245 245)",
        },
      });
    }
  }, [formErrors.password]);
  useEffect(() => {
    if (formErrors.name && !formErrors.password) {
      toast.error("Enter your name", {
        style: {
          background: "rgb(23 23 23)",
          color: "rgb(245 245 245)",
        },
      });
    }
  }, [formErrors.name]);

  useEffect(() => {
    if (
      userError ===
      `crypto/bcrypt: hashedSecret too short to be a bcrypted password`
    ) {
      toast.error("User does not exist", {
        style: {
          background: "rgb(23 23 23)",
          color: "rgb(245 245 245)",
        },
      });
    } else if (
      userError ===
      `crypto/bcrypt: hashedPassword is not the hash of the given password`
    ) {
      toast.error("The name and password do not match", {
        style: {
          background: "rgb(23 23 23)",
          color: "rgb(245 245 245)",
        },
      });
    } else if (userError) {
      toast.error(userError, {
        style: {
          background: "rgb(23 23 23)",
          color: "rgb(245 245 245)",
        },
      });
    }
  }, [userError]);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="bg-neutral-900 rounded-2xl flex flex-col w-full items-center justify-center md:w-3/5 p-16">
        <div className="text-4xl font-playfair w-3/4 text-left mb-2">Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
          <label className="py-3">
            Name:
            <input
              {...register("name", { required: true })}
              className="h-12 px-4 w-full rounded-lg my-1 bg-neutral-900 focus:outline-none border-2 border-neutral-800"
            />
          </label>
          <label className="py-3">
            Password:
            <input
              {...register("password", { required: true })}
              className="h-12 px-4 w-full rounded-lg my-1 bg-neutral-900 focus:outline-none border-2 border-neutral-800"
            />
          </label>
          <button className="bg-purple-700 h-12 hover:bg-purple-800 rounded-lg text-lg flex items-center justify-center">
            {loading ? <PulseLoader color="#fff" size={5} /> : "Login"}
          </button>
        </form>
        <div className="mt-6 w-3/4">
          Don't have an account?&nbsp;
          <Link to={"/signup"} className="font-bold underline">
            Signup
          </Link>
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

export default Login;
