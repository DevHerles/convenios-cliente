import React, { Intl } from "react";
import { Card, CardBody, Badge, CustomInput } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";

import { Colxx } from "../common/CustomBootstrap";

const AgreementListItem = ({ item, handleCheckChange,isSelected }) => {
  const DATE_OPTIONS = {year: 'numeric', month: 'short', day: 'numeric' };
  const vigenciaInicio = (new Date(item.vigenciaInicio)).toLocaleDateString('es-PE', DATE_OPTIONS)
  const vigenciaFin = (new Date(item.vigenciaFin)).toLocaleDateString('es-PE', DATE_OPTIONS)
  const fechaSuscripcion = (new Date(item.fechaSuscripcion)).toLocaleDateString('es-PE', DATE_OPTIONS)

  return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to={`${item.id}`}
              id={`toggler${item.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <i
                className={`${
                  item.status === "COMPLETED"
                    ? "simple-icon-check heading-icon"
                    : "simple-icon-refresh heading-icon"
                }`}
              />
              <span className="align-middle d-inline-block">{item.numero}</span>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {vigenciaInicio}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {vigenciaFin}
            </p>
            <div className="w-15 w-xs-100">
              <Badge color={item.labelColor} pill>
                {fechaSuscripcion}
              </Badge>
            </div>
          </CardBody>
        </div>
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <p className="mb-0">{item.tema}</p>
            <p className="mb-0">{item.entidades}</p>
          </CardBody>
        </div>
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.responsableMinsa}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.monto}
            </p>
            <div className="w-15 w-xs-100">
              <Badge color={item.labelColor} pill>
                {item.montoTransferencia}
              </Badge>
            </div>
          </CardBody>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(AgreementListItem);
