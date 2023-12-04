

//NOTE:  make a form dynamic for sign up and sign in
//NOTE: add button under form to toggle between sign up and sign in

function SignUp() {
  return (
<div className="fixed top-0 left-0 w-full h-full">
    <div className="grid grid-cols-2 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover object-left-bottom"
          src="/happy-holiday-21.png"
          alt="sign-up"
        />
      </div>
      <div className="bg-gray-800 flex flex-col pt-[120px]">
        <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN UP
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Username</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password Verification</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
          </div>
          <button className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg">
            Sign Up
          </button>
        </form>
      </div>
    </div>
</div>
  );
}

export default SignUp;
