import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../service/categoryService";

const DeleteBookById = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const promise = categoryService.deleteCategory(id);

    promise.then((res) => {
      alert(`Category with ID ${id} Deleted successfully...!`);
    });
  });
};
export default DeleteBookById;
