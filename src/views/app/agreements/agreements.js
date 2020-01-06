import React, { Component, Fragment } from "react";
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown,
  CustomInput,
  UncontrolledAlert,
  CardBody,
  Card,
  Table,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import {
  getAgreementList,
  getAgreementListWithOrder,
  getAgreementListSearch,
  searchAgreements,
  selectedAgreementItemsChange
} from "../../../redux/actions";
import AgreementListItem from "../../../components/agreements/AgreementListItem";
import AddNewAgreementModal from "../../../containers/agreements/AddNewAgreementModal";
import AgreementApplicationMenu from "../../../containers/agreements/AgreementApplicationMenu";

class AgreementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSplitOpen: false,
      modalOpen: false,
      lastChecked: null,

      displayOptionsIsOpen: false
    };
  }

  componentDidMount() {
    this.props.getAgreementList();
  }

  toggleDisplayOptions = () => {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  };

  changeOrderBy = column => {
    this.props.getAgreementListWithOrder(column);
  };

  handleKeyPress = e => {
    let keyword = "id";

    if (e.key === "Enter") {
      if(e.target.value === "") {
        this.props.getAgreementList();
      } else {
        if (this.props.agreementApp.searchBy !== "") {
          keyword = this.props.agreementApp.searchBy;
        }
        this.props.searchAgreements({keyword, value: e.target.value});
      }
    }
  };

  handleCheckChange = (event, id) => {
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = Object.assign([], this.props.agreementApp.selectedItems);
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.props.selectedAgreementItemsChange(selectedItems);

    if (event.shiftKey) {
      var items = this.props.agreementApp.agreementItems;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item._id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.props.selectedAgreementItemsChange(selectedItems);
    }
    return;
  };

  handleChangeSelectAll = () => {
    if (this.props.agreementApp.loading) {
      if (
        this.props.agreementApp.selectedItems.length >=
        this.props.agreementApp.agreementItems.length
      ) {
        this.props.selectedAgreementItemsChange([]);
      } else {
        this.props.selectedAgreementItemsChange(
          this.props.agreementApp.agreementItems.map(x => x._id)
        );
      }
    }
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  render() {
    const {
      searchKeyword,
      loading,
      orderColumn,
      orderColumns,
      selectedItems,
      error
    } = this.props.agreementApp;

    const agreementItems = this.props.agreementApp;
    const allAgreementItems = this.props.agreementApp.allAgreementItems;

    const { messages } = this.props.intl;

    const { modalOpen } = this.state;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.agreements" />
              </h1>
              {loading && (
                <div className="float-sm-right">
                  <Button
                    color="primary"
                    size="lg"
                    className="top-right-button"
                    onClick={this.toggleModal}
                  >
                    <IntlMessages id="agreement.add-new" />
                  </Button>
                </div>
              )}
              <Breadcrumb match={this.props.match} />
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                id="displayOptions"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={this.toggleDisplayOptions}
              >
                <IntlMessages id="agreement.display-options" />{" "}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>
              <Collapse
                className="d-md-block"
                isOpen={this.state.displayOptionsIsOpen}
              >
                <div className="d-block mb-2 d-md-inline-block">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="agreement.orderby" />
                      {orderColumn ? orderColumn.label : ""}
                    </DropdownToggle>
                    <DropdownMenu>
                      {orderColumns.map((o, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changeOrderBy(o.column)}
                          >
                            {o.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder={messages["menu.search"]}
                      defaultValue={searchKeyword}
                      onKeyPress={e => this.handleKeyPress(e)}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />

            <Row>
              {error ? (
                <UncontrolledAlert color="danger">
                  {error}
                </UncontrolledAlert>
              ) : ("")}
              {loading ? (
                <Card className="mb-12">
                <CardBody>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Número</th>
                        <th>Tema</th>
                        <th>Responsable</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de finalización</th>
                        <th>Fecha de suscripción</th>
                        <th>Monto</th>
                        <th>Monto de trasferencia</th>
                      </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                          allAgreementItems.map((item, index) => (
                            <tr>
                              <td>{item.numero}</td>
                              <td>{item.tema}</td>
                              <td>{item.responsableMinsa}</td>
                              <td>{item.vigenciaInicio}</td>
                              <td>{item.vigenciaFin}</td>
                              <td>{item.fechaSuscripcion}</td>
                              <td>{item.monto}</td>
                              <td>{item.montoTransferencia}</td>
                            </tr>
                          ))
                        ) : (
                          <div className="loading" />
                        )}
                    </tbody> 
                  </Table>
                </CardBody>
              </Card>
              ) : (
                <div className="loading" />
              )}
            </Row>
          </Colxx>
        </Row>
        {loading && <AgreementApplicationMenu />}
        <AddNewAgreementModal toggleModal={this.toggleModal} modalOpen={modalOpen} modalSize="lg"/>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ agreementApp }) => {
  return {
    agreementApp
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    {
      getAgreementList,
      getAgreementListWithOrder,
      getAgreementListSearch,
      searchAgreements,
      selectedAgreementItemsChange
    }
  )(AgreementList)
);