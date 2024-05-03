import React from "react";
import axios from 'axios';

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit() {
    this.apiCall(this.state.value);
    alert('Nouvelle tâche : ' + this.state.value);
  }

  apiCall = async (title) => {
      try {
        const response = await axios.post('http://localhost:8080/api/tasks', { title })
        if (response.status === 200) {
          console.log(response.data);
          window.location.reload;
        }
      } catch (error) {
        console.error('Erreur API :', error);
      }
  };
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="grid place-content-center space-y-4">
          <label>Titre:</label>
          <input className="rounded-lg h-10 w-80 pl-2" type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Valider" className="bg-gray-950 border border-gray-950 justify-self-center w-fit p-2 
          rounded-lg hover:cursor-pointer hover:border-indigo-500" />
        </div>
      </form>
    );
  }
}

export default AddTaskForm;
