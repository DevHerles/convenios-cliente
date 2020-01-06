import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  FormText,
} from "reactstrap";

import {
  FormikDatePicker
} from "./FormikFields";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

import { addAgreementItem } from "../../redux/actions";

const AgreementSchema = Yup.object().shape({
  numero: Yup.string()
    .required("El número de convenio es requerido."),
  tema: Yup.string().required("El tema de convenio es requerido."),
  vigenciaInicio: Yup.date()
    .nullable()
    .required("El inicio de vigencia es requerido."),
  vigenciaFin: Yup.date()
    .nullable()
    .required("El fin de vigencia es requerido."),
  fechaSuscripcion: Yup.date()
    .nullable()
    .required("La fecha de suscripción es requerido."),
  entidades: Yup.string()
    .required("Las entidades son requeridos."),
  responsableMinsa: Yup.string()
    .required("El responsable MINSA es requerido."),
  monto: Yup.number()
    .required("El monto es requerido."),
  montoTransferencia: Yup.number()
    .required("El monto de transferencia es requerido."),
});

class AddNewAgreementModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values) => {
    const payload = {
      ...values
    };
    console.log(JSON.stringify(payload, null, 2));

    this.props.addAgreementItem(payload);
    this.props.toggleModal();
  }

  render() {
    const { labels, categories } = this.props.agreementApp;
    const { modalOpen, toggleModal, modalSize } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        size={modalSize}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <Formik
          initialValues={{
            numero: "",
            tema: "",
            vigenciaInicio: "",
            vigenciaFin: "",
            fechaSuscripcion: "",
            entidades: "",
            responsableMinsa: "",
            monto: "",
            montoTransferencia: "",
          }}
          validationSchema={AgreementSchema}
          onSubmit={this.handleSubmit}
        >
          {({
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting
          }) => (
            <Form className="av-tooltip tooltip-label-bottom">
              <ModalHeader toggle={toggleModal}>
                <IntlMessages id="agreement.add-new-title" />
              </ModalHeader>
              <ModalBody>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.number" />
                  </Label>
                  <Field className="form-control" name="numero" />
                  {errors.numero && touched.numero ? (
                    <div className="invalid-feedback d-block">
                      {errors.numero}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.subject" />
                  </Label>
                  <Field className="form-control" name="tema" />
                  {errors.tema && touched.tema ? (
                    <div className="invalid-feedback d-block">
                      {errors.tema}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.validity-start" />
                  </Label>
                  <FormikDatePicker
                    className="form-control"
                    name="vigenciaInicio"
                    value={values.vigenciaInicio}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.vigenciaInicio && touched.vigenciaInicio ? (
                    <div className="invalid-feedback d-block">
                      {errors.vigenciaInicio}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.validity-end" />
                  </Label>
                  <FormikDatePicker
                    className="form-control"
                    name="vigenciaFin"
                    value={values.vigenciaFin}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.vigenciaFin && touched.vigenciaFin ? (
                    <div className="invalid-feedback d-block">
                      {errors.vigenciaFin}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.subscription-date" />
                  </Label>
                  <FormikDatePicker
                    className="form-control"
                    name="fechaSuscripcion"
                    value={values.fechaSuscripcion}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.fechaSuscripcion && touched.fechaSuscripcion ? (
                    <div className="invalid-feedback d-block">
                      {errors.fechaSuscripcion}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.entities" />
                  </Label>
                  <Field className="form-control" name="entidades" />
                  {errors.entidades && touched.entidades ? (
                    <div className="invalid-feedback d-block">
                      {errors.entidades}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.minsa-accountable" />
                  </Label>
                  <Field className="form-control" name="responsableMinsa" />
                  {errors.responsableMinsa && touched.responsableMinsa ? (
                    <div className="invalid-feedback d-block">
                      {errors.responsableMinsa}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.amount" />
                  </Label>
                  <Field className="form-control" name="monto" />
                  {errors.monto && touched.monto ? (
                    <div className="invalid-feedback d-block">
                      {errors.monto}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="agreement.transfer-amount" />
                  </Label>
                  <Field className="form-control" name="montoTransferencia" />
                  {errors.montoTransferencia && touched.montoTransferencia ? (
                    <div className="invalid-feedback d-block">
                      {errors.montoTransferencia}
                    </div>
                  ) : null}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" outline onClick={toggleModal}>
                  <IntlMessages id="agreement.cancel" />
                </Button>
                <Button color="primary" type="submit">
                  <IntlMessages id="agreement.submit" />
                </Button>{" "}
              </ModalFooter>
            </Form>
          )}
          </Formik>
      </Modal>
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
    addAgreementItem
  }
)(AddNewAgreementModal);
