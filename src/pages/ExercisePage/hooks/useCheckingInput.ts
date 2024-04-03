

export const useCheckAllInputsFilled = (answerValue: { [key: string]: string[] }) => {
    if (Object.keys(answerValue).length === 0) {
        return false;
    }
    const res = Object.values(answerValue).every(values => values.every(value => value.trim() !== ''));
    console.log(res)
    return res
};
