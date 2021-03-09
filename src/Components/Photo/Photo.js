import React from "react";
import { useParams } from "react-router-dom";
import { PHOTO_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import UseFetch from "../Hooks/UseFetch";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = UseFetch();

  React.useEffect(() => {
    const { url } = PHOTO_GET(id);
    request(url);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <PhotoContent single={true} data={data} />
      </section>
    );
    else return null;
};

export default Photo;
