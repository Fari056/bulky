import React, { useState } from 'react'

export const useRequest = () => {
    const [selectedBed, setSelectedBed,] = useState(null);
    const [numBoxes, setNumBoxes] = useState(null);
    const [isBoxesOversized, setIsBoxesOversized] = useState(null);

    return {
        selectedBed, setSelectedBed,
        numBoxes, setNumBoxes,
        isBoxesOversized, setIsBoxesOversized
    }
}