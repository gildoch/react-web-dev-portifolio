import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocation,
  faAddressBook,
  faPerson,
  faCity,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICEID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: 'error',
        message: 'Missing EmailJS configuration. Check .env variables.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: 'info', message: 'Sending email...' });

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setSubmitStatus({
            type: 'success',
            message: 'Message sent successfully.',
          });
          form.current.reset();
          setIsSubmitting(false);
        },
        () => {
          setSubmitStatus({
            type: 'error',
            message: 'Failed to send message. Please try again.',
          });
          setIsSubmitting(false);
        }
      );
  };

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially on ambitious
            or large projects. However, if you have any other requests or
            questions, don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input
                    type="submit"
                    className="flat-button"
                    value={isSubmitting ? 'SENDING...' : 'SEND'}
                    disabled={isSubmitting}
                  />
                </li>
                <li className={`form-notification ${submitStatus.type}`}>
                  <p role="status" aria-live="polite" className="status-text">
                    {submitStatus.message}
                  </p>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          <p>
            <span className="icon">
              <FontAwesomeIcon icon={faLocation} />
            </span>
            <span>Mozambique</span>
          </p>
          <p>
            <span className="icon">
              <FontAwesomeIcon icon={faCity} />
            </span>
            <span>Maputo, Cidade de Maputo</span>
          </p>
          <p>
            <span className="icon">
              <FontAwesomeIcon icon={faPerson} />
            </span>
            <span>Gildo Chauze</span>
          </p>

          <p>
            <span className="icon">
              <FontAwesomeIcon icon={faAddressBook} />
            </span>
            <span>gildochauze@gmail.com</span>
          </p>
        </div>
        <div className="map-wrap">
          <MapContainer center={[-25.926250449080374, 32.60628462408007]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-25.926250449080374, 32.60628462408007]}>
              <Popup>Gildo lives here, come over for a cup of coffee :)</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Contact;
