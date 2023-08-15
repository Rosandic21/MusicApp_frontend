// ContactForm.js: Displays and handles the contact form 
// For simplicity and security purposes, EmailJS is used for services associated with the contact form
// Documentation for this can be found at: https://www.emailjs.com/docs/examples/reactjs/

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from "styled-components";

const ContactUs = ({emailSent, setEmailSent}) => {
  const form = useRef();
  

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2xpidwe', 'template_4vdfb1l', form.current, 'jQADs2wYnPwcupw5b')
      .then((result) => {
          console.log(result.text);
          console.log('Message sent!');
          setEmailSent(true);
          setTimeout(() => {
            setEmailSent(false);
        }, 2000); // Set a timeout to reset the state after 2 seconds
        form.current.reset(); // resets the form fields after msg gets sent
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <StyledContactForm>
        <h1 className="text-2xl border-b text-white">Contact Form</h1>
        {emailSent && <p className="text-white">Message sent!</p>} {/* display 'Message sent' after email is sent */}
        <form ref={form} onSubmit={sendEmail}>
            <label className="text-white">Name</label>
            <input type="text" name="user_name" />
            <label className="text-white">Email</label>
            <input type="email" name="user_email" />
            <label className="text-white">Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    </StyledContactForm>
  );
};

// Styles
const StyledContactForm = styled.div`
  width: 400px;
  margin-left: auto; /* Align to the right edge */ 
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;

export default ContactUs;