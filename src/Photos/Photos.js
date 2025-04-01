import { useState, useEffect, useRef, useCallback } from "react";
import Loading from "../components/Loading";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef();

  const PHOTOS_PER_PAGE = 20;

  // fetch photos by page
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${PHOTOS_PER_PAGE}&_page=${page}`
      );
      if (!res.ok) {
        throw new Error("failed to fetch photos");
      }
      const data = await res.json();
      setPhotos((prev) => [...prev, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // observer to trigger next page
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading]
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        {photos.map((photoItem, index) => {
          if (index === photos.length - 1) {
            return (
              <div ref={lastPhotoRef} key={photoItem.id}>
                <p>{photoItem.title}</p>
                <img src={photoItem.url} alt={photoItem.title} />
              </div>
            );
          }
          return (
            <div key={photoItem.id}>
              <p>{photoItem.title}</p>
              <img src={photoItem.url} alt={photoItem.title} />
            </div>
          );
        })}
      </div>
      {loading && <Loading />}
    </>
  );
}
