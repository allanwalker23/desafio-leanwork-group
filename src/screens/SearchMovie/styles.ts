import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Item } from '../../utils/utils';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
`;

export const IconWithoutMovie = styled(MaterialIcons)``;

export const SearchBarContainer = styled.View``;

export const ListMoviesContainer = styled.View`
    align-items: center;
`;

export const FlatListMovies = styled(
    FlatList as new () => FlatList<Item>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 120
    }
})``;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const WhithoutMovieContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
export const TextNotMovie = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.title};
    margin-top: 7px;
    font-size: ${RFValue(24)}px;
`;
