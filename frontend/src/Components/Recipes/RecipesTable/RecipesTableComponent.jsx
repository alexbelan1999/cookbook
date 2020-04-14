import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from 'semantic-ui-react';
import Modal from '../Modal/ModalContainer';
import ModalEdit from './Modal/ModalContainer';


class RecipesTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesPerPage: 3,
    };
  }

  componentDidMount() {
    const { isLoaded, isLoadedProducts } = this.props;
    const { loadDataRecipes, loadData } = this.props;
    if (!isLoaded) {
      loadDataRecipes();
    }
    if (!isLoadedProducts) {
      loadData();
    }
  }

  handleClick = (event) => {
    this.updatePageCount(event.target.id);
    document.documentElement.scrollTop = 0;
  };

  updatePageCount = (page) => {
    const { recipesPerPage } = this.state;
    const {
      recipes, setPageCountRec, setCurrentPageRec,
    } = this.props;
    const indexOfLastProduct = page * recipesPerPage;
    const indexOfFirstProduct = indexOfLastProduct - recipesPerPage;
    setPageCountRec(recipes.slice(indexOfFirstProduct, indexOfLastProduct).length);
    setCurrentPageRec(Number(page));
  }
/* eslint-disable */
  handlerAddToCart = (ingridients) => {
    const { products, addToCart } = this.props;
    ingridients.map(function(o) {
      for (let i = 0; i < o.count/100; i++) {
        addToCart(products[o.id]);
      }
    });
  };

  handleClickPrev = () => {
    let { currentPage } = this.props;
    if (currentPage - 1 > 0) {
      currentPage -= 1;
    }
    this.updatePageCount(currentPage);
    document.documentElement.scrollTop = 0;
  };

  handleClickNext = () => {
    const { recipes } = this.props;
    const { recipesPerPage } = this.state;
    let { currentPage } = this.props;
    if (currentPage + 1 <= Math.ceil(recipes.length / recipesPerPage)) {
      currentPage += 1;
    }
    this.updatePageCount(currentPage);
    document.documentElement.scrollTop = 0;
  };

  render() {
    const {
      recipes, isReady, removeRecipe, currentPage, role, products, isReadyProducts,
    } = this.props;
    const { recipesPerPage } = this.state;
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const pageNumbers = [];
    if (isReady) {
      for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i += 1) {
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
                    recipes={recipes}
                  />
                )}
              <table>
                <tr>
                  <th>Название</th>
                  <th>Ингридиенты</th>
                  <th>Каллории</th>
                  <th>Рецепт</th>
                  {role !== 'admin'
                    ? ''
                    : (
                      <th>Изменить</th>
                    )}
                </tr>
                {(!isReady || !isReadyProducts)
                  ? 'загрузка'
                  : recipes.slice(indexOfFirstRecipe, indexOfLastRecipe).map((recipe) => (
                    <tr>
                      <td>{recipe.name}</td>
                      <td>
                        {recipe.ingridients.map((o) => (
                          <p>
                            {products.filter((p) => p.id === Number.parseInt(o.id))[0].title}
                            :
                            {o.count}
                          </p>
                        ))}
                        {role !== null
                          ? (
                            <Button circular color='white' icon='cart' onClick={() => this.handlerAddToCart(recipe.ingridients)}/>
                          )
                          : ''}
                      </td>
                      <td>{recipe.calorie}</td>
                      <td className="recipe">{recipe.recipe}</td>
                      {role !== 'admin'
                        ? ''
                        : (
                          <td className="table__button">
                            {role !== 'admin'
                              ? ''
                              : (
                                <ModalEdit
                                  recipe={recipe}
                                  id={recipe.id}
                                  products={products}
                                  recipes={recipes}
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

RecipesTableComponent.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ingridients: PropTypes.string.isRequired,
      calorie: PropTypes.string.isRequired,
      recipe: PropTypes.string.isRequired,
    }),
  ).isRequired,
  role: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  products: PropTypes.shape.isRequired,
  isReady: PropTypes.bool.isRequired,
  isReadyProducts: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isLoadedProducts: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
  loadDataRecipes: PropTypes.func.isRequired,
  removeRecipe: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPageCountRec: PropTypes.func.isRequired,
  setCurrentPageRec: PropTypes.func.isRequired,
};

export default RecipesTableComponent;
