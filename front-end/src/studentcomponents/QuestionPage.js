import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import studentService from '../services/studentService';

const QuestionsPage = () => {
    const {userId, studentId, lessonId } = useParams();
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

    return (
        <div>
            <h2>Questions</h2>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id}>
                        <p><strong>{question.question}</strong></p>
                        <div>
                            {/* Render radio buttons for variants */}
                            {[question.variant1, question.variant2, question.variant3].map((variant, index) => (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={variant}
                                            onChange={() => handleAnswerChange(question.id, variant)}
                                            checked={answers[question.id] === variant}
                                        />
                                        {variant}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* Display the selected variant */}
                        {answers[question.id] && (
                            <p><strong>You selected:</strong> {answers[question.id]}</p>
                        )}
                    </div>
                ))
            ) : (
                <p>Loading questions...</p>
            )}

            <button onClick={handleSubmitAnswers}>Submit Answers</button>
            {message && <p>{message}</p>}
            <button onClick={() => navigate(-1)}>
            Back
        </button>
        </div>

    );
};

export default QuestionsPage;
