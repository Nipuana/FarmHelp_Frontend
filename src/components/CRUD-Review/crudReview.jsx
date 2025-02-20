import React, { useState, useEffect } from "react";
import API from "../../API/api"; // API file for backend calls
import "../../css/CrudReviewCss/crudReview.css";
import { FaSearch } from "react-icons/fa";

const ReviewCRUD = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await API.getAllReviews();
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  const getFilteredReviews = () => {
    return reviews.filter((review) =>
      review.userId.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="review-container">
      <h1 className="review-title">Reviews</h1>

      <div className="header-section_review">
        <div className="search-bar_review">
          <input
            type="text"
            placeholder="Search User Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon_review" />
        </div>
      </div>

      {/* Review Table */}
      <div className="review-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>User Id</th>
              <th>Review Text</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredReviews().map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.userId}</td>
                <td>{review.reviewText}</td>
                <td>{review.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewCRUD;
