import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import { useStateValue, setUser } from '../state';
import useRepositories from '../hooks/useRepositories';
import useGetUser from '../hooks/useGetUser';
import RepoSorting from './RepoSorting';
import genUniqueId from '../utils/genUniqueId';

const styles = StyleSheet.create({
    seperator: {
        height: 20
    },
    container: {
        flex: 1,
        position: 'relative',
        zIndex: 1,
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
    },
    searchBar: {
        marginBottom: 10,
    },
    listHeader: {
        paddingBottom: 15,
        margin: 15
    }

});

const ItemSeperator = () => <View style={styles.seperator} />;

export class RepositoryListContainer extends React.Component {

    renderHeader = ({ handleSort, label, onChangeSearch, searchQuery }) => {

        return (
            <View style={styles.listHeader}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                <RepoSorting handleSort={handleSort} label={label} />
            </View>
        );

    };

    render() {
        const { repositories, handleSort, label, onChangeSearch, searchQuery, onEndReach } = this.props;
        const genId = genUniqueId();

        const repositoryNodes = repositories
            ? repositories.edges.map((edge) => edge.node)
            : [];

        return (
            <FlatList
                data={repositoryNodes}
                ListHeaderComponent={this.renderHeader({ handleSort, label, onChangeSearch, searchQuery })}
                ItemSeparatorComponent={ItemSeperator}
                renderItem={({ item }) =>
                    <Link to={`/${item.id}`}>
                        <RepositoryItem item={item} />
                    </Link>
                }
                keyExtractor={item => `${genId.next().value}${item.id}`}
                style={styles.container}
                testID="repoList"
                onEndReached={onEndReach}
                onEndReachedThreshold={0.7}
            />
        );
    }
}

const RepositoryList = () => {
    const [filter, setFilter] = useState({ order: 'CREATED_AT', direction: 'DESC' });
    const [searchQuery, setSearchQuery] = React.useState('');
    const [value] = useDebounce(searchQuery, 500);

    const onChangeSearch = query => setSearchQuery(query);
    const { repositories, fetchMore } = useRepositories({ ...filter, search: value, first: 8 });
    const [, dispatch] = useStateValue();
    const { user } = useGetUser();

    const handleSort = (value) => {

        setFilter({ ...filter, ...value });
    };

    const onEndReach = () => {
        fetchMore();
    };

    useEffect(() => {
        dispatch(setUser(user));
    }, [user]);

    return (
        <RepositoryListContainer
            repositories={repositories}
            handleSort={handleSort}
            onChangeSearch={onChangeSearch}
            searchQuery={searchQuery}
            label={filter}
            onEndReach={onEndReach}
        />
    );
};

export default RepositoryList;
