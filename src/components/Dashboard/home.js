import { useRef, useState } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore/lite';
import './index.scss';

const Home = () => {
  const formRef = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitPortfolio = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !description.trim()) {
      setError('Name and description are required.');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        const sRef = storageRef(storage, `portfolio/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(sRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const portfolio = { name, description, url: url || null, image: imageUrl };
      await addDoc(collection(db, 'portfolio'), portfolio);

      setSuccess(true);
      setName('');
      setDescription('');
      setUrl('');
      setImageFile(null);
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error(err);
      setError('Failed to add portfolio. Please try again.');
    } finally {
      setLoading(false);
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
          <input id="p-image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </div>

        <div className="btn-wrapper">
          <button className="btn submit" type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Submit'}</button>
          <button className="btn signout" type="button" onClick={() => auth.signOut()}>Sign out</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
