import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const QuestionDelete = () => {
    const { lecturerId, questionId  } = useParams();
    const [question, setQuestion] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await lecturerService.getQuestion(lecturerId, questionId);
                setQuestion(data);
            } catch (error) {
                console.error('Failed to load question', error);
            }
        };

        fetchQuestion();
    }, [lecturerId, questionId]);

    const handleDelete = async () => {
        try {
            //${API_URL}${lecturerId}/questions/${questionId}/remove
            lecturerService.deleteQuestion(lecturerId, questionId);
            alert('Question deleted successfully!');
            navigate(-1); // Redirect to questions list
        } catch (error) {
            console.error('Failed to delete question', error);
            alert('Failed to delete question. Please try again.');
        }
    };

    return (
        <div>
            <h2>Are you sure you want to delete this question?</h2>
            {question && (
                <div>
                    <h4>{question.question}</h4>
                    <p>Variant 1: {question.variant1}</p>
                    <p>Variant 2: {question.variant2}</p>
                    <p>Variant 3: {question.variant3}</p>
                    <p>Correct Variant: {question.correctAnswer}</p>
                    <button onClick={handleDelete}>Yes, Delete</button>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default QuestionDelete;
