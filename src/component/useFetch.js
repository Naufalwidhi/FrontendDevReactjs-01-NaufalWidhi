import { useState, useEffect } from "react";

const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
        "x-rapidapi-key": "7b29bafe35msha64c5a879385daap1e9b68jsn9341fc87d049",
      },
      body: new URLSearchParams({
        language: "en_US",
        limit: "30",
        location_id: params,
        currency: "IDR",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => abortCont.abort();
  }, []);

  return { data, loading, error };
};

export default useFetch;
