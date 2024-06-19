import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './Home.css';
  import axios from 'axios';
  
  const Home = () => {
      const username = sessionStorage.getItem('username');
      const email = sessionStorage.getItem('email');
      const navigate = useNavigate();
      const [draft, setDraft] = useState(null);
  
      useEffect(() => {
          // Fetch the draft if it exists
          axios.get(`http://localhost:3000/getDraft?email=${email}`)
              .then(response => {
                  if (response.data.status) {
                      setDraft(response.data.draft);
                  }
              })
              .catch(error => {
                  console.error("Error fetching draft", error);
              });
      }, [email]);
  
      const postArticle = () => {
          navigate("/postArticle");
      }
  
      const viewArticles = () => {
          navigate("/viewArticles");
      }
  
      const editDraft = () => {
          navigate(`/postArticle?edit=true`);
      }
  
      return (
          <div className="home-container">
              <div className="content">
                  <h1>Welcome, {username}!</h1>
                  <button onClick={postArticle}>Post an Article</button>
                  <button onClick={viewArticles}>View Articles</button>
                  {draft && (
                      <>
                          <h2>Saved Draft</h2>
                          <div>
                              <h3>{draft.title}</h3>
                              <p>{draft.content}</p>
                              <button onClick={editDraft}>Edit</button>
                          </div>
                      </>
                  )}
              </div>
          </div>
      );
  }
  
  export default Home;
  
