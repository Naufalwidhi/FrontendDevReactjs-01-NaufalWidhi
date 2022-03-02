import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const DetailItem = () => {
  const { id } = useParams();
  const { data: data, loading, error } = useFetch("https://worldwide-restaurants.p.rapidapi.com/detail", id);
  console.log(data);
  return (
    <div className="detailitem">
      <div className="container">
        {data && (
          <div className="row">
            <div className="col-md-5">
              <img className="img-fluid" src={data.results.photo.images.medium.results} alt="Image Detail" />
            </div>
            <div className="col-md-7">
              <h1>{data.results.name}</h1>
              <span>{data.results.price_level}</span>
              <span>{data.results.raw_ranking}</span>
              <table className="table table-responsive">
                <tbody>
                  <tr>
                    <td>Review Item</td>
                    <td>:</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>:</td>
                    <td>{data.results.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailItem;
