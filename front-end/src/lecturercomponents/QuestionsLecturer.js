import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const QuestionsLecturer = () => {
    const { userId, lecturerId, lessonId } = useParams();
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await lecturerService.getQuestions(userId, lecturerId, lessonId);
                setQuestions(data); // Assuming data matches QuestionVariantsStudentDTO
            } catch (error) {
                console.error('Failed to load questions', error);
            }
        };

        fetchQuestions();
    }, [userId, lecturerId, lessonId]);

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
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

    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        margin: '5px',
    };

    const addButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const actionButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
        color: 'white',
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#f44336',
        color: 'white',
    };

    const questionStyle = {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f1f1f1',
    };

    const questionHeadingStyle = {
        color: '#333',
        fontSize: '18px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Questions</h2>
            <button style={addButtonStyle} onClick={() => navigate(`questions/add`)}>
                Add Question
            </button>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id} style={questionStyle}>
                        <h4 style={questionHeadingStyle}>{question.question}</h4>
                        <p>Variant 1: {question.variant1}</p>
                        <p>Variant 2: {question.variant2}</p>
                        <p>Variant 3: {question.variant3}</p>
                        <p>Correct Variant: {question.correctAnswer}</p>
                        <button style={actionButtonStyle} onClick={() => navigate(`questions/${question.id}/update`)}>
                            Update Question
                        </button>
                        <button style={deleteButtonStyle} onClick={() => navigate(`questions/${question.id}/remove`)}>
                            Delete Question
                        </button>
                    </div>
                ))
            ) : (
                <p>No questions found.</p>
            )}
        </div>
    );
};

export default QuestionsLecturer;
