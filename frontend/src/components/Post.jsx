import React, { useState, useEffect } from "react";
import "./Post.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Post = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const email = sessionStorage.getItem('email');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isEdit = searchParams.get('edit');

    useEffect(() => {
        // Fetch the draft if it exists and we are in edit mode
        if (isEdit) {
            axios.get(`http://localhost:3000/getDraft?email=${email}`)
                .then(response => {
                    if (response.data.status) {
                        const { draft } = response.data;
                        setTitle(draft.title);
                        setContent(draft.content);
                    }
                })
                .catch(error => {
                    console.error("Error fetching draft", error);
                });
        }
    }, [email, isEdit]);

    const handleInput = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else {
            setContent(e.target.value);
        }
    };

    const postArticle = (isDraft = false) => {
        if (title === '' || content === '') {
            alert('Please fill all the fields');
            return;
        }
        const data = { title, content, email };
        const url = isDraft ? "http://localhost:3000/saveDraft" : "http://localhost:3000/post";
        axios.post(url, data)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <h1>{isEdit ? 'Edit Draft' : 'Post an Article'}</h1>
            <div>
                <input type="text" name="title" placeholder="Title" value={title} required onChange={handleInput} />
            </div>
            <input type="text" name="content" placeholder="Content" value={content} onChange={handleInput} />
            <button onClick={() => postArticle(false)}>{isEdit ? 'Update' : 'Post'}</button>{" "}
            <button onClick={() => postArticle(true)}>Save Draft</button>
        </div>
    );
};

export default Post;

