import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class AddStudent extends Component {

    state = {
        name: '',
        course: '',
        email: '',
        phone: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveStudent = async (e) => {
        e.preventDefault();
        const originControl = document.getElementById('saveBtn');
        originControl.innerText = "Saving...";
        const res = await axios.post('http://localhost:8000/api/add-student', this.state);
        if (res.data.status === 200) {

            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok",
              });
              originControl.innerText = "Save";
              this.setState({
                name: '',
                course: '',
                email: '',
                phone: '',
            });
            
        }
        

    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>
                                    Add Students
                                    <Link to={'/'} className='btn btn-primary btn-sm float-end'>Back</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.saveStudent}>
                                    <div className='form-group mb-3'>
                                        <label>Name</label>
                                        <input type="text" name="name" value={this.state.name} onChange={this.handleInput} className="form-control" />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Course</label>
                                        <input type="text" name="course" value={this.state.course} onChange={this.handleInput} className="form-control" />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type="text" name="email" value={this.state.email} onChange={this.handleInput} className="form-control" />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Phone</label>
                                        <input type="text" name="phone" value={this.state.phone} onChange={this.handleInput} className="form-control" />
                                    </div>
                                    <div className='form-group mb-3'>

                                        <button id="saveBtn" type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddStudent;