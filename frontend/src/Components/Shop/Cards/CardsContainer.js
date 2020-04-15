import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import orderBy from 'lodash/orderBy';
import * as productsActions from '../../../storage/actions/products';
import * as authorizationActions from '../../../storage/actions/authorization';
import CardsComponent from './CardsComponent';


const markedProducts = (products, id) => products.filter(
  (o) => o.mark.map((e) => e.id).indexOf(id) !== -1,
);

const sortBy = (products, filterBy, id) => {
  switch (filterBy) {
    case 'price_high':
      return orderBy(products, 'price', 'desc');
    case 'price_low':
      return orderBy(products, 'price', 'asc');
    case 'marked':
      return markedProducts(products, id);
    default:
      return products;
  }
};

const filterProducts = (products, searchQuery) => {
  if (searchQuery) {
    const newProducts = [];
    products.forEach((product) => {
      let f = false;
      product.tags.forEach((tag) => {
        if (tag.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) {
          f = true;
        }
      });
      if (f) {
        newProducts.push(product);
      }
    });
    return newProducts;
  }
  return products;
};

const searchProducts = (
  products, filterBy, searchQuery, id,
) => sortBy(filterProducts(products, searchQuery), filterBy, id);

const mapStateToProps = ({ products, filter, authorization }) => ({
  products:
    products.items
    && searchProducts(products.items, filter.filterBy, filter.searchQuery, authorization.id),
  isReady: products.isReady,
  isLoaded: products.isLoaded,
  role: authorization.role,
  pageCount: products.pageCount,
  currentPage: products.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(productsActions, dispatch),
  ...bindActionCreators(authorizationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsComponent);
