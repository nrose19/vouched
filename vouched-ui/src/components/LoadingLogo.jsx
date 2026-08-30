import logo from '../assets/navbar_logo.png'; // Replace with your logo path

// bouncing logo compent created by DevTools Tech (https://www.youtube.com/watch?v=E01XdDQgzDM&t=10s)
function LoadingLogo({message}) {
  return (
    <div className="flex items-center justify-center">
        <img src={logo} className="w-20 h-20 animate-logo-bounce" />
        {message && (
            <p className='font-logo text-ink mt-4 text-xl'>{message}</p>
        )}
    </div>
  );
}

export default LoadingLogo;