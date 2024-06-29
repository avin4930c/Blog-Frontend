import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { GiSpikedDragonHead } from "react-icons/gi";

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

function SignupForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [serverErrors, setServerErrors] = useState([]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        setServerErrors(result.errors);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      setServerErrors([{ msg: 'Something went wrong. Please try again later.' }]);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-36 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/229a20fb-a16b-4d4c-a9a3-70f44a6465d2/dfsz0n2-704c09cd-88a9-4bcc-802e-4f5e1c14a53a.jpg/v1/fill/w_1024,h_1195,q_75,strp/luffy_and_momo_by_nevergiveup1_dfsz0n2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTE5NSIsInBhdGgiOiJcL2ZcLzIyOWEyMGZiLWExNmItNGQ0Yy1hOWEzLTcwZjQ0YTY0NjVkMlwvZGZzejBuMi03MDRjMDljZC04OGE5LTRiY2MtODAyZS00ZjVlMWMxNGE1M2EuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EN3EMpIemRLa-8q9eQwadHvHx2HNeyQiQ5Qn9m09kk8"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <GiSpikedDragonHead className='w-20 h-20' />
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Transponder Medium
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Join our community of passionate writers and readers. Sign up to start sharing your thoughts, stories, and insights with a global audience.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6" autoComplete='off'>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  {...register('first_name')}
                  className="mt-1 py-2 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm"
                />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  {...register('last_name')}
                  className="mt-1 py-2 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm"
                />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete='off'
                  {...register('email')}
                  className="mt-1 py-2 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  autoComplete='off'
                  {...register('password')}
                  className="mt-1 py-2 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  {...register('password_confirmation')}
                  className="mt-1 py-2 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm"
                />
                {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation.message}</p>}
              </div>

              {serverErrors.length > 0 && (
                <div className="col-span-6">
                  <ul className="text-red-500 text-xs mt-1">
                    {serverErrors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account? <Link to="/login" className="font-medium text-blue-600">Log in</Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default SignupForm;