import React from 'react';
import ReactModal from 'react-modal';
ReactModal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.51)';

export default class ModalWithInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numPomodoros: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const numPomodoros = e.target.value;
        this.setState({
            numPomodoros: numPomodoros
        })
    }

    handleSubmit(e) {
        e.preventDefault();   // use it for any and all forms with custom submit behavior 
        const { addItem } = this.props;
        const { numPomodoros } = this.state;
        if (numPomodoros !== '') {
            addItem(numPomodoros);
            this.setState({
                numPomodoros: 4
            });
        }
    }
        
    render() {
        return (
            <ReactModal 
              isOpen={this.props.showModal}
              contentLabel="Modal #1 Global Style Override Example"
              onRequestClose={this.props.handleCloseModal}
              className="modal-outer-container"
            >
              <div className="modal-inner-container">
                <h4 className="modal-heading">NUMBER OF POMODORO SESSIONS</h4>
                <div className="todo-input-container">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            placeholder="...you plan to complete this in"
                            onChange={this.handleChange}
                            className="todo-input"
                            autoFocus
                            type="number"
                        />
                        <button type="submit" className="modal-input-button">
                            ADD
                        </button>
                    </form>      
                </div>
              </div>
            </ReactModal>
        );
    }
}