import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select';

export default class QuestionGenerator extends Component {
    constructor(props) {
        super(props)
        this.onChangeQuestionType = this.onChangeQuestionType.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);

        this.state = {
            id: props.id,
            questionType: 'text',
            name: '',
            options: ['']
        }
    }

    componentDidMount() {
        this.props.callback(this.state);
    }

    shouldComponentUpdate(nextProps, nextState){
        const sameQuestion = nextState.name === this.state.name;
        const sameQuestionType = nextState.questionType === this.state.questionType;

        if(sameQuestionType && sameQuestion){
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this.props.callback(this.state);
    }

    async onChangeQuestionType(event) {
        await this.setState({
            questionType: event.target.value
        })
    }

    async onChangeQuestion(event) {
        await this.setState({
            name: event.target.value
        });
    }

    async onChangeOption(event) {
        const options = this.state.options;
        const optionIndex = event.target.id;
        options[optionIndex] = event.target.value;
        await this.setState({
            options: options
        })
        this.props.callback(this.state);
    }

    renderInput() {
        if(this.state.questionType === 'text') {
            return;
        }

        const options = this.state.options;
        let inputList = [];
        inputList = options.map((option, index) => {
            return (
                <div className='flex justify-center items-center'>
                    <Input
                    type='text'
                    className='py-2 rounded px-4 p-2 m-2 border border-gray-200'
                    placeholder="Option"
                    name='question'
                    value={this.state.options[index]}
                    onChange={this.onChangeOption}
                    validations={[]}
                    id={index}
                    />
                    <button name={option} onClick={this.removeOption} className='bg-blue-500 w-6 rounded-full mr-2'>-</button>
                </div>
            )
        });
        inputList.push(
            <div className='flex justify-center items-center'>
                <button onClick={this.addOption} className='bg-blue-600 rounded-full h-10 w-32 mt-10'>
                    Add option
                </button>
            </div>
        )

        return (
            <div>
                {inputList}
            </div>
        )
    }

    addOption(event) {
        event.preventDefault();
        const options = this.state.options;
        options.push('');
        this.setState({
            options: options
        });
        this.forceUpdate();
    }

    removeOption(event) {
        event.preventDefault();
        const options = this.state.options;
        if(options.length <= 1){
            return;
        }
        const newOptions = options.filter((option, index) => {
            return option !== event.target.name
        });

        this.setState({
            options: newOptions
        })
        this.forceUpdate();
    }

    render() {
        return(
            <div className='border rounded py-4 my-10'>
                <Form
                ref={c => {
                    this.form = c;
                }}
                >
                    <div className='grid justify-center items-center rounded py-4 my-10'>
                        <div className='grid items-center'>
                            <div className='p-2'>
                                <label className='text-white text-lg' htmlFor="questionType">Question's type</label>
                                <Select
                                className='py-2 rounded text-left p-12 border border-gray-200'
                                name='questionType'
                                value={this.state.questionType}
                                onChange={this.onChangeQuestionType}
                                >
                                    <option value="">Choose option type</option>
                                    <option value="text">Text</option>
                                    <option value="checkbox">Checkbox</option>
                                    <option value="radio">Radio</option>
                                </Select>
                            </div>
                            <div className='p-2'>
                                <label className='text-white text-lg' htmlFor="question">Question</label>
                                <Input
                                type='text'
                                className='py-2 rounded pl-6 border border-gray-200'
                                placeholder="Question"
                                name='question'
                                value={this.state.name}
                                onChange={this.onChangeQuestion}
                                validations={[]}
                                />
                            </div>
                            {this.renderInput()}
                        </div>
                    </div>
                </Form>
                <div className='flex items-center justify-center'>
                    
                </div>
            </div>
        )
    }
}

