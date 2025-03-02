import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const QuestionUpdate = () => {
    const {userId, lecturerId, questionId } = useParams();
    const [question, setQuestion] = useState({
        id: '',
        question: '',
        variant1: '',
        variant2: '',
        variant3: '',
        correctAnswer: ''
    });
    const [loading, setLoading] = useState(true);  // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await lecturerService.getQuestion(userId, lecturerId, questionId);
                if (data) {
                    setQuestion({
                        question: data.question || '',
                        variant1: data.variant1 || '',
                        variant2: data.variant2 || '',
                        variant3: data.variant3 || '',
                        correctAnswer: data.correctAnswer || '',
                        id: data.id || ''
                    });
                }
            } catch (error) {
                console.error('Failed to load question', error);
                alert('Failed to load the question data. Please try again.');
            } finally {
                setLoading(false);  // Set loading to false after fetch attempt
            }
        };

        fetchQuestion();
    }, [userId, lecturerId, questionId]);

    const handleUpdate = async () => {
        try {
            lecturerService.updateQuestion(userId, lecturerId, questionId, question);
            alert('Question updated successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Failed to update question', error);
            alert('Failed to update question. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion({ ...question, [name]: value });
    };

    // Show loading indicator while fetching
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Update Question</h2>
            <form onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
                <div>
                    <label>Question:</label>
                    <input
                        type="text"
                        name="question"
                        value={question.question}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Variant 1:</label>
                    <input
                        type="text"
                        name="variant1"
                        value={question.variant1}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Variant 2:</label>
                    <input
                        type="text"
                        name="variant2"
                        value={question.variant2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Variant 3:</label>
                    <input
                        type="text"
                        name="variant3"
                        value={question.variant3}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Correct Variant:</label>
                    <input
                        type="text"
                        name="correctAnswer"
                        value={question.correctAnswer}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Question</button>
            </form>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

export default QuestionUpdate;
