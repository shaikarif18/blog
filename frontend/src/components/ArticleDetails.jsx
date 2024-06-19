import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticleDetails.css';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const [postedComment, setPostedComment] = useState('');

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/article/${id}`);
      setArticle(response.data.article);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const postComment = async () => {
    try {
        const response = await axios.post(`http://localhost:3000/article/${id}/comment`, { comment });
        setPostedComment(response.data.comment);
        // Optionally, you can update the UI or display a message indicating that the comment was posted successfully
    } catch (error) {
        console.error(error);
    }
};


  return (
    <>
    <div className="article-details-container">
      {article ? (
        <>
          <h1 className="article-title">Title: {article.title}</h1>
          <h2 className="article-content-heading">Content:</h2>
          <p className="article-content">{article.content}</p>
          {/* Post a comment form */}
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button className="post-comment-button" onClick={postComment}>Post Comment</button>
          {/* Display posted comment */}
          {postedComment && (
            <div className="posted-comment">
              <h3>Your Comment:</h3>
              <p>{postedComment}</p>
            </div>
          )}
        </>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
    </>
  );
};

export default ArticleDetails;
