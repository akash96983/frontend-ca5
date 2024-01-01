import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

function Bookpage() {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);


  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((err) => {
        console.log(`Error Found: ${err}`);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());

    axios
      .post(
        "https://reactnd-books-api.udacity.com/search",
        { query: value.toLowerCase(), maxResults: 30 },
        { headers: { Authorization: "whatever-you-want" } }
      )
      .then((res) => {
        setSearchBooks(res.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let filterList = searchValue !== "" ? searchBooks : books;

  return (
    <div id="bookswholepage">
      <div id="firstarea">
        <div id="logoandbook">
          <img
            id="booklogo"
            src="https://res.cloudinary.com/dduugsixy/image/upload/v1703222226/image-removebg-preview_24_yefmr9.png"
            alt="Book img"
          />
          <h1 id="kalviumbooks">
            Kalvium <br /> Books
          </h1>
        </div>
        <input
          type="text"
          id="searchbar"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Link to="/register">
          <button id="registerbtn">Register</button>
        </Link>
      </div>
      <div
        className="books-container"
        style={{ width: "100%", height: "100%" }}
      >
        {Array.isArray(filterList) && filterList.length > 0 ? (
          filterList.map((book, index) => (
            <div className="books" key={index}>
              {book.imageLinks && book.imageLinks.thumbnail && (
                <img
                  className="bookimg"
                  src={book.imageLinks.thumbnail}
                  alt="not found"
                />
              )}
              <div id="booktitle">
              <p className="title">{book.title}</p>
              </div>
              {/* </div> */}

              <div id="bookinfo">
                <span>{book.averageRating ? book.averageRating : "3"}</span>
                <span>⭐</span>
              </div>
              <div id="free">
                <button id="freebtn">Free</button>
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ color: "red" }}>No Books Available</h1>
        )}
      </div>
    </div>
  );
}

export default Bookpage;
