import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Post from './components/Post';
import ViewArticles from './components/ViewArticles';
import MyArticles from './components/MyArticles';
import ArticleDetails from './components/ArticleDetails';
import MyProfile from './components/MyProfile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postArticle" element={<Post />} />
        <Route path="/viewArticles" element={<ViewArticles />} />
        <Route path="/myarticles" element={<MyArticles />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
