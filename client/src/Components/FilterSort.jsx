import React from "react";

const FilterSort = ({ setSort, filterType, setFilterType, setFilterValue, authors }) => {
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(""); // Reset filter value on filter type change
  };

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="row mb-3 mt-5">
      {/* Filtering Section */}
      <div className="col-8 d-flex align-items-center justify-content-start">
        <div className="d-flex flex-row me-2 p-0">
          <h6 className="d-block d-flex align-items-center justify-content-center me-2 m-0">Filter&nbsp;by:</h6>
          <select className="form-select" onChange={handleFilterChange} value={filterType}>
            <option value="author">Author</option>
            <option value="condition">Condition</option>
          </select>
        </div>
        {
          filterType === "author" ?
          (
            <div className="">
              <select className="form-select" id="authorSelect" onChange={handleInputChange}>
                <option value="">Select Author</option>
                {
                  authors.map((author, index) => (
                    <option key={index} value={author}>
                      {author}
                    </option>
                  ))
                }
              </select>
            </div>
          ) : (
          <div className="">
            <select className="form-select" id="conditionSelect" onChange={handleInputChange}>
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          )}
        </div>

      {/* Sorting Section */}
      <div className="col-4 d-flex align-items-center justify-content-end">
        <div className="">
            <h6 className="d-block d-flex align-items-center justify-content-center me-2 m-0">Sort:</h6>
        </div>
        <select className="form-select" id="sort" onChange={(e) => setSort(e.target.value)}>
          {/* <option value="">Select Sort Option</option> */}
          <option value="name">Book Name</option>
          <option value="author">Author Name</option>
          <option value="price">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
