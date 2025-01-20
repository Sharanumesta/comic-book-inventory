import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function DeleteBook() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/${
    import.meta.env.VITE_BOOK_ROUTE
  }`;

  const { isbn } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const deleteBook = async () => {
      //confirm for deletion
      const confirmDelete = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this book?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });
      if (confirmDelete.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}/delete-book?isbn=${isbn}`).then(() => {
            Swal.fire({
              title: "Deleted",
              text: "Book successfully deleted",
              icon: "success",
              confirmButtonText: "Okay",
            }).then(() => {
              navigate("/");
              window.location.reload();
            });
          });
        } catch (error) {
          console.error("Error while deleting book:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the book.",
            icon: "error",
          });
        }
      } else {
        navigate("/");
      }
    };
    deleteBook();
  }, [isbn, navigate]);

  return null;
}

export default DeleteBook;
