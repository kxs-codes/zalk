export const useQuestionLogic = ({ items, pickedAns, submitted, correctAnswer }) => {
    const getButtonClass = (item) => {
        const isSelected = pickedAns === item;
        const isCorrect = item === correctAnswer;
        let buttonClass = 'aItem';
        //Logic for question correctness and values for selection
        if (submitted) {
            if (isSelected) {
                buttonClass += isCorrect ? ' correct' : ' incorrect';
            } else if (isCorrect) {
                buttonClass += ' correct';
            }
        } else if (isSelected) {
            buttonClass += ' selected';
        }

        return buttonClass;
    };

    return {
        getButtonClass,
    };
};