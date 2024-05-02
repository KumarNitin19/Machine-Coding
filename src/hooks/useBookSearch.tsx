import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [books, setBooks] = useState<Array<unknown>>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    let cancel: Function = () => {};
    if (query.length) {
      axios({
        method: "GET",
        url: "http://openlibrary.org/search.json",
        params: {
          q: query,
          page: pageNumber,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((resp) => {
          setBooks((prevBooks) => {
            return [
              ...new Set([
                ...prevBooks,
                ...resp?.data?.docs?.map((b: any) => b?.title),
              ]),
            ];
          });
          setHasMore(resp?.data?.docs?.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    } else {
      setLoading(false);
      setError(false);
    }

    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, books, hasMore };
}
