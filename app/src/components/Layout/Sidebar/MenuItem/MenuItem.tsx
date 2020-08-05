import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../../../Icon";
import urls from "../../../../utils/urls";
import classes from "./MenuItem.module.scss";

interface PropTypes {
  item: any;
  toggle: () => void;
}

const variants = {
  open: {
    x: 0,
    opacity: 1,
    display: "block",
    transition: {
      x: {
        stiffness: 5,
        velocity: -100,
      },
    },
  },
  closed: {
    x: 100,
    opacity: 0,
    display: "none",
    transition: {
      x: {
        stiffness: 5,
      },
      display: {
        delay: 0.3,
      },
    },
  },
};

const MenuItem = ({ item, toggle }: PropTypes) => {
  const { slug, title, link, icon } = item;
  const router = useRouter();

  const isActive =
    router.pathname === urls.pages.sanityPage() &&
    router?.query?.slug === slug?.current;

  return (
    <motion.div className={classes.root} variants={variants} onClick={toggle}>
      {slug != null ? (
        <Link
          href={{
            pathname: urls.pages.sanityPage(),
            query: { slug: slug.current },
          }}
          as={urls.pages.sanityPage(slug.current)}
        >
          <div
            className={classes.container}
            data-is-active={isActive ? "true" : "false"}
          >
            <Icon type={icon} className={classes.icon} />
            <p className={classes.text}>{title}</p>
          </div>
        </Link>
      ) : (
        <a
          className={classes.linkText}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={classes.container}
            data-is-active={isActive ? "true" : "false"}
          >
            <Icon type={icon} className={classes.icon} />
            <p className={classes.text}>{title}</p>
          </div>
        </a>
      )}
    </motion.div>
  );
};

export default MenuItem;
