import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import {
  Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import axios from '../../../../axiosInstance';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    const { calorie } = this.props;
    this.state = {
      id: calorie.id,
      name: calorie.name,
      calorie: calorie.calorie,
      protein: calorie.protein,
      fat: calorie.fat,
      carbohydrates: calorie.carbohydrates,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handlerRemoveCalorie = this.handlerRemoveCalorie.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    const { calorie } = this.props;
    this.setState({
      id: calorie.id,
      name: calorie.name,
      calorie: calorie.calorie,
      protein: calorie.protein,
      fat: calorie.fat,
      carbohydrates: calorie.carbohydrates,
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

  handlerRemoveCalorie() {
    const {
      removeCalorie, id, setPageCount, calories, currentPage, setCurrentPage,
    } = this.props;
    removeCalorie(id);
    const url = `http://127.0.0.1/cookbookphp/api/ingredient/delete.php?id=${id}`;
    /* eslint-disable */
    axios.delete(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const indexOfLastProduct = currentPage * 8;
    const indexOfFirstProduct = indexOfLastProduct - 8;
    if (
      calories.slice(indexOfFirstProduct, indexOfLastProduct).length === 1
      && calories.length > 0
    ) {
      setCurrentPage(currentPage - 1);
    }
    setPageCount(calories.length);
  }

  render() {
    const {
      modal,
      id,
      name,
      calorie,
      protein,
      fat,
      carbohydrates,
    } = this.state;
    const { className } = this.props;
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
              onClick={() => this.handlerRemoveCalorie()}
            />
          </Button.Group>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>EDIT INGRIDIENT</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name, calorie, protein, fat, carbohydrates,
              }}
              validate={(values) => {
                const errors = {};
                if (values.name === '') {
                  errors.name = 'Name is required';
                } else if (values.name.length < 3) {
                  errors.name = 'Name must be 3 characters at minimum';
                }
                if (values.calorie === '') {
                  errors.calorie = 'Calorie are required';
                } else if (!parseFloat(values.calorie)) {
                  errors.calorie = 'Calorie must be a number';
                }
                if (values.protein === '') {
                  errors.protein = 'Protein is required';
                } else if (!parseFloat(values.protein)) {
                  errors.protein = 'Protein must be a number';
                }
                if (values.fat === '') {
                  errors.fat = 'Fat is required';
                } else if (!parseFloat(values.fat)) {
                  errors.fat = 'Fat must be a number';
                }
                if (values.carbohydrates === '') {
                  errors.carbohydrates = 'Carbohydrates are required';
                } else if (!parseFloat(values.carbohydrates)) {
                  errors.carbohydrates = 'Carbohydrates must be a number';
                }
                return errors;
              }}
              onSubmit={(values) => {
                const { changeCalorie } = this.props;
                const newCalorie = {
                  id,
                  name: values.name,
                  calorie: parseFloat(values.calorie),
                  protein: parseFloat(values.protein),
                  fat: parseFloat(values.fat),
                  carbohydrates: parseFloat(values.carbohydrates),
                };
                changeCalorie(id, newCalorie);
                const ingredients = { ingredients: newCalorie };
                const objJSON = JSON.stringify(ingredients);
                /* eslint-disable */
                console.log(objJSON);
                axios.put('http://127.0.0.1/cookbookphp/api/ingredient/update.php', objJSON)
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
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
                      name="calorie"
                      placeholder="Calorie"
                      className={`form-control ${
                        touched.calorie && errors.calorie ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="calorie"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="protein"
                      placeholder="Protein"
                      className={`form-control ${
                        touched.protein && errors.protein ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="protein"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="fat"
                      placeholder="Fat"
                      className={`form-control ${
                        touched.fat && errors.fat ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="fat"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="carbohydrates"
                      placeholder="Carbohydrates"
                      className={`form-control ${
                        touched.carbohydrates && errors.carbohydrates ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="carbohydrates"
                      className="invalid-feedback"
                    />
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
  calories: PropTypes.shape.isRequired,
  className: PropTypes.string.isRequired,
  removeCalorie: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  calorie: PropTypes.shape.isRequired,
  setPageCount: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  changeCalorie: PropTypes.shape.isRequired,
};

export default ModalComponent;
