import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./Navigation";
import { selectSidebarOpen } from "../../../utils/store/navigation/selectors";
import { setSidebarOpen } from "../../../utils/store/navigation/navigationSlice";
import classes from "./Sidebar.module.scss";

interface PropTypes {
  navItems: any[];
  width?: number;
}

const backgroundVariants = {
  initial: {
    opacity: 0,
  },
  render: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
};

const sidebarVariants = {
  initial: (width: number) => ({
    x: -width,
  }),
  render: {
    x: 0,
    transition: {
      damping: 0,
      stiffness: 25,
    },
  },
  exit: (width: number) => ({
    x: -width,
    transition: {
      damping: 0,
      stiffness: 25,
    },
  }),
};

const Sidebar = ({ navItems = [], width = 400 }: PropTypes) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSidebarOpen);

  const handleClose = (): void => {
    dispatch(
      setSidebarOpen({
        sidebarOpen: false,
      })
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="background"
          className={classes.root}
          variants={backgroundVariants}
          initial="initial"
          animate="render"
          exit="exit"
          onClick={handleClose}
        >
          <motion.div
            key="sidebar"
            className={classes.sidebar}
            variants={sidebarVariants}
            custom={width}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              event.stopPropagation()
            }
          >
            <Navigation navItems={navItems} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
