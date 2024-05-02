import { useState, useEffect, useRef, useCallback } from "react";
import useBookSearch from "../../hooks/useBookSearch";
import * as React from "react";
import { addStyle } from "../../utils/addStyle";

const InfiniteScroll = () => {
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElement = useCallback(
    (node: HTMLDivElement) => {
      console.log(node);
      if (loading) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPageNumber((prevPageNum) => prevPageNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const style = ` 
  .infinite-scroll{
     display:flex;
     flex-direction:column;
     gap:16px;
     padding:16px;
  }
    .content-window{
        flex:1;
        overflow:auto;
    }
      `;

  useEffect(() => {
    addStyle(style);
  }, []);

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} />
      <div className="content-window">
        {books?.length ? (
          books?.map((book: any, index: number) => {
            if (books.length === index + 1) {
              return (
                <div key={book} ref={lastElement}>
                  {book}
                </div>
              );
            } else {
              return <div key={book}>{book}</div>;
            }
          })
        ) : !loading && !error ? (
          <div>Please search something</div>
        ) : null}
        {loading ? <div>Loading...</div> : null}
        {error ? <div> Error</div> : null}
      </div>
    </div>
  );
};

export default InfiniteScroll;
