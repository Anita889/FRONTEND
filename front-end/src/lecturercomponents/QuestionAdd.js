import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const QuestionAdd = () => {
    const {userId, lecturerId, lessonId } = useParams();
    const [newQuestion, setNewQuestion] = useState({ question: '', variant1: '', variant2: '', variant3: '', correctAnswer: '' });
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            lecturerService.addQuestions(userId, lecturerId, lessonId, newQuestion);
            alert('Question added successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Failed to add question', error);
            alert('Failed to add question. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion({ ...newQuestion, [name]: value });
    };

    return (
        <div>
            <h2>Add New Question</h2>
            <form onSubmit={e => { e.preventDefault(); handleAdd(); }}>
                <div>
                    <label>Question:</label>
                    <input
                        type="text"
                        name="question"
                        value={newQuestion.question}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Variant 1:</label>
                    <input
                        type="text"
                        name="variant1"
                        value={newQuestion.variant1}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Variant 2:</label>
                    <input
                        type="text"
                        name="variant2"
                        value={newQuestion.variant2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Variant 3:</label>
                    <input
                        type="text"
                        name="variant3"
                        value={newQuestion.variant3}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Correct Variant:</label>
                    <input
                        type="text"
                        name="correctAnswer"
                        value={newQuestion.correctAnswer}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Question</button>
            </form>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

export default QuestionAdd;
