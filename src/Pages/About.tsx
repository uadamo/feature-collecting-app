import React from "react";
import "./Disclaimer.css";

const About = () => {
  return (
    <div className="main-panel">
      About
      <div className="info-header">This is a research by yours truly</div>
      <div className="info-text">
        A keystroke dynamics authentication system is a behavioral biometric
        authentication system that can verify users based on their unique typing
        patterns. Unlike traditional authentication methods like passwords or
        PINs, keystroke dynamics isn't tied to a static phrase, but rather a
        user's hard-to-replicate typing pattern.
      </div>
      <div className="info-text">
        My master's thesis, succintly entitled{" "}
        <b>
          <i>
            Evaluation of authentication impact of alternative keyboard derived
            features for a keystroke dynamics authentication system
          </i>
        </b>{" "}
        will investigate the relationship between the authentication accuracy of
        a keystroke dynamics authentication system and a variety of
        lesser-explored typing features, such as one's typing error rate, or
        trigger reaction time - as well as combinations of these features.
        Problem is, some of these features are downright unexplored in existing
        databases - which is why <b>I need you to type</b>.
      </div>
      <div className="info-text">
        The project is supervised by Nicola Dragoni (ndra@dtu.dk) and Maria
        Papaioannou (marpapa@dtu.dk), Department of Applied Mathematics and
        Computer Science, DTU.
      </div>
      <div className="info-text">
        For more information, email me at s194705@dtu.dk
      </div>
      <div className="info-text-highlighted">
        Thank you for being a part of this - sending virtual hugs your way!
      </div>
      <div className="into-text-signature">Sincerely,</div>
      <div className="into-text-signature">Ugne A.</div>
    </div>
  );
};

export default About;
