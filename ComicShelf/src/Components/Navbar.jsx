import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <>
        <nav class="navbar navbar-light bg-dark">
            <div class="container-fluid container">
                <a class="navbar-brand text-white" href="#">
                    <p className='fs-3'>ComicShelf</p>
                </a>
                <button type="button" class="btn btn-success fs-5">Add a New Book</button>
            </div>
        </nav>
    </>
  )
}

export default Navbar
