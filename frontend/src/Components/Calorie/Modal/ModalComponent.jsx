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
import axios from '../../../axiosInstance';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.floor(Math.random() * (1000 - 20)) + 1000,
      name: '',
      calorie: '',
      protein: '',
      fat: '',
      carbohydrates: 'dddd',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      id: Math.floor(Math.random() * (1000 - 20)) + 1000,
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
      name,
      calorie,
      protein,
      fat,
      carbohydrates,
    } = this.state;
    const { className } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col text-center modal__button">
              <Button circular basic onClick={this.toggle} size="lg" inverted>
                ADD INGRIDIENT
              </Button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>ADD INGRIDIENT</ModalHeader>
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
                const { addCalorie } = this.props;
                const newCalorie = {
                  id,
                  name: values.name,
                  calorie: parseFloat(values.calorie),
                  protein: parseFloat(values.protein),
                  fat: parseFloat(values.fat),
                  carbohydrates: parseFloat(values.carbohydrates),
                };
                addCalorie(newCalorie);
                const ingredients = { ingredients: newCalorie };
                const objJSON = JSON.stringify(ingredients);
                /* eslint-disable */
                console.log(objJSON);
                axios.post('http://127.0.0.1/cookbookphp/api/ingredient/create.php', objJSON)
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
                    ADD
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
  addCalorie: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default ModalComponent;
