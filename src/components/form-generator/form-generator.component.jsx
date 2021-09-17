import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Textarea from 'react-validation/build/textarea';
import CheckButton from 'react-validation/build/button'

import QuestionGenerator from "./question-generator.component";
import QuestionGenerated from "../form-generated/questions-generated.component";
import formService from "../../services/form.service";

const validateName = value => {
    if(!value){
        return (
            <div className='alert alert-danger' role='alert'>
                You need to provide a Name for the form.
            </div>
        );
    }
}

const validateDescription = value => {
    if(!value){
        return (
            <div className='alert alert-danger' role='alert'>
                You need to provide a description.
            </div>
        );
    }
}

export default class FormGenerator extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.renderQuestionsGenerated = this.renderQuestionsGenerated.bind(this);

        this.state = {
            name: "",
            description: "",
            questions: [],
            questionsCount: 0,
            renderQuestions: [],
            renderQuestionsGenerated: []
        }
    }

    async handleSubmit(event){
        event.preventDefault();

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){
            // const options = this.state.options.shift();

            const data = {
                name: this.state.name,
                description: this.state.description,
                questions: this.state.questions
            }
            try{   
                await formService.postForm(data);
            } catch(err) {
                console.log(err);
            }
        }
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    retrieveNewQuestion = (newQuestion) => {
        const questions = this.state.questions;
        if(questions.length === 0) {
            questions.push(newQuestion);
            return;
        }
        // Renew the values of the questions
        const questionsIndexes = [];
        this.setState({
            renderQuestionsGenerated: []
        })

        questions.forEach((question) => {
            questionsIndexes.push(question.id);

            const areTheSameQuestion = question.id === newQuestion.id;
            if(areTheSameQuestion) {
                for (var key in question) {
                      question[key] = newQuestion[key];
                }
                this.setState({
                    questions: questions
                })
                return;
            }
        });

        //Push new question if it doesn't exist
        const alreadyExistQuestion = questionsIndexes.includes(newQuestion.id);
        if(!alreadyExistQuestion) {
            questions.push(newQuestion);
        }

        this.setState({
            questions: questions

        });
    }

    renderQuestionsGenerated() {
        const questions = this.state.questions;
        const questionGeneratedList = [];
        questions.forEach((question) => {
            const questionGeneratedComponent = (
                <QuestionGenerated
                id={question.id}
                name={question.name}
                questionType={question.questionType}
                options={question.options}
                ></QuestionGenerated>
            );
            questionGeneratedList.push(questionGeneratedComponent);
        });
        return (
            <div>
                {questionGeneratedList}
            </div>
        )

    }
    
    async addQuestion(event) {
        event.preventDefault();
        await this.setState({
            questionsCount: this.state.questionsCount + 1
        })

        const questionComponent = (
            <div className='flex'>
                <QuestionGenerator
                id={this.state.questionsCount}
                callback={this.retrieveNewQuestion}
                >
                </QuestionGenerator>
                <button name={this.state.questionsCount} onClick={this.removeQuestion} className='mx-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                </button>
            </div>
        )
        const renderQuestions = this.state.renderQuestions;
        renderQuestions.push(questionComponent);
        
        this.setState({
            renderQuestions: renderQuestions
        });
    }

    removeQuestion(event){
        event.preventDefault();

        let renderQuestions = this.state.renderQuestions;
        const questionIndex = event.target.name;
        renderQuestions.splice(questionIndex, 1);
        let questions = this.state.questions;
        questions.splice(questionIndex, 1);
        this.setState({
            renderQuestions: renderQuestions,
            questions: questions
        });

    }

    render() {
        return(
            <div className='flex flex-wrap w-full'>
                
                <div className='flex-1 flex-wrap mx-2 px-10 flex-grow bg-gray-200 rounded'>
                    <div className='bg-gray-200 rounded mt-10 text-center text-9x1 h-24'>
                        <p className='text-3xl'>Creacion de Encuesta</p>
                    </div>
                    <div className='bg-red-400 py-16 w-full flex flex-col items-center justify-center'>
                        <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                        className='grid justify-center items-center w-full'
                        >
                            <div className=' items-center mt-10'>
                                <label className='text-white w-12 text-lg' htmlFor="name">Name</label>
                                <Input
                                type='text'
                                className='py-2 rounded pl-6 border border-gray-200'
                                placeholder="Name"
                                name='name'
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[validateName]}
                                />
                            </div>
                            <div className='items-center mt-10'>
                                <label className='text-white text-lg' htmlFor="description">Description</label>
                                <Textarea
                                type='text'
                                name='description'
                                className='py-12 rounded pl-6 border border-gray-200'
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                placeholder='Place your description here ^-^'
                                validations={[validateDescription]}
                                />
                            </div>
                            <div>
                                <div>
                                    {this.state.renderQuestions}
                                </div>
                            </div>
                            <button onClick={this.addQuestion} className='bg-blue-600 rounded-full h-10 w-32 mt-10'>
                                Add question
                            </button>
                            <button className='bg-blue-600 rounded-full w-full h-10 w-32 mt-10'>
                                Upload Form
                            </button>

                            <CheckButton
                            style={{ display: 'none' }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                            />
                        </Form>
                    </div>
                </div>
                <div className='flex-1 mx-2 px-2 flex-grow bg-gray-200 rounded'>
                    <div className='bg-gray-200 rounded mt-10 text-center text-9x1 h-24'>
                        {!!this.state.name ? (
                            <p className='text-3xl'>{this.state.name}</p>
                        ): (
                            <p className='text-3xl'>Form's name</p>
                        )}
                        
                            {!!this.state.description ? (
                                <p className='text-lg text-gray-500'>{this.state.description}</p>
                            ) : (
                                <p className='text-lg text-gray-500'>Form's description</p>
                            )}
                            
                    </div>
                    <div className='divide-y bg-blue-500 py-16 px-12 flex flex-col items-center justify-center'>
                        {!!this.state.questions.length ? (
                            <div>{this.renderQuestionsGenerated()}</div>
                        ) : (
                            <p>Here goes your questions</p>
                        )}
                        
                    </div>
                </div>
            </div>
        )
    }
}