import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/createUser/createUser.API";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";

interface FloatingLabelInputProps {
  label: string;
  register: ReturnType<typeof useForm>["register"];
  name: string;
  type: string;
  error?: { message?: string };
  isPasswordField?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  register,
  name,
  type,
  error,
  isPasswordField,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  console.log("IsFocused", isFocused);
  return (
    <div className="relative w-full">
      <input
        type={isPasswordField && showPassword ? "text" : type}
        {...register(name)}
        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 peer pr-10"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        placeholder=" "
      />
      <label
        className={`absolute left-2 top-0 text-gray-300 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-yellow-300 text-sm bg-gray-800 px-1 rounded-md`}
      >
        {label}
      </label>

      {/* Show/Hide Password Icon */}
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-400 hover:text-yellow-300 transition-all"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FaEye size={18} />}
        </button>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [signup, { isLoading: SignUpLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = async (formData: FieldValues) => {
    const { name, email, password } = formData as {
      name: string;
      email: string;
      password: string;
    };

    const toastId = toast.loading("Registering...");

    try {
      const response = await signup({ name, email, password }).unwrap();
      console.log("Response from sign up page", response);

      toast.success("Registration Successful", { id: toastId });

      navigate(`/login`);
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed", { id: toastId });
    }
  };

  return (
    <div className="bg-[#0A111D] text-gray-200 min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Join the Book Haven</h1>
        <p className="text-center text-gray-400 mt-2 font-bold italic">
          Sign up to explore and purchase{" "}
          <span className="text-yellow-300">your favorite books!</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <FloatingLabelInput
            label="Name"
            register={register}
            name="name"
            type="text"
            error={errors.name}
          />
          <FloatingLabelInput
            label="Email"
            register={register}
            name="email"
            type="email"
            error={errors.email}
          />
          <FloatingLabelInput
            label="Password"
            register={register}
            name="password"
            type="password"
            isPasswordField={true}
            error={errors.password}
          />
          <FloatingLabelInput
            label="Confirm Password"
            register={register}
            name="confirmPassword"
            type="password"
            isPasswordField={true}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={SignUpLoading}
            className="text-center text-sm md:text-base md:px-4 px-2 py-2 w-full md:py-2 sm:px-6 sm:py-3 rounded-md font-bold shadow-md bg-yellow-300 text-black hover:shadow-none hover:scale-95 transition-all duration-300 flex justify-center items-center gap-1"
          >
            {SignUpLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
