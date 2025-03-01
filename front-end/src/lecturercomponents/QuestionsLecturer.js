import React, { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import lecturerService from '../services/lecturerService';

const QuestionsLecturer = () => {
    const {lecturerId, lessonId} = useParams();
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    // const [answers, setAnswers] = useState({});
    // const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await lecturerService.getQuestions(lecturerId, lessonId);
                setQuestions(data); // Assuming data matches QuestionVariantsStudentDTO
            } catch (error) {
                console.error('Failed to load questions', error);
            }
        };

        fetchQuestions();
    }, [lecturerId, lessonId]);

    return (
        <div>
            <h2>Questions</h2>
            <button onClick={() => navigate(`/lecturers/${lecturerId}/lesson/${lessonId}/questions/add`)}>
                Add Question
            </button>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id}>
                        <h4>{question.question}</h4>
                        <p>Variant 1: {question.variant1}</p>
                        <p>Variant 2: {question.variant2}</p>
                        <p>Variant 3: {question.variant3}</p>
                        <p>Correct Variant: {question.correctAnswer}</p>
                        <button onClick={() => navigate(`/lecturers/${lecturerId}/questions/${question.id}/update`)}>
                            update question
                        </button>
                        <button onClick={() => navigate(`/lecturers/${lecturerId}/questions/${question.id}/remove`)}>
                            delete question
                        </button>
                    </div>

                ) )

            ) : (
                <p>No questions found.</p>
            )}
        </div>
    );
};
export default QuestionsLecturer;

