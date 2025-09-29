import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookService from "../../service/BookService";

const DeleteBookById = () => {
  let { bid } = useParams();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const promise = bookService.deletebook(bid);

    promise
      .then((res) => {
        alert(`Book with ID ${bid} Deleted successfully...!`);
        navigate("/getAllbook");
      })
      .catch((err) => {
        setMsg(err.message);
      });
  }, [bid]);

  return (
    <>
      <div className="container mt-3">
        <h3>Delete Book</h3>
        <p>
          Deleted Book ID: <strong>{bid}</strong>
        </p>
        {msg === "Record Deleted"
          ? navigate("/getAllbook")
          : "Record not deleted"}
      </div>
    </>
  );
};
export default DeleteBookById;
