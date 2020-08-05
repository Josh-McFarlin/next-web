import * as React from "react";
import LogoGithub from "react-ionicons/lib/LogoGithub";
import LogoLinkedin from "react-ionicons/lib/LogoLinkedin";
import LogoTwitter from "react-ionicons/lib/LogoTwitter";
import LogoInstagram from "react-ionicons/lib/LogoInstagram";
import LogoFacebook from "react-ionicons/lib/LogoFacebook";
import classes from "./SocialLinks.module.scss";

interface PropTypes {
  linkedIn?: string;
  gitHub?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

const TextSection = ({
  linkedIn,
  gitHub,
  twitter,
  instagram,
  facebook,
}: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.section}>
      {linkedIn && (
        <a
          className={classes.link}
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoLinkedin className={classes.logo} fontSize="30px" />
        </a>
      )}
      {gitHub && (
        <a
          className={classes.link}
          href={gitHub}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoGithub className={classes.logo} fontSize="30px" />
        </a>
      )}
      {twitter && (
        <a
          className={classes.link}
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoTwitter className={classes.logo} fontSize="30px" />
        </a>
      )}
      {instagram && (
        <a
          className={classes.link}
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoInstagram className={classes.logo} fontSize="30px" />
        </a>
      )}
      {facebook && (
        <a
          className={classes.link}
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoFacebook className={classes.logo} fontSize="30px" />
        </a>
      )}
    </section>
  </div>
);

export default TextSection;
