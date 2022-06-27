import React, {useState} from 'react';
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button
} from 'reactstrap';


const Createtask = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [taskList, setTaskList] = useState([])
    const [tempList, setTemplist] = useState([])


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "taskName") {
            setTaskName(value)
        } else {
            setDescription(value)
        }
    }
    const handleSave = () => {
        let taskObj = {}
        taskObj["Name"] = taskName
        taskObj["Description"] = description
        save(taskObj)
        setTaskList(tempList)

    }

    return (

        <Modal isOpen={modal}
            toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Create Task
            </ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label>
                            Task Name
                        </label>
                        <input type="text" className="form-control" value ={taskName}
                            onChange={handleChange}
                            name="taskName"/>
                    </div><br/>
                    <div className="form-group">
                        <label>
                            Description
                        </label>
                        <textarea rows="5" className="form-control"
                            value={description}
                            onChange={handleChange}
                            name="description"
                            placeholder="Description"/>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary"
                    onClick={handleSave}>
                    Create
                </Button>
                {' '}
                <Button>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>

    );
};

export default Createtask;
