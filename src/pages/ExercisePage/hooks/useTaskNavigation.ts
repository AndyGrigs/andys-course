import { useState } from 'react';

export const useTaskNavigation = (totalTasks: number) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);


    const goToNextTask = () => {
        setCurrentTaskIndex(currentIndex => (currentIndex + 1) % totalTasks)
    }
    return { currentTaskIndex, goToNextTask };
}