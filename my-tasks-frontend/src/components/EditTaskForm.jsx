import React, { Component } from "react";
import axios from 'axios';
import Modal from 'react-modal';

class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.task?.title || '',
    };
  }

  closeModal = () => {
    this.props.setIsOpen(false);
  }

  handleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  editTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tasks/${id}`, { title: this.state.title });
      if (response.status === 200) {
        alert('Tâche N°' + id + ' modifiée');
        this.closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur API :', error);
    }
  };

  render() {
    const { isOpen, task } = this.props;

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        className="fixed inset-0 p-10 bg-gray-950 rounded-lg"
      >
        <h2 className="text-center">Édition</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); this.editTask(task.id); }}>
          <label>Titre:</label>
          <input
                className="rounded-lg h-10 w-80 pl-2"
                type="text"
                defaultValue={task?.title}
                onChange={this.handleChange}
            />
          <div className="flex justify-around">
            <input
                type="submit"
                value="Valider"
                className="bg-green-700 border border-gray-950 justify-self-center w-fit p-2 rounded-lg hover:cursor-pointer hover:border-indigo-500"
            />
            <button className="bg-red-700" onClick={this.closeModal}>Fermer</button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default EditTaskForm;
