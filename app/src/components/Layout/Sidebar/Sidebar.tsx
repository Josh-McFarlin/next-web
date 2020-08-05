import * as React from "react";
import { motion, useCycle } from "framer-motion";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import classes from "./Sidebar.module.scss";

interface PropTypes {
  navItems: any[];
}

const sidebarVariants = {
  open: {
    background: "rgba(0, 0, 0, 0.3)",
  },
  closed: {
    background: "rgba(0, 0, 0, 0)",
    transition: {
      delay: 0.8,
    },
  },
};

const backgroundVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    boxShadow: "-5px 0px 20px 5px rgba(0, 0, 0, 0.4)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at calc(100% - 40px) 40px)",
    boxShadow: "-5px 0px 20px 5px rgba(0, 0, 0, 0)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const height = 500;

const Sidebar = ({ navItems = [] }: PropTypes) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = React.useRef(null);
  // const { height } = useComponentSize(containerRef);

  return (
    <motion.nav
      className={classes.root}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      ref={containerRef}
    >
      <motion.div
        className={classes.background}
        variants={backgroundVariants}
        custom={height}
      >
        <MenuToggle toggle={toggleOpen} />
        <Navigation navItems={navItems} toggle={toggleOpen} />
      </motion.div>
    </motion.nav>
  );
};

export default Sidebar;
