import React, { Component } from "react";
import { connect } from "react-redux";
import { NavItem, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

import IntlMessages from "../../helpers/IntlMessages";
import ApplicationMenu from "../../components/common/ApplicationMenu";
import { getAgreementListWithFilter } from "../../redux/actions";
class AgreementApplicationMenu extends Component {
  constructor(props) {
    super();
  }

  addFilter = (column, value) => {
    this.props.getAgreementListWithFilter(column, value);
  };

  render() {
    const {
      filter,
      allAgreementItems,
      loading,
      labels,
      categories
    } = this.props.agreementApp;

    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              <IntlMessages id="agreement.status" />
            </p>
            <ul className="list-unstyled mb-5">
              <NavItem className={classnames({ active: !filter })}>
                <NavLink to="#" onClick={e => this.addFilter("", "")}>
                  <i className="simple-icon-reload" />
                  <IntlMessages id="agreement.all-agreements" />
                  <span className="float-right">
                    {loading && allAgreementItems.length}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "PENDING"
                })}
              >
                <NavLink
                  to="#"
                  onClick={e => this.addFilter("status", "PENDING")}
                >
                  <i className="simple-icon-refresh" />
                  <IntlMessages id="agreement.pending-agreements" />
                  <span className="float-right">
                    {loading &&
                      allAgreementItems.filter(x => x.status === "PENDING").length}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "COMPLETED"
                })}
              >
                <NavLink
                  to="#"
                  onClick={e => this.addFilter("status", "COMPLETED")}
                >
                  <i className="simple-icon-check" />
                  <IntlMessages id="agreement.attended-agreements" />
                  <span className="float-right">
                    {loading &&
                      allAgreementItems.filter(x => x.status === "COMPLETED").length}
                  </span>
                </NavLink>
              </NavItem>
            </ul>
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}

const mapStateToProps = ({ agreementApp }) => {
  return {
    agreementApp
  };
};
export default connect(
  mapStateToProps,
  {
    getAgreementListWithFilter
  }
)(AgreementApplicationMenu);