import useFetch from "./useFetch";
import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  //   const params = "297704";
  //   const { data, loading, error } = useFetch("https://worldwide-restaurants.p.rapidapi.com/search", params);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch("https://worldwide-restaurants.p.rapidapi.com/search", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
        "x-rapidapi-key": "7b29bafe35msha64c5a879385daap1e9b68jsn9341fc87d049",
      },
      body: new URLSearchParams({
        language: "en_US",
        limit: "30",
        location_id: "297704",
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
        console.log(data.results.data.open_now_text);
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

  const handleOpenHour = (open_now_text) => {
    const newData = data.filter((val) => val.open_now_text === open_now_text);
    setData(newData);
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md">
          <h1 className="text-left">Restaurants</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
      </div>
      <div className="row border-top border-bottom">
        <div className="col-md-2 d-inline">
          <span className="lead">Filter by :</span>
        </div>
        <div className="col-md d-inline">
          <ul class="nav">
            <li class="nav-item d-inline">
              <button class="btn btn-light" onClick={() => handleOpenHour("Open Now")}>
                Open Now
              </button>
            </li>
            <li class="nav-item d-inline pt-2">
              <form className="form-group" action="#">
                <select className="form-select">
                  <option>Termurah</option>
                  <option>Termahal</option>
                </select>
              </form>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Categories
              </a>
            </li>
          </ul>
        </div>
      </div>
      {data && (
        <div className="row mt-2">
          {data.results.data.map((val) => (
            <div className="col-md-3 mb-3">
              <div className="card">
                <img class="card-img-top" src={val.photo.images.small.url} alt="Card image cap" height="200" />
                <div className="card-body">
                  <h5 className="card-title overflow-2">{val.name}</h5>
                  <p className="card-text overflow-3">{val.description}</p>
                  <div className="col-md">
                    <span className="card-text">
                      {val.category.name} - {val.price_level}
                    </span>
                  </div>
                  <div className="col-md">
                    <span className="card-text">{val.open_now_text}</span>
                  </div>
                  <span className="card-text">{val.raw_ranking}</span>
                </div>
                <div className="card-footer">
                  <Link to={`/detailitem/${val.location_id}`} className="btn btn-warning">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
