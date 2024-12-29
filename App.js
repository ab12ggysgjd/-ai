import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [videoURL, setVideoURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/videos/generate', formData);
      setVideoURL(response.data.videoURL);
    } catch (error) {
      console.error('Error generating video:', error);
    }
  };

  return (
    <div className="App">
      <h1>מחולל וידאו AI</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="הזן טקסט לסרטון..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">צור וידאו</button>
      </form>
      {videoURL && <video src={videoURL} controls />}
    </div>
  );
}

export default App;
