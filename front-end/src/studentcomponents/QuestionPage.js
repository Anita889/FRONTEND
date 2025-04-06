import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import studentService from '../services/studentService';

const QuestionsPage = () => {
    const { userId, studentId, lessonId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await studentService.getQuestionsAndVariants(userId, studentId, lessonId);
                setQuestions(data); // Assuming data matches QuestionVariantsStudentDTO
            } catch (error) {
                console.error('Failed to load questions', error);
            }
        };

        fetchQuestions();
    }, [userId, studentId, lessonId]);

    const handleAnswerChange = (questionId, selectedVariant) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: selectedVariant
        }));
    };

    const handleSubmitAnswers = async () => {
        // Check if answers are provided
        if (Object.keys(answers).length === 0) {
            setMessage('Please answer all the questions before submitting.');
            return;
        }

        try {
            // Format the answers with additional information like correctness
            const formattedAnswers = questions.map((question) => {
                const selectedAnswer = answers[question.id];

                return {
                    id: question.id,
                    question: question.question,
                    firstVariant: question.variant1 === selectedAnswer,
                    secondVariant: question.variant2 === selectedAnswer,
                    thirdVariant: question.variant3 === selectedAnswer,
                };
            });

            console.log('Formatted Answers:', formattedAnswers); // Log to check the structure of the answers

            const gradeData = await studentService.submitAnswers(userId, studentId, lessonId, formattedAnswers);
            setMessage(`Grade: ${gradeData.grade}, Description: ${gradeData.description}`);
        } catch (error) {
            console.error('Failed to submit answers', error);
            setMessage('Failed to submit answers. Please try again later.');
        }
    };

    const pageStyles = {
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        backgroundColor: '#f4f7f6',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const titleStyles = {
        color: '#4CAF50',
        fontSize: '28px',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const questionCardStyles = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const questionTextStyles = {
        fontSize: '18px',
        marginBottom: '10px',
    };

    const variantsContainerStyles = {
        marginBottom: '15px',
    };

    const variantOptionStyles = {
        margin: '5px 0',
    };

    const radioButtonStyles = {
        marginRight: '10px',
    };

    const selectedAnswerStyles = {
        fontWeight: 'bold',
        color: '#00796B',
    };

    const buttonStyles = {
        padding: '10px 20px',
        margin: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const submitButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
    };

    const backButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#FF9800',
        color: 'white',
        border: 'none',
    };

    const messageStyles = {
        color: '#d32f2f',
        fontWeight: 'bold',
        textAlign: 'center',
    };

    return (
        <div style={pageStyles}>
            <h2 style={titleStyles}>Answer the Questions</h2>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id} style={questionCardStyles}>
                        <p style={questionTextStyles}><strong>{question.question}</strong></p>
                        <div style={variantsContainerStyles}>
                            {[question.variant1, question.variant2, question.variant3].map((variant, index) => (
                                <div key={index} style={variantOptionStyles}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={variant}
                                            onChange={() => handleAnswerChange(question.id, variant)}
                                            checked={answers[question.id] === variant}
                                            style={radioButtonStyles}
                                        />
                                        {variant}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* Display the selected variant */}
                        {answers[question.id] && (
                            <p style={selectedAnswerStyles}><strong>You selected:</strong> {answers[question.id]}</p>
                        )}
                    </div>
                ))
            ) : (
                <p>Loading questions...</p>
            )}

            <button style={submitButtonStyles} onClick={handleSubmitAnswers}>Submit Answers</button>
            {message && <p style={messageStyles}>{message}</p>}
            <button style={backButtonStyles} onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default QuestionsPage;
