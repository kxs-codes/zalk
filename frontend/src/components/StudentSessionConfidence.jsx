import useStudentSessionConfidence from './StudentSessionConfidence.js';
import '../styles/Student/components/StudentConfidence.css'

const StudentSessionConfidence = ({ userId, setStudentZLO }) => {
    const {rangeValue, dialogRef, buttonRef, setRangeValue, handleSubmit} = useStudentSessionConfidence(userId, setStudentZLO);

    return (
        <dialog ref={dialogRef} className='dialogBox'>
            <form className='dialogForm' onSubmit={handleSubmit}>
                <p className='dialogFormParagraph'>Great work! How did you feel taking this quiz today? (0 = lowest, 1 = highest)</p>
                <div className='dialogFormDiv'>
                    <div className='dialogFormInputDiv'>
                        <input
                            className='dialogFormInput'
                            value={rangeValue}
                            onChange={(e) => setRangeValue(parseFloat(e.target.value))}
                            type="range"
                            min={0.00}
                            max={1.00}
                            step={0.01}
                        />
                        <span>{rangeValue}</span>
                    </div>
                    <button
                        className='dialogFormButton'
                        type="submit"
                        ref={buttonRef}
                    >
                        View Session Results
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default StudentSessionConfidence;