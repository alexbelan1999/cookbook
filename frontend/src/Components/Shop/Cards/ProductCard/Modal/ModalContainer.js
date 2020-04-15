import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import orderBy from 'lodash/orderBy';
import * as productsActions from '../../../../../storage/actions/products';
import ModalComponent from './ModalComponent';

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

const filterProducts = (products, searchQuery) => products.filter(
  (o) => o.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
  || o.description.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
);

const searchProducts = (
  products, filterBy, searchQuery, id,
) => sortBy(filterProducts(products, searchQuery), filterBy, id);

const mapStateToProps = ({ products, filter, authorization }) => ({
  isReady: products.isReady,
  pageCount: products.pageCount,
  currentPage: products.currentPage,
  products:
    products.items
    && searchProducts(products.items, filter.filterBy, filter.searchQuery, authorization.id),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(productsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
