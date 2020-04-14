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
    this.state = {
      id: Math.floor(Math.random() * (1000 - 20)) + 1000,
      title: '',
      description: '',
      price: '',
      picture: '',
      mark: [],
      tags: [],
      modal: false,
      newTag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
  }

  handleAddTag(tag) {
    const { tags } = this.state;
    const newTags = tags;
    newTags.push(tag);
    this.setState({
      tags: newTags,
      newTag: '',
      stateUpdate: String(Math.floor(Math.random() * (200 - 20)) + 200),
    });
  }

  handleRemoveTag(id) {
    const { tags } = this.state;
    const newTags = tags;
    newTags.splice(id, 1);
    this.setState({
      tags: newTags,
      stateUpdate: String(Math.floor(Math.random() * (200 - 20)) + 200),
    });
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
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
      stateUpdate,
      newTag,
    } = this.state;
    const { className } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col text-center modal__button">
              <Button circular basic onClick={this.toggle} size="lg" inverted>
                ADD PRODUCT
              </Button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>ADD PRODUCT</ModalHeader>
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
                const { addProduct } = this.props;
                const newProduct = {
                  id,
                  title: values.title,
                  description: values.description,
                  price: parseFloat(values.price),
                  picture: values.picture,
                  mark,
                  tags,
                  update: stateUpdate,
                };
                addProduct(newProduct);
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
                  {/* eslint-disable */}
                  <Button type="button" onClick={() => { newTag ? this.handleAddTag(newTag) : '' }}>
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
  addProduct: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default ModalComponent;
