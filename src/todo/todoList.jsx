import React from 'react'
import IconButton from '../template/IconButton';
import { connect } from 'react-redux'

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo.id}>
                <td className={todo.done ? 'markedAsDone' : ''}>
                    {todo.description}
                </td>
                <td>
                    <IconButton style="success" icon="check"
                        hide={todo.done}
                        onClick={() => props.handleMarkAsDone(todo)} />

                    <IconButton style="warning" icon="undo"
                        hide={!todo.done}
                        onClick={() => props.handleMarkAsPending(todo)} />

                    <IconButton style="danger" icon="trash-o"
                        hide={!todo.done}
                        onClick={() => confirm("Deseja deletar a tarefa?") ? props.handleRemove(todo) : false} />
                </td>
            </tr>
        ))
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className="tableActions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
export default connect(mapStateToProps)(TodoList)