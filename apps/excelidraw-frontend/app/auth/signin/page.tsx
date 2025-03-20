"use client"
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function signin() {
    interface FormValues {
        Email: string,
        password: string
    }
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();

    const router = useRouter()

    const handleClick = () => {
        router.push("/auth/signup")
    }

    const formSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post(`${HTTP_BACKEND}/signin`, {
                username: data.Email,
                password: data.password
            })

            if (response.data.status) {
                toast.success(response.data.message)
                window.localStorage.setItem("D_token", response.data.token)
                router.push("/room")
            } else {
                toast.error(response.data.message)
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("No response from server. Please try again later.");
            } else {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full rounded border border-gray-800 px-10 py-20 bg-[#0E131E] max-w-[500px] mx-auto">
            <div className="h-10 w-10 mb-4 flex items-center justify-center rounded-full bg-[#0F2139]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0077FF" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
            </div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-gray-400 text-sm pt-2 pb-6">Enter your credentials to access your account</p>
            <form onSubmit={handleSubmit(formSubmit)} className="w-full">
                <div className="my-4">
                    <label className="font-medium " >Email</label>
                    <div className={`${errors.Email && 'border border-red-600'} bg-[#151D2C] mt-2 rounded-lg`}>
                        <input className="focus:outline-none w-full bg-transparent p-3 rounded-lg text-white" placeholder="name@example.com" type="email" {...register('Email',
                            {
                                required: { value: true, message: "Required" },
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" }
                            }
                        )} />
                    </div>
                    {errors?.Email && <p className="text-red-600" >{errors.Email.message}</p>}
                </div>
                <div className="my-4">
                    <label>Password</label>

                    <div className={` ${errors.password && 'border border-red-600'} bg-[#151D2C] mt-2 rounded-lg`}>
                        <input className=" focus:outline-none w-full bg-transparent text-white p-3 rounded-lg focus:outline " placeholder="......." type="text"  {...register('password',

                            {
                                required: { value: true, message: "Required" },
                                minLength: { value: 3, message: "minimum 3" },
                                maxLength: { value: 20, message: "maximum 20" },
                            }
                        )} />
                    </div>
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                </div>
                <div>
                    <button className="relative w-full bg-[#0077FF] py-3 rounded-lg font-medium flex justify-center items-center" disabled={isSubmitting}>{isSubmitting ? 'submitting....' : 'Sign in'}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>


                </div>
            </form>
            
                <p className="text-center mt-4">Don't have an account? <span onClick={handleClick} className="cursor-pointer text-[#0077FF]">Sign Up</span></p>
          
        </div>
    )
}

export default signin;
