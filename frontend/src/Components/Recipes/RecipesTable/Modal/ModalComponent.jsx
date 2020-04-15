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
    const { recipe } = this.props;
    this.state = {
      id: recipe.id,
      name: recipe.name,
      recipe: recipe.recipe,
      ingridients: recipe.ingridients,
      newIngredient: '',
      count: 0,
      calorie: recipe.calorie,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handlerRemoveRecipe = this.handlerRemoveRecipe.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
  }

  handleAddTag(tag, count) {
    const { products } = this.props;
    const { ingridients } = this.state;
    const newTags = ingridients.slice();
    newTags.push({
      id: products.filter((p) => p.title === tag)[0].id,
      count,
    });
    this.setState({
      ingridients: newTags,
    });
  }

  handleRemoveTag(id) {
    const { ingridients } = this.state;
    const newTags = ingridients.slice();
    newTags.splice(id, 1);
    this.setState({
      ingridients: newTags,
    });
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      ingridients: [],
    }));
    const { recipe } = this.props;
    this.setState({
      id: recipe.id,
      name: recipe.name,
      recipe: recipe.recipe,
      ingridients: recipe.ingridients,
      newIngredient: '',
      count: 0,
      calorie: recipe.calorie,
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

  handlerRemoveRecipe() {
    const {
      removeRecipe, id, setPageCountRec, recipes, currentPage, setCurrentPageRec,
    } = this.props;
    removeRecipe(id);
    const indexOfLastProduct = currentPage * 3;
    const indexOfFirstProduct = indexOfLastProduct - 3;
    if (
      recipes.slice(indexOfFirstProduct, indexOfLastProduct).length === 1
      && recipes.length > 0
    ) {
      setCurrentPageRec(currentPage - 1);
    }
    setPageCountRec(recipes.length);
  }

  render() {
    const {
      modal,
      id,
      name,
      recipe,
      ingridients,
      newIngredient,
      count,
      calorie,
    } = this.state;
    const { className, products } = this.props;
    // const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (
      <div>
        <div className="recipe__buttons">
          <Button.Group>
            <Button
              icon="pencil alternate"
              floated="right"
              color="white"
              size="small"
              onClick={this.toggle}
            />
            <Button
              icon="delete"
              floated="right"
              color="white"
              size="small"
              onClick={() => this.handlerRemoveRecipe()}
            />
          </Button.Group>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>EDIT RECIPE</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name, recipe,
              }}
              validate={(values) => {
                const errors = {};
                if (values.name === '') {
                  errors.name = 'Name is required';
                } else if (values.name.length < 3) {
                  errors.name = 'Title must be 3 characters at minimum';
                }
                if (values.recipe === '') {
                  errors.recipe = 'Recipe is required';
                } else if (values.recipe.length < 5) {
                  errors.recipe = 'Recipe must be 5 characters at minimum';
                }
                return errors;
              }}
              onSubmit={(values) => {
                const { changeRecipe } = this.props;
                const newRecipe = {
                  id,
                  name: values.name,
                  recipe: values.recipe,
                  ingridients,
                  calorie,
                };
                changeRecipe(id, newRecipe);
                this.toggle();
              }}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      name="name"
                      placeholder="Name"
                      className={`form-control ${
                        touched.name && errors.name ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="recipe"
                      placeholder="recipe"
                      className={`form-control ${
                        touched.recipe && errors.recipe ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="recipe"
                      className="invalid-feedback"
                    />
                  </div>

                  <select className="product__select" name="newIngredient" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>-</option>
                    {products.map((product) => (
                      <option className="product__option">
                        {product.title}
                      </option>
                    ))}
                  </select>
                  <Input
                    className="button__addTag modal__input"
                    type="text"
                    name="count"
                    placeholder="количество"
                    onChange={this.handleChange}
                    defaultValue={0}
                  />
                  {/* eslint-disable */}
                  <Button type="button" onClick={() => { (newIngredient && count) ? this.handleAddTag(newIngredient, count) : '' }}>
                    ADD
                  </Button>
                  <div className="product__tags">
                    {ingridients.map((ingridient, i) => (
                      <span className="product__tag">
                        #
                        {products.filter((p) => p.id === ingridient.id)[0].title}
                        {ingridient.count}
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
  recipes: PropTypes.shape.isRequired,
  className: PropTypes.string.isRequired,
  removeRecipe: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  recipe: PropTypes.shape.isRequired,
  setPageCountRec: PropTypes.func.isRequired,
  setCurrentPageRec: PropTypes.func.isRequired,
  products: PropTypes.shape.isRequired,
  changeRecipe: PropTypes.shape.isRequired,
};

export default ModalComponent;
