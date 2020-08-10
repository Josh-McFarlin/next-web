import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Portal from "../../Portal";
import CollectionMenuItem from "./CollectionMenuItem";
import { setCollectionMenuOpen } from "../../../utils/store/navigation/navigationSlice";
import { selectCollectionMenuOpen } from "../../../utils/store/navigation/selectors";
import { ShopCollectionType } from "../../../../types/sanity/objects/shopCollection";
import classes from "./CollectionMenu.module.scss";

interface PropTypes {
  collections: ShopCollectionType[];
}

const CollectionMenu = ({ collections = [] }: PropTypes) => {
  const dispatch = useDispatch();
  const open = useSelector(selectCollectionMenuOpen);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleClose = (): void => {
    dispatch(
      setCollectionMenuOpen({
        collectionMenuOpen: false,
      })
    );
  };

  if (!open) return null;

  return (
    <Portal>
      <div
        className={classes.root}
        onMouseOver={handleClose}
        onFocus={handleClose}
      >
        <div
          className={classes.paper}
          onMouseOverCapture={(event) => event.stopPropagation()}
          onFocusCapture={(event) => event.stopPropagation()}
        >
          {collections.map((collection) => (
            <CollectionMenuItem key={collection._key} item={collection} />
          ))}
        </div>
      </div>
    </Portal>
  );
};

export default CollectionMenu;
