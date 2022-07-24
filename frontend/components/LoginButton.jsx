const LoginButton = ({ session, signIn, signOut }) => {
  if (session) {
    return (
      <div className='flex flex-col items-center gap-y-2 text-white'>
        <button
          className='border w-20 border-white rounded px-2 py-2 text-white'
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className='flex flex-col items-center gap-y-2 text-white'>
      <button
        className='border w-20 border-white rounded px-2 py-2 text-white'
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
};

export default LoginButton;
