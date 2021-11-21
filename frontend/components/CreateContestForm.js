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
        if (InscStartDate.value > InscEndDate.value){
            InscEndDate.value= null;
        }
        if (InscStartTime.value >= InscEndTime.value && InscEndDate.value == InscStartDate.value) {
            InscEndTime.value = null;
        }
        ContStartDate.setAttribute('min', InscEndDate.value);
        if (ContStartDate.value < InscEndDate.value){
            ContStartDate.value= null;
        }
        if (ContStartTime.value < InscEndTime.value && InscEndDate.value == ContStartDate.value) {
            ContStartTime.value = null;
        }
        ContEndDate.setAttribute('min', ContStartDate.value);
        if (ContStartDate.value > ContEndDate.value){
            ContEndDate.value= null;
        }
        if (ContStartTime.value >= ContEndTime.value && ContEndDate.value == ContStartDate.value)
            ContEndTime.value = null;
    }


    addVenue = () => {
        let selectedVenues = document.getElementById('selectedVenues');
        let venuesTF = document.getElementById('venuesTF');
        let venuesList = document.getElementById('venuesList');
        let selectedVenuesList = document.getElementById('selectedVenuesList');
        if (venuesList.options.namedItem(venuesTF.value)) {
            selectedVenuesList.value += venuesTF.value + ', ';
            selectedVenues.innerHTML += `<tr><td name="${venuesTF.value}" id="${venuesTF.value}">${venuesTF.value}</td></tr>`;
            venuesList.options.namedItem(venuesTF.value).remove();
        }
        venuesTF.value = null;
    }


    cancel = () => {
        let isExecuted = confirm('Seguro? xd')
        if (isExecuted) {
            //cancel
        }

    }
    render() {
        return (

            <main>
                <span id="message" className={this.props.className}>{this.props.message}</span>
                <Form method="POST" action="http://localhost:8080/createContest" >

                    <Form.Group className="form-group">
                        <Form.Label className="form-title" htmlFor="competitionName">Name</Form.Label>
                        <Form.Control type="text" className="form-control" id="competitionName" name="competitionName" placeholder="Name" />
                    </Form.Group>
                    <Form.Label className="form-title" >Inscriptions start:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscStartDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" id="InscStartDate" name="InscStartDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscStartTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" id="InscStartTime" name="InscStartTime" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Label className="form-title" >Inscriptions end:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscEndDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" id="InscEndDate" name="InscEndDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="InscEndTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" id="InscEndTime" name="InscEndTime" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Label className="form-title" >Contest starts:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContStartDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" id="ContStartDate" name="ContStartDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContStartTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" id="ContStartTime" name="ContStartTime" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Label className="form-title" >Contest ends:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContEndDate">Date</Form.Label>
                                <Form.Control onChange={this.handleChange} type="date" className="form-control" name="ContEndDate" id="ContEndDate" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ContEndTime">Time</Form.Label>
                                <Form.Control onChange={this.handleChange} type="time" className="form-control" name="ContEndTime" id="ContEndTime" />
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
                                {this.props.venues.map(e => (
                                    <option value={e.name} id={e.name}>{e.name}</option>
                                ))}
                            </datalist>
                            <Button className="btn-style2" id="add-venue-btn" onClick={this.addVenue}>Add to List</Button>
                        </Col>
                        <Col>
                            <Table className="table table-hover table-striped text-center" id="venuesTable" name="venuesTable">
                                <thead>
                                    <tr>
                                        <th>
                                            Venues
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="selectedVenues" name="selectedVenues"></tbody>
                            </Table>
                            <Form.Control type="hidden" name="selectedVenuesList" id="selectedVenuesList" />
                        </Col>
                    </Row>
                    <Button className="btn-style2" type="submit" id="create-contest-btn">Create contest</Button>
                    <Button className="btn-style3" id="cancel-btn" onClick={this.cancel}>Cancel</Button>
                </Form>

            </main >
        )
    }
}

export default CreateContestForm;