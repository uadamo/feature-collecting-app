import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="main-panel-about">
      <div className="info-text-section-about">
        <div className="info-header-about">
          This is a research by yours truly
        </div>
        <div className="info-text-about">
          A keystroke dynamics authentication system is a behavioral biometric
          authentication system that can verify users based on their unique
          typing patterns. Unlike traditional authentication methods like
          passwords or PINs, keystroke dynamics isn't tied to a static phrase,
          but rather a user's hard-to-replicate typing pattern.
        </div>
        <div className="info-text-about">
          My master's thesis, succintly entitled{" "}
          <b>
            <i>
              Evaluation of authentication impact of alternative keyboard
              derived features for a keystroke dynamics authentication system
            </i>
          </b>{" "}
          will investigate the relationship between the authentication accuracy
          of a keystroke dynamics authentication system and a variety of
          lesser-explored typing features, such as one's typing error rate, or
          trigger reaction time - as well as combinations of these features.
        </div>
        <div className="info-text-about">
          The project is supervised by Nicola Dragoni (ndra@dtu.dk) and Maria
          Papaioannou (marpapa@dtu.dk), Department of Computer Science and
          Engineering, DTU.
        </div>
        <div className="info-text-about">
          For more information, email me at s194705@dtu.dk
        </div>
      </div>
      <div className="person-about">
        <img
          src="https://github.com/uadamo/feature-collecting-app/blob/main/src/Pages/dtu.jpg"
          alt="dtu logo"
        />
      </div>
    </div>
  );
};

export default About;
