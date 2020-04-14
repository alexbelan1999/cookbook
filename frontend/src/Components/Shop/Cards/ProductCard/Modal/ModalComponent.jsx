import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import {
  Button, Input, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: parseFloat(product.price),
      picture: product.picture,
      mark: product.mark,
      tags: product.tags,
      modal: false,
      newTag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handlerRemoveProduct = this.handlerRemoveProduct.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
  }

  handleAddTag(tag) {
    if (tag) {
      const { tags } = this.state;
      this.setState({
        tags: [...tags, tag],
        newTag: '',
      });
    }
  }

  handleRemoveTag(index) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((o, idx) => idx !== index),
    });
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    const { product } = this.props;
    this.setState({
      id: product.id,
      title: product.title,
      description: product.description,
      price: parseFloat(product.price),
      picture: product.picture,
      mark: product.mark,
      tags: product.tags,
    });
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  handlerRemoveProduct() {
    const {
      removeProduct, id, setPageCount, products, currentPage, setCurrentPage,
    } = this.props;
    removeProduct(id);
    const indexOfLastProduct = currentPage * 9;
    const indexOfFirstProduct = indexOfLastProduct - 9;
    if (
      products.slice(indexOfFirstProduct, indexOfLastProduct).length === 1
      && products.length > 0
    ) {
      setCurrentPage(currentPage - 1);
    }
    setPageCount(products.length);
  }

  render() {
    const {
      modal,
      id,
      title,
      description,
      price,
      picture,
      mark,
      tags,
      newTag,
    } = this.state;
    const {
      className,
    } = this.props;
    // const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (
      <div>
        <div className="product__buttons">
          <Button.Group>
            <Button
              icon="pencil alternate"
              floated="right"
              color="grey"
              size="small"
              onClick={this.toggle}
              basic
            />
            <Button
              icon="delete"
              floated="right"
              color="grey"
              size="small"
              onClick={() => this.handlerRemoveProduct()}
              basic
            />
          </Button.Group>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>EDIT PRODUCT</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                title, description, price, picture,
              }}
              validate={(values) => {
                const errors = {};
                if (values.title === '') {
                  errors.title = 'Title is required';
                } else if (values.title.length < 5) {
                  errors.title = 'Title must be 5 characters at minimum';
                }
                if (values.description === '') {
                  errors.description = 'Description is required';
                } else if (values.description.length < 5) {
                  errors.description = 'Description must be 5 characters at minimum';
                }
                if (values.price === '') {
                  errors.price = 'Price is required';
                } else if (Number.isNaN(Number(values.price))) {
                  errors.price = 'Price must be a number';
                }
                if (values.picture === '') {
                  errors.picture = 'Picture is required';
                } else if (values.picture.length < 5) {
                  errors.picture = 'Picture must be 5 characters at minimum';
                }
                return errors;
              }}
              onSubmit={(values) => {
                const { changeProduct } = this.props;
                const newProduct = {
                  id,
                  title: values.title,
                  description: values.description,
                  price: parseFloat(values.price),
                  picture: values.picture,
                  mark,
                  tags,
                };
                changeProduct(id, newProduct);
                this.toggle();
              }}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      name="title"
                      placeholder="Title"
                      className={`form-control ${
                        touched.title && errors.title ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="title"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="description"
                      placeholder="Description"
                      className={`form-control ${
                        touched.description && errors.description ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="description"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="price"
                      placeholder="Price"
                      className={`form-control ${
                        touched.price && errors.price ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="price"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="picture"
                      placeholder="Picture"
                      className={`form-control ${
                        touched.picture && errors.picture ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="picture"
                      className="invalid-feedback"
                    />
                  </div>

                  <Input
                    className="button__addTag modal__input"
                    type="text"
                    name="newTag"
                    placeholder="add new tag"
                    onChange={this.handleChange}
                    value={newTag}
                  />
                  <Button type="button" onClick={() => { this.handleAddTag(newTag); }}>
                    add
                  </Button>
                  <div className="product__tags">
                    {tags.map((tag, i) => (
                      <span className="product__tag">
                        #
                        {tag}
                        {/* eslint-disable */}
                        <Icon.Group className="modal__icon" size="large" key={i} onClick={() => { this.handleRemoveTag(i); }}>
                          <Icon corner="top left" name="delete" />
                        </Icon.Group>
                        {/* eslint-enable */}
                      </span>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ModalComponent.propTypes = {
  className: PropTypes.string.isRequired,
  removeProduct: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  product: PropTypes.shape.isRequired,
  setPageCount: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  products: PropTypes.shape.isRequired,
  changeProduct: PropTypes.shape.isRequired,
};

export default ModalComponent;
