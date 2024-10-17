import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

function DeleteBook() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const deleteBook = async () =>{
        //confirm for deletion
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this book?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        });
        if(confirmDelete.isConfirmed){
            try {
                await axios.delete(`http://localhost:8080/api/books/delete-book?isbn=${isbn}`)
                .then(() =>{
                    Swal.fire({
                        title: 'Deleted',
                        text: 'Book successfully deleted',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                    .then(() => {
                        navigate('/')
                        window.location.reload();
                    })
                });
            } catch (error) {
                console.error("Error while deleting book:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while deleting the book.',
                    icon: 'error'
                });
            }
        }else{
            navigate('/')
        }
    };
    deleteBook();
  }, [isbn, navigate]);

  return null; //no UI needed
}

export default DeleteBook