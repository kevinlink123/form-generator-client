import React, { Component } from "react";

export default class QuestionGenerated extends Component {
    constructor(props){
        super(props);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeOptions = this.onChangeOptions.bind(this);
        this.renderCheckbox = this.renderCheckbox.bind(this);

        this.state = {
            id: props.id,
            name: props.name,
            questionType: props.questionType,
            options: props.options,
            renderQuestions: []
        }
    }

    async onChangeQuestion(event) {
        await this.setState({
            name: this.props.name
        })
    }

    async onChangeOptions(event) {
        const options = this.props.options;
        const optionIndex = event.target.id;
        options[optionIndex] = event.target.value;

        await this.setState({
            options: options
        })
    }

    renderCheckbox() {
        const { questionType, options } = this.props;

        let optionList = [];
        optionList = (
                <div className='border p-2'>
                    <input  
                    id='0'
                    type='text'
                    className='py-12 flex items-start rounded px-4 p-2 m-2 border border-gray-200'
                    placeholder=""
                    name='name'
                    />
                </div>
            )
        if(!(questionType === 'text')) {
            optionList = options.map((option, index) => {
                return (
                    <div className='flex justify-start '>
                        <input
                        id={index}
                        type={questionType}
                        className='py-2 rounded px-4 p-2 m-2 border border-gray-200'
                        name='name'
                        />
                        <label htmlFor={index}>
                            {!!option ? (
                                <p>{option}</p>
                            ) : (
                                <p>Here goes your answer</p>
                            )}
                            
                        </label>
                    </div>
                )
            })
        }
        return(
            <div>
                {optionList}
            </div>
        )
    }

    render() {
        return (
            <div className='m-10'>
                {!this.props.name ? (
                    <p className='text-xl'>No question gived</p>
                ) : (
                    <p className='text-xl'>
                        {this.props.name}
                    </p>
                )}
                <div className='my-5'>
                    {this.renderCheckbox()}
                </div>
                <div className="h-1 w-full bg-black rounded"></div>
            </div>
        )
    }
}