import { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <h1>{message || "Loading..."}</h1>;
}

export default Home;
