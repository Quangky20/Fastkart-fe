import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { LoginForm } from "../types/auth";
import { useAppDispatch } from "../hooks";
import { signin } from "../redux/authSlice";


const schema = yup
  .object({
    email: yup.string().required().email("Email khong hop le! "),
    // .test("custom", "Email khong hop le", (value, context) => {
    //   console.log(value, context);
    //   return value === "jimmy";
    // }),
    password: yup.string().required().min(6),
    isRemember: yup.boolean().required(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isRemember: false,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginForm) => {
    dispatch(signin(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5dbfa]">
      <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left: Illustration & Logo */}
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-[#f3f1fe] p-8">
          <img
            src="https://phpstack-1384472-5196432.cloudwaysapps.com/assets/images/logo/1.png"
            alt="Logo"
            className="h-12 mb-8"
          />
          <img
            src="https://phpstack-1384472-5196432.cloudwaysapps.com/assets/images/login/01.png"
            alt="Teamwork"
            className="w-80 max-w-full"
          />
        </div>
        {/* Right: Login Form */}
        <div className="md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-[#3d2176] mb-2">
            Welcome To axelit!
          </h2>
          <p className="text-gray-500 mb-6">
            Sign in with your data that you entered during your registration
          </p>
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                {...register("email")}
                type="text"
                placeholder="Enter Your Username"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bba6f8] bg-white"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-gray-700">Password</label>
                <a href="#" className="text-[#3d2176] text-sm hover:underline">
                  Forgot Password ?
                </a>
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bba6f8] bg-white"
              />
              <p>{errors.password?.message}</p>
            </div>
            <div className="flex items-center">
              <input
                {...register("isRemember")}
                type="checkbox"
                id="remember"
                className="mr-2 accent-[#bba6f8]"
              />
              <label htmlFor="remember" className="text-gray-600 text-sm">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#bba6f8] hover:bg-[#a08be6] text-white font-bold py-3 rounded-full transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Don't Have Your Account yet?{" "}
            <a
              href="#"
              className="text-[#3d2176] font-semibold hover:underline"
            >
              Sign up
            </a>
          </div>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm">Or sign in with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex justify-center gap-4">
            <button className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#3b5998] hover:text-white transition">
              <FaFacebookF />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#ea4335] hover:text-white transition">
              <FaGoogle />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#333] hover:text-white transition">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
