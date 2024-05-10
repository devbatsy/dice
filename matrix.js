const matrixCombination = [
    [
        [1,6,2,5],
        [3,6,4,5],
        [2,6,1,5],
        [4,6,3,5]
    ],
    [
        [1,4,2,3],
        [6,4,5,3],
        [2,4,1,3],
        [5,4,6,3]
    ],
    [
        [1,5,2,6],
        [4,5,3,6],
        [2,5,1,6],
        [3,5,4,6]
    ],
    [
        [1,3,2,4],
        [5,3,6,4],
        [2,3,1,4],
        [6,3,5,4]
    ]
]

export const result = (randCom) =>{
    const array1 = randCom.map(val =>{return val/90})
    return matrixCombination[array1[2]][array1[1]][array1[0]]
}