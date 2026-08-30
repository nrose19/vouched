import logo from '../assets/navbar_logo.png'; // Replace with your logo path

// bouncing logo compent created by DevTools Tech (https://www.youtube.com/watch?v=E01XdDQgzDM&t=10s)
function BouncingLogo({message}) {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
        <img src={logo} className="w-20 h-20 animate-logo-bounce" />
        {message && (
            <p className='font-display text-ink mt-4'>{message}</p>
        )}
    </div>
  );
}

export default BouncingLogo;