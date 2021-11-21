import React from 'react';
import { Button, Row, Col, Form, Table } from "react-bootstrap"


class CreateContestForm extends React.Component {

    handleChange = event => {
        let InscStartDate = document.getElementById('InscStartDate');
        let InscStartTime = document.getElementById('InscStartTime');
        let InscEndDate = document.getElementById('InscEndDate');
        let InscEndTime = document.getElementById('InscEndTime');
        let ContStartDate = document.getElementById('ContStartDate');
        let ContStartTime = document.getElementById('ContStartTime');
        let ContEndDate = document.getElementById('ContEndDate');
        let ContEndTime = document.getElementById('ContEndTime');
        InscEndDate.setAttribute('min', InscStartDate.value);
        InscEndTime.setAttribute('min', InscStartTime.value);
        if (InscStartTime.value > InscEndTime.value && InscEndDate.value == InscStartDate.value) {
            InscEndTime.value = null;
        }
        ContStartDate.setAttribute('min', InscEndDate.value);
        ContEndDate.setAttribute('min', ContStartDate.value);
        if (ContStartTime.value > ContEndTime.value && ContEndDate.value == ContStartDate.value)
            ContEndTime.value = null;
    }

    addVenue = () => {
        let selectedVenues = document.getElementById('selectedVenues');
        let venuesTF = document.getElementById('venuesTF');
        let venuesList = document.getElementById('venuesList');
        if(venuesList.options.namedItem(venuesTF.value)){
            selectedVenues.innerHTML += `<tr><td>${venuesTF.value}</td></tr>`;
            venuesList.options.namedItem(venuesTF.value).remove();         
        }
        venuesTF.value = null;
    }
    createContest= () => {
        //add to db
    }

    cancel=()=>{
        //cancel
    }
    render() {
        return (

            <main>
                <Form>

                    <Form.Group className="form-group">
                        <Form.Label className="form-title" htmlFor="competitionName">Name</Form.Label>
                        <Form.Control type="text" className="form-control" id="competitionName" placeholder="Name" />
                    </Form.Group>
                    <Form.Label className="form-title" >Inscriptions start:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscStartDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" id="InscStartDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscStartTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" id="InscStartTime" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Label className="form-title" >Inscriptions end:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscEndDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" id="InscEndDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscEndTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" id="InscEndTime" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Label className="form-title" >Contest starts:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContStartDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" id="ContStartDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContStartTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" id="ContStartTime" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Label className="form-title" >Contest ends:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContEndDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" id="ContEndDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContEndTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" id="ContEndTime" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label htmlFor="venues" className="form-title">Venues</Form.Label>
                        <Col>
                            <Form.Label >Type venue name to add to list</Form.Label>
                            <Form.Control list="venuesList" id="venuesTF" />
                            <datalist id="venuesList">
                                <option value="Icesi" id="Icesi">Icesi</option>
                                <option value="Sanbue" id="Sanbue">Sanbue</option>
                                <option value="Jave" id="Jave">Jave</option>
                            </datalist>
                            <Button className="add-venue-btn" id="add-venue-btn" onClick={this.addVenue}>Add to List</Button>
                        </Col>
                        <Col>
                            <Table className="table table-hover table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>
                                            Venues
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="selectedVenues"></tbody>
                            </Table>
                        </Col>
                    </Row>
                </Form>
                <Button className="create-contest btn" id="create-contest-btn" onClick={this.createContest}>Create contest</Button>
                <Button className="cancel btn bg-danger" id="cancel-btn" onClick={this.cancel}>Cancel</Button>
            </main >
        )
    }
}

export default CreateContestForm;