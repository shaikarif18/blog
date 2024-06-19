

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link to use for navigation
import axios from 'axios';
import './MyArticles.css'; // Import the CSS file

const MyArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const email = sessionStorage.getItem('email');
      const response = await axios.get('http://localhost:3000/myarticles', {
        params: { email }
      });
      const data = response.data.data;
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/article/${id}`);
          fetchArticles();
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <>
      <h1>My Articles</h1>
      {articles.length > 0 ? (
        <table className='articles-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Read your Article</th>
              <th>View Comments</th>
              <th>Delete your Article</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>
                  <Link to={`/article/${article._id}`}>
                    <button className='small-button'><h5>Read</h5></button>
                  </Link>
                </td>
                <td><button className='small-button'><h5>View Comments</h5></button></td>
                <td><button className='small-button' onClick={() => handleDelete(article._id)}><h5>Delete</h5></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No articles to display</p>
      )}
      <div className='button-container'>
        <Link to={'/postArticle'}>
        <button className='my-articles-button'><h3>Add New Article</h3></button>
        </Link>
      </div>
    </>
  );
};

export default MyArticles;

