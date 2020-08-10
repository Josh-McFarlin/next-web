import React from "react";
import PropTypes from "prop-types";
import { withDocument } from "part:@sanity/form-builder";
import FormField from "part:@sanity/components/formfields/default";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";
import { getAllCollections } from "../../utils/shopify/actions/collection";
import classes from "./ShopHandleSelector.module.css";

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(value));

class ShopHandleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    getAllCollections().then((collections) => {
      this.setState({
        collections,
        isLoading: false,
      });
    });
  }

  handleCollectionChange = (collectionHandle) => {
    const { onChange } = this.props;

    if (collectionHandle != null) {
      onChange(createPatchFrom(collectionHandle));
    }
  };

  render() {
    const { type, value } = this.props;
    const { isLoading, collections } = this.state;

    return (
      <FormField label={type.title} description={type.description}>
        <div
          className={classes.root}
          data-no-value={!isLoading && value == null}
        >
          {isLoading && <h1>Loading...</h1>}
          {collections.map((collection) => (
            <button
              key={collection.handle}
              className={classes.collection}
              onClick={() => this.handleCollectionChange(collection.handle)}
            >
              <input
                className={classes.radio}
                type="radio"
                readOnly
                checked={value != null && value === collection.handle}
              />
              {collection.image != null ? (
                <img
                  className={classes.image}
                  src={collection.image}
                  alt={collection.title}
                />
              ) : (
                <div className={classes.image} />
              )}
              <p>{collection.title}</p>
            </button>
          ))}
        </div>
      </FormField>
    );
  }
}

ShopHandleSelector.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default withDocument(ShopHandleSelector);
