
import _ from 'lodash';

const findAndUpdate = (listData, payload) => {
    const newListData = [...listData];
    const indexOfData = _.indexOf(newListData, { id: payload.id });
    newListData.splice(indexOfData, 1, payload);

    return newListData;
};

export {
    findAndUpdate
};