import { Link } from "react-router-dom";
import cityBgImage from "../assets/dual_city_bg.jpg";

function WelcomePage() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${cityBgImage})` }}>
      <div className="absolute inset-0 bg-rosewood/60" />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        

        <div className="bg-paper/70 rounded-2xl p-5 w-full max-w-2xl z-50 -mt-5 flex flex-col items-center">
            <h1 className="font-logo text-8xl text-rosewood">Vouched</h1>
            <p className="font-display text-3xl text-ink mb-2">
            Discover your city, one trusted spot at a time.
            </p>

            <p className="font-sans text-xl font-bold text-ink max-w-md pt-2 pb-2">
            Save the places you love, share them with friends you whose opinions you trust.
            <br />
            Find your next favourite spot through people you know, not strangers.
            </p>        
           
            <div className="flex justify-center gap-10 mt-5">
                <Link to="/login" className="font-display text-xl bg-rosewood text-paper-light px-6 py-3 rounded-lg">
                    Log in
                </Link>
                <Link to="/register" className="font-display text-xl bg-paper text-ink px-6 py-3 rounded-lg border border-rosewood">
                    Sign up
                </Link>
            </div>

        </div>

            

      </div>
    </div>
  );
}

export default WelcomePage;