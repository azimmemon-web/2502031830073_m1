import { useNavigate } from 'react-router-dom'; // Import add kiya

export default function Home() {
    const navigate = useNavigate();

    const goToAbout = () => {
        navigate('/about'); // Button click par About page par bhejega
    }

    return (
      <div>
        <h2>Home Page</h2>
        <p>Welcome to the Home page!</p>
        <button onClick={goToAbout}> Go to About</button>
      </div>
    );
}