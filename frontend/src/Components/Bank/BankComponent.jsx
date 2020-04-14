import React, { Component } from 'react';
import {
  Container, Input, Form, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import Menu from '../Menu/MenuContainer';
import Footer from '../Footer/FooterComponent';

class BankComponent extends Component {
  constructor(props) {
    super(props);
    const { account } = this.props;
    this.state = {
      number: account.number,
      ccv: account.ccv,
      money: account.money,
      modal: false,
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      const { loadDataBank } = this.props;
      loadDataBank();
    }
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(totalPrice) {
    const {
      changeBank, account, clearCart, cash, addTransaction,
    } = this.props;
    if (totalPrice === 0) {
      this.setState({
        message: 'ваша корзина пуста',
      });
    } else
    if (totalPrice > account.money) {
      this.setState({
        message: 'недостаточно средств на счёте',
      });
    } else {
      this.setState({
        message: `оплачено : ${totalPrice}`,
      });
      account.money -= totalPrice;
      cash.money += totalPrice;
      changeBank(account.id, account);
      changeBank(cash.id, cash);
      clearCart();
      this.setState({
        money: account.money,
      });
      let str = new Date();
      /* eslint-disable */
      const reg = /\d+/g;
      str = String(str).match(reg);
      addTransaction(
        {
          from: account.number,
          to: cash.number,
          sum: totalPrice,
          time: str[2]+"-"+str[1]+"-"+str[0]+" "+str[3]+":"+str[4]+":"+str[5],
        },
      );
    }
    this.toggle();
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    const {
      isReady, totalPrice, cash, role, transactions,
    } = this.props;
    const {
      number, ccv, money, modal, message,
    } = this.state;
    return (
      <div>
        <div className="header__content">
          <Menu />
        </div>
        <Container>
          <div className="main-content">
            <div className="main-content__title">
              Банк
            </div>
            {/* eslint-disable */}
            { (role === 'admin' && cash.money > 0)
              ? (
                <div className="button__container cash_block">
                  <div className="cash">
                    $$$ CASH $$$:&#8195;
                    {cash.money.toFixed(3)}
                  </div>
                </div>
              ) : (role === 'admin')
                ? (
                  <div className="button__container cash_block">
                    <div className="cash__null">
                      CASH:&#8195;
                      {cash.money}
                    </div>
                  </div>
                ) : ''}
            <div className="main-content__userData">
              {!isReady
                ? ('загрузка')
                : (
                  <Form>
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'номер карты',
                      }}
                      name="number"
                      actionPosition="left"
                      placeholder="number"
                      value={number}
                      onChange={this.handleChange}
                      disabled="disabled"
                    />
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'ccv',
                      }}
                      name="ccv"
                      actionPosition="left"
                      placeholder="ccv"
                      value={ccv}
                      onChange={this.handleChange}
                      disabled="disabled"
                    />
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'деньги',
                      }}
                      name="money"
                      actionPosition="left"
                      placeholder="money"
                      value={money.toFixed(3)}
                      onChange={this.handleChange}
                      disabled
                    />
                  </Form>
                )}
            </div>
            <div className="button__container">
              <Button className="bank__button" color="black" onClick={() => this.handleClick(totalPrice)}>
                Оплатить товары
              </Button>
            </div>
          </div>
        </Container>
        {(!transactions.length || role !== 'admin')
          ? ''
          : (
            <Container>
              <div className="main-content__transactions">
                <div className="main-content__title">
                  Транзакции
                </div>
                <div className="button__container">
                  <table>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Sum</th>
                      <th>Time</th>
                    </tr>
                    {
                        transactions.map((transaction) => (
                          <tr>
                            <td>{transaction.from}</td>
                            <td>{transaction.to}</td>
                            <td>{transaction.sum}</td>
                            <td>{transaction.time}</td>
                          </tr>
                        ))
                      }
                  </table>
                </div>
              </div>
            </Container>
          )}
        <Footer />
        <Modal
          isOpen={modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Банк</ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
/* eslint-disable */
BankComponent.propTypes = {
  role: PropTypes.string.isRequired,
  clearCart: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  items: PropTypes.shape.isRequired,
  cash: PropTypes.shape.isRequired,
  transactions: PropTypes.shape.isRequired,
  account: PropTypes.shape.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  loadDataBank: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  ccv: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  money: PropTypes.number.isRequired,
  changeBank: PropTypes.func.isRequired,
};

export default BankComponent;
