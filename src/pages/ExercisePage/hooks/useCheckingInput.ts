

export const useCheckAllInputsFilled = (answerValue: { [key: string]: string[] }) => {
    if (Object.keys(answerValue).length === 0) {
        return false;
    }
    return Object.values(answerValue).every(values => values.every(value => value.trim() !== ''));
};
