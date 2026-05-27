import { useEffect, useState } from "react";

function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.json();
      })
      .then((data) => {
        setHomeData(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Could not connect to backend.");
      });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>

      {error && <p>{error}</p>}

      {!homeData && !error && <p>Loading...</p>}

      {homeData && (
        <div>
          <h2>{homeData.title}</h2>
          <p>{homeData.message}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;