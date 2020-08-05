import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "../MenuItem";
import classes from "./Navigation.module.scss";

interface PropTypes {
  navItems: any[];
  toggle: () => void;
}

const variants = {
  open: {
    // pointerEvents: "auto",
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    // pointerEvents: "none",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const Navigation = ({ navItems = [], toggle }: PropTypes) => (
  <motion.div className={classes.root} variants={variants}>
    {navItems.map((item) => (
      <MenuItem item={item} key={item._id} toggle={toggle} />
    ))}
  </motion.div>
);

export default Navigation;
