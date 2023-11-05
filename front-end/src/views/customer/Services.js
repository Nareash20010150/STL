import React from 'react'
import { Modal, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/services.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Alert } from 'react-bootstrap';
import { useEffect } from "react";
import axios from "axios";
import userService from "../../services/userService.js";

function Services() {
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [myservicesData, setMyservicesData] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const [serviceToEnable, setServiceToEnable] = useState(null);
  const [serviceToDisable, setServiceToDisable] = useState(null);

  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [myServicesCount, setMyServicesCount]= useState(0);

  const handleClose = () => setShowEditModal(false);

  const handleShow = (rowData) => {
    setSelectedRow(rowData);
    setShowEditModal(true); // Show the modal
  };

  const userToken = userService.getUser();
  const userId = userToken.id;

  useEffect(() => {
    axios.get(`http://localhost:6002/api/service/viewMyServices/${userId}`).then((res) => {
        console.log(res.data);
        setMyservicesData(res.data);
        const numberOfRows = res.data.length;
        setMyServicesCount(numberOfRows);
    });
  }, []);

  const handleEnableService = () => {
    if (serviceToEnable) {
      axios
        .put(`http://localhost:6002/api/service/enable/${userId}/${serviceToEnable}`)
        .then((response) => {
          setServiceToEnable(null);
          window.location.reload();
          // setShowEnableModal(false);
        })
        .catch((error) => {
          console.error('Error enabling service:', error);
        });
        setShowEnableModal(false);
    }
  };

  const handleDisableService = () => {
    if (serviceToDisable) {
      axios
        .put(`http://localhost:6002/api/service/disable/${userId}/${serviceToDisable}`)
        .then((response) => {
          setServiceToDisable(null);
          window.location.reload();
          // setShowDisableModal(false);
        })
        .catch((error) => {
          console.error('Error disabling service:', error);
        });
        setShowDisableModal(false);
    }
  };

  return (
    <div>
      <div className='ms-lg-2 me-lg-2'>
      <div className="my-serivice-head-container">
        <Row>
          <Col className="my-serivice-head-container-col-1">
            <span
              className="my-serivice-head-container-col-1-span ms-2"
              style={{ fontWeight: "600" }}
            >
              My Services
            </span>
            <span
              className="my-serivice-head-container-col-1-no"
              style={{
                backgroundColor: "none",
                border: "2px solid black",
                color: "black",
                borderRadius: "10px",
              }}
            >
              {myServicesCount}
            </span>
          </Col>
        </Row>
      </div>
    </div>

      {/* Table*/}
      <div className="mt-4 d-flex flex-column w-100" style={{ width: '100%' }}>
        <Container className="table-responsive">
          <Table striped bordered hover size="sm" className="custom-table">
            <thead className="text-center">
              <tr>
                <th>Service Name</th>
                <th>Service Category</th>
                <th>Technology</th>
                <th>Status</th>
                <th>Charge (Rs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the displayed training sessions and render each row */}
              {myservicesData.map((service) => (
                <tr key={service.id}>
                  <td className="text-center">{service.name}</td>
                  <td className="text-center">{service.categeroy}</td>
                  <td className="text-center">{service.technology}</td>
                  <td className="text-center">{service.status}</td>
                  <td className="text-center">{service.charge}</td>
                  <td className="text-center">
                    {service.status === "Active" ? (
                      <>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setServiceToDisable(service.id);
                              setShowDisableModal(true);
                            }}
                          >disable</Button>
                      </>
                      ) : (
                      <>
                          <Button     
                            variant="success"                       
                            onClick={() => {
                              setServiceToEnable(service.id);
                              setShowEnableModal(true);
                            }}
                          >enable</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      {/* Modal for enabling a service */}
      <Modal show={showEnableModal} onHide={() => setShowEnableModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Enable Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to enable this service?</Modal.Body>
        <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={() => setShowEnableModal(false)}>
            Cancel
          </Button>
          <Button className="btn-ServiceProvider-1" onClick={handleEnableService}>
            Enable
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for disabling a service */}
      <Modal show={showDisableModal} onHide={() => setShowDisableModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Disable Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to disable this service?</Modal.Body>
        <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={() => setShowDisableModal(false)}>
            Cancel
          </Button>
          <Button className="btn-ServiceProvider-1" onClick={handleDisableService}>
            Disable
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


export default Services;