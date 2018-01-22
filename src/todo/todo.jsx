import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm';
import TodoList from './todoList';
const URL = 'http://localhost:3000/api/todo/'

export default class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = { description: '', list: [] };
        this.setDescription = this.setDescription.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleGet();
    }

    setDescription(e) {
        this.setState({
            ...this.state,
            description: e.target.value
        });
    }

    handleAdd() {
        const description = this.state.description;
        axios.post(URL, { description }).then(
            resp => this.handleGet()
        )

        console.log("worth it");
    }

    handleGet() {
        axios.get(URL).then(resp => (
            this.setState({
                ...this.state,
                description: '',
                list: resp.data
            })
        ))

        console.log("worth it");
    }

    handleRemove(todo){
        const id = todo.id;
        axios.delete(`${URL}${todo.id}`).then(
            resp => this.handleGet()
        )
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}${todo.id}`, {...todo, done: false}).then(
            resp => this.handleGet()
        )
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}${todo.id}`, {...todo, done: true}).then(
            resp => this.handleGet()
        )
    }

    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm description={this.state.description}
                    handleChange={this.setDescription}
                    handleAdd={this.handleAdd} />
                <br />
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending} />
            </div>
        )
    }
}