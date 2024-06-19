
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewArticles.css';

const ViewArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/articles')
      .then((response) => {
        if (response.data.status) {
          setArticles(response.data.articles);
        } else {
          alert('Failed to fetch articles');
        }
      })
      .catch((error) => {
        console.error("Fetch articles error", error);
      });
  }, []);

  return (
    <div className="articles-container">
      <h1>View Articles</h1>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div key={index} className="article">
            <h2>Title: {article.title}</h2>
            {/* <p>Content: {article.content}</p> */}
            <p><strong>Author:</strong> {article.email}</p>
            {/* Use Link component for navigation */}
            <Link to={`/article/${article._id}`}>
              <button>Read</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
};

export default ViewArticles;
