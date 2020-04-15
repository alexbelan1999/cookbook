import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/ModalContainer';
import ModalEdit from './Modal/ModalContainer';

class CalorieTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesPerPage: 8,
    };
  }

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      const { loadData } = this.props;
      loadData();
    }
  }

  handleClick = (event) => {
    this.updatePageCount(event.target.id);
    document.documentElement.scrollTop = 0;
  };

  updatePageCount = (page) => {
    const { caloriesPerPage } = this.state;
    const {
      calories, setPageCount, setCurrentPage,
    } = this.props;
    const indexOfLastProduct = page * caloriesPerPage;
    const indexOfFirstProduct = indexOfLastProduct - caloriesPerPage;
    setPageCount(calories.slice(indexOfFirstProduct, indexOfLastProduct).length);
    setCurrentPage(Number(page));
  }

  handleClickPrev = () => {
    let { currentPage } = this.props;
    if (currentPage - 1 > 0) {
      currentPage -= 1;
    }
    this.updatePageCount(currentPage);
    document.documentElement.scrollTop = 0;
  };

  handleClickNext = () => {
    const { calories } = this.props;
    const { caloriesPerPage } = this.state;
    let { currentPage } = this.props;
    if (currentPage + 1 <= Math.ceil(calories.length / caloriesPerPage)) {
      currentPage += 1;
    }
    this.updatePageCount(currentPage);
    document.documentElement.scrollTop = 0;
  };

  render() {
    const {
      calories, isReady, currentPage, role,
    } = this.props;
    const { caloriesPerPage } = this.state;
    const indexOfLastCalorie = currentPage * caloriesPerPage;
    const indexOfFirstCalorie = indexOfLastCalorie - caloriesPerPage;
    const pageNumbers = [];
    if (isReady) {
      for (let i = 1; i <= Math.ceil(calories.length / caloriesPerPage); i += 1) {
        pageNumbers.push(i);
      }
    }
    /* eslint-disable */
    const renderPageNumbers = pageNumbers.map((number) => (
      currentPage !== number
      ? <div className="page-number" key={number} id={number} onClick={this.handleClick}>
        {number}
      </div>
      : <div className="page-number number-selected" key={number} id={number} onClick={this.handleClick}>
        {number}
      </div>
    ));
    /* eslint-enable */
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="main-content__table_recipes clearfix">
              {role !== 'admin'
                ? ''
                : (
                  <Modal
                    onReceive={this.onReceiveState}
                    calories={calories}
                  />
                )}
              <table>
                <tr>
                  <th>Название</th>
                  <th>кКал</th>
                  <th>Белки</th>
                  <th>Жиры</th>
                  <th>Углеводы</th>
                  {role !== 'admin'
                    ? ''
                    : (
                      <th>Remove</th>
                    )}
                </tr>
                {!isReady
                  ? 'загрузка'
                  : calories.slice(indexOfFirstCalorie, indexOfLastCalorie).map((calorie) => (
                    <tr>
                      <td>{calorie.name}</td>
                      <td>{calorie.calorie}</td>
                      <td>{calorie.protein}</td>
                      <td>{calorie.fat}</td>
                      <td>{calorie.carbohydrates}</td>
                      {role !== 'admin'
                        ? ''
                        : (
                          <td className="table__button">
                            {role !== 'admin'
                              ? ''
                              : (
                                <ModalEdit
                                  calorie={calorie}
                                  calories={calories}
                                  id={calorie.id}
                                />
                              )}
                          </td>
                        )}
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
        {!isReady
          ? ''
          : (
            <div className="pages">
              <div className="pages__center-block clearfix">
                <div className="row">
                  <div className="col-md-1">
                    {/* eslint-disable */}
                    <div className="prev-icon" onClick={this.handleClickPrev} />
                    {/* eslint-enable */}
                  </div>
                  <div className="col-md-10">
                    <div className="page-numbers d-flex justify-content-center">
                      {renderPageNumbers}
                    </div>
                  </div>
                  <div className="col-md-1">
                    {/* eslint-disable */}
                    <div className="next-icon" onClick={this.handleClickNext} />
                    {/* eslint-enable */}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

CalorieTableComponent.propTypes = {
  calories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ingridients: PropTypes.string.isRequired,
      calorie: PropTypes.string.isRequired,
      recipe: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isReady: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPageCount: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default CalorieTableComponent;
