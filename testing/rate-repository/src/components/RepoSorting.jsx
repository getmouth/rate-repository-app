import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

const RepoSorting = ({ handleSort, label }) => {

    return (
        <RNPickerSelect
            onValueChange={handleSort}
            value={label}
            items={[
                {
                    label: 'Latest repositories',
                    value: {
                        order: 'CREATED_AT',
                        direction: 'DESC',
                    }
                },
                {
                    label: 'Highest rated repositories',
                    value: {
                        order: 'RATING_AVERAGE',
                        direction: 'DESC',
                    }
                },
                {
                    label: 'Lowest rated repositories',
                    value: {
                        order: 'RATING_AVERAGE',
                        direction: 'ASC',
                    }
                },
            ]}
        />
    );
};

export default RepoSorting;