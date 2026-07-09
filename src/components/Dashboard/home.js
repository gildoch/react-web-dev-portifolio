import { useRef, useState } from 'react';
import './index.scss';

const Home = () => {
  const fileInputRef = useRef();
  const formRef = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadToImageKit = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('publicKey', process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY);
      formData.append('fileName', `portfolio_${Date.now()}_${file.name}`);
      formData.append('folder', '/react_portfolio');

      const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('ImageKit upload failed');
      }

      const data = await response.json();
      setImageUrl(data.url);
      setError(null);
      return data.url;
    } catch (err) {
      console.error('ImageKit upload error:', err);
      setError('Failed to upload image to ImageKit');
      setUploading(false);
      return null;
    }
  };

  const submitPortfolio = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !description.trim()) {
      setError('Name and description are required.');
      return;
    }

    try {
      let finalImageUrl = imageUrl;

      // Upload image to ImageKit if a new file is selected
      if (imageFile && !imageUrl) {
        finalImageUrl = await uploadToImageKit(imageFile);
        if (!finalImageUrl) {
          return;
        }
      }

      // Store data in localStorage with ImageKit URL
      const existingData = JSON.parse(localStorage.getItem('portfolioItems')) || [];
      const newPortfolioItem = {
        title: name,
        description,
        url: url || null,
        cover: finalImageUrl || 'https://ik.imagekit.io/gildoch/react_portfolio/findDuo__Z_TCPW2C.png?updatedAt=1778492101576'
      };

      existingData.push(newPortfolioItem);
      localStorage.setItem('portfolioItems', JSON.stringify(existingData));

      setSuccess(true);
      setName('');
      setDescription('');
      setUrl('');
      setImageFile(null);
      setImageUrl('');
      setUploading(false);
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error(err);
      setError('Failed to add portfolio. Please try again.');
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Preview or prepare for upload
      uploadToImageKit(file);
    }
  };

  return (
    <div className="dashboard-form">
      <form ref={formRef} onSubmit={submitPortfolio} className="dashboard-card">
        <h2>Add portfolio item</h2>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Portfolio item added.</div>}

        <div className="field">
          <label htmlFor="p-name">Name</label>
          <input id="p-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        </div>

        <div className="field">
          <label htmlFor="p-desc">Description</label>
          <textarea id="p-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </div>

        <div className="field">
          <label htmlFor="p-url">Url (optional)</label>
          <input id="p-url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
        </div>

        <div className="field">
          <label htmlFor="p-image">Image (optional)</label>
          <input 
            id="p-image" 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            disabled={uploading}
          />
          {uploading && <p className="uploading">Uploading to ImageKit...</p>}
          {imageUrl && <p className="uploaded">✓ Image uploaded successfully</p>}
        </div>

        <div className="btn-wrapper">
          <button className="btn submit" type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
