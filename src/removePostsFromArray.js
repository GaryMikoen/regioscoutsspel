module.exports = {
    removePostsFromArray: (array) => {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (!array[i].teamName.includes('post')) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    },
    removeTeamsFromArray: (array) => {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].teamName.includes('post')) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }
}