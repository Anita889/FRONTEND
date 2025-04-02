import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const QuestionAdd = () => {
    const { userId, lecturerId, lessonId } = useParams();
    const [newQuestion, setNewQuestion] = useState({ question: '', variant1: '', variant2: '', variant3: '', correctAnswer: '' });
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            await lecturerService.addQuestions(userId, lecturerId, lessonId, newQuestion);
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

    // Inline styles
    const containerStyle = {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const inputStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '15px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
    };

    const submitBtnStyle = {
        ...buttonStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const cancelBtnStyle = {
        ...buttonStyle,
        backgroundColor: '#f44336',
        color: 'white',
    };

    const formGroupStyle = {
        marginBottom: '20px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Add New Question</h2>
            <form onSubmit={e => { e.preventDefault(); handleAdd(); }} style={formStyle}>
                <div style={formGroupStyle}>
                    <label>Question:</label>
                    <input
                        type="text"
                        name="question"
                        value={newQuestion.question}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label>Variant 1:</label>
                    <input
                        type="text"
                        name="variant1"
                        value={newQuestion.variant1}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label>Variant 2:</label>
                    <input
                        type="text"
                        name="variant2"
                        value={newQuestion.variant2}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label>Variant 3:</label>
                    <input
                        type="text"
                        name="variant3"
                        value={newQuestion.variant3}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label>Correct Variant:</label>
                    <input
                        type="text"
                        name="correctAnswer"
                        value={newQuestion.correctAnswer}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="submit" style={submitBtnStyle}>Add Question</button>
                    <button type="button" onClick={() => navigate(-1)} style={cancelBtnStyle}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default QuestionAdd;
