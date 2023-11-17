import { Box } from "@mui/material";
import React, { useState } from "react";
// import emailjs from "emailjs-com";
import Head from "next/head"; // Import the Head component from Next.js
import { Router, useRouter } from "next/router";

const Payment: React.FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [showValidationMessage, setShowValidationMessage] =
    useState<boolean>(false);

  const router = useRouter();
  const sendContact = async () => {
    if (name === "" || email === "" || language === "") {
      setMessage("Please fill all fields.");
      setShowValidationMessage(true);
    } else {
      const form = new FormData();
      form.append("uname", name);
      form.append("userEmail", email);
      form.append("language", language);

      try {
        const response = fetch(
          "http://localhost/dtrust_latest/backend/contact_mail.php",
          {
            method: "POST",
            body: form,
            // credentials: "include",
          }
        );

        if (response.ok) {
          // router.push("/");
        }
      } catch (error) {
        console.error("An error occurred while logging", error);
      }
    }
  };

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_f4uu9d5",
  //       "template_ves5qbt",
  //       e.target, // Pass the form element directly
  //       "KEh-47RO1dt9QCm80"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="DTrust generates decentralized smart contract trust agreements on the ethereum network for estate planning, asset protection, and much more."
          key="desc"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        ></link>
        <meta property="og:title" content="Decentralized Trust Agreements" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:description"
          content="DTrust generates decentralized smart contract trust agreements on the ethereum network for estate planning, asset protection, and much more."
        />
        <meta property="og:image" content="/metatag.jpg" />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-md-2">
            <p className="para">
              We will arrange a one-hour Zoom call with a qualified attorney who
              will discuss how you can use a dtrust to achieve your goals.
              Submit the form and pay the fee to cover the attorney's time; then
              we will send you a calendly link. Service includes:
            </p>
            <p className="para1">
              1. Full Access to the DTrust DApp that can form and manage
              unlimited dtrusts
            </p>
            <p className="para1">
              2. 1 hour of one-on-one consultation with a qualified attorney in
              the preferred language of your choice
            </p>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 offset-md-2 text">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="col-lg-12">
                <label style={{ paddingTop: 20 }}>Name</label>
              </div>
              <div className="col-lg-12">
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  name="name"
                  id="uname"
                  className="demoInputBox"
                />
                {showValidationMessage && name === "" && (
                  <span
                    id="uname-info"
                    className="info"
                    style={{ color: "red" }}
                  >
                    Name is required
                  </span>
                )}
                <span id="uname-info" className="info" />
              </div>
              <div className="col-lg-12">
                <label style={{ paddingTop: 20 }}>Email</label>
              </div>
              <div className="col-lg-12">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  name="email"
                  id="userEmail"
                  className="demoInputBox"
                />
                {showValidationMessage && email === "" && (
                  <span
                    id="userEmail-info"
                    className="info"
                    style={{ color: "red" }}
                  >
                    Email is required
                  </span>
                )}
                <span id="userEmail-info" className="info" />
              </div>
              <div className="col-lg-12">
                <label style={{ paddingTop: 20 }}>Language</label>
              </div>
              <div className="col-lg-12">
                <input
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                  type="text"
                  name="language"
                  id="language"
                  className="demoInputBox"
                />
                {showValidationMessage && language === "" && (
                  <span
                    id="language-info"
                    className="info"
                    style={{ color: "red" }}
                  >
                    Language is required
                  </span>
                )}
                <span id="language-info" className="info" />
              </div>
              {/* <div style={{ color: "green" }}>
              {name === "" || email === "" || language === "" ? message : null}
            </div> */}
              <div className="col-lg-4"></div>
              <div className="col-lg-6 offset-md-4">
                <button
                  type="submit"
                  name="submit"
                  className="btnAction"
                  onClick={sendContact}
                >
                  Pay now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
