import React from "react";
import { Row, Container, Form, Button } from "react-bootstrap";

const LandingFormInput = ({
  handleChange,
  setUserTask,
  _name,
  _content,
  fetchTaskList,
}) => {
  return (
    <div>
      <Container id="form-container">
        <Row className="form-container__row justify-content-center" lg={3}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                placeholder="Enter Task Name"
                type="text"
                name="_name"
                value={_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                placeholder="Enter Task Description"
                type="text"
                name="_content"
                value={_content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Row>
        <div className="form-container__buttons">
          <Button
            className="form-container__button"
            variant="primary"
            type="submit"
            onClick={setUserTask}
          >
            Set Task
          </Button>
          <Button variant="primary" type="submit" onClick={fetchTaskList}>
            Fetch Tasks
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingFormInput;
