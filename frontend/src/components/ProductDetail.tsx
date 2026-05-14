import type { Product, Review } from "../types";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";
import "./product-detail.css";
import { useCart } from "../context/CartContext";

export function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");
    const [msg, setMsg] = useState("");

    const loadReviews = () => {
        fetch(`http://localhost:3000/api/products/${id}/reviews`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error("Error loading reviews:", error));
    };

    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Product not found");
                }
                return res.json();
            })
            .then((data) => setProduct(data))
            .catch((error) => {
                console.error("Error:", error);
                setError(true);
            });
        loadReviews();
    }, [id]);

    const handleSubmitReview = () => {
        if (!id) {
            setMsg("Invalid product ID");
            return;
        }

        fetch(`http://localhost:3000/api/products/${id}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "rating": newRating, "comment": newComment, "customerId": 1 }),
        })
            .then(async (res) => {
                const data = await res.json().catch(() => null);
                if (!res.ok) {
                    const errorMessage = data?.error || data?.message || `Error ${res.status}`;
                    throw new Error(errorMessage);
                }
                return data;
            })
            .then((data) => {
                setMsg(data?.error ? `${data.error}` : "✔ Review submitted");
                if (!data?.error) {
                    setNewComment("");
                    setNewRating(5);
                    loadReviews();
                }
            })
            .catch((error) => {
                console.error("Error submitting review:", error);
                setMsg("Error submitting review");
            });
    };

    if (error) {
        return <NotFound />;
    }

    if (!product) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <button className="back-button" onClick={() => navigate("/")}>← Back</button>
                <img src={product.image_url} alt={product.name} />
                <h3>{product.name}</h3>
                {product.description && <p className="description">{product.description}</p>}
                <p className="price">{Number(product.price).toFixed(2)} €</p>
                <p className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                    {product.stock > 0 ? `In Stock - ${product.stock} units` : "Out of Stock - 0 units"}
                </p>

                <button className="add-to-cart-button" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                    Add to Cart
                </button>
            </div>

            {/* Reviews section */}
            <div className="reviews-section">
                <h2>Reviews ({reviews.length})</h2>
                
                {/* Reviews list */}
                <div className="reviews-list">
                    {reviews.length === 0 ? (
                        <p>No reviews yet. Be the first to leave one!</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <strong>{review.customer_name}</strong>
                                    <span className="review-stars">
                                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                    </span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <small className="review-date">{new Date(review.created_at).toLocaleDateString()}</small>
                            </div>
                        ))
                    )}
                </div>

                {/* New review form */}
                <div className="review-form">
                    <h3>Leave a Review</h3>
                    
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <select 
                            id="rating"
                            value={newRating} 
                            onChange={(e) => setNewRating(Number(e.target.value))}
                        >
                            <option value={1}>1 - Terrible</option>
                            <option value={2}>2 - Bad</option>
                            <option value={3}>3 - Okay</option>
                            <option value={4}>4 - Good</option>
                            <option value={5}>5 - Excellent</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Tell us about your experience with this product..."
                            rows={4}
                        />
                    </div>

                    <button className="submit-review-btn" onClick={handleSubmitReview}>
                        Submit Review
                    </button>

                    {msg && <p className={msg.includes("✔") ? "success-msg" : "error-msg"}>{msg}</p>}
                </div>
            </div>
        </div>
    );
}