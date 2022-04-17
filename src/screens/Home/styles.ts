import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { Movie } from '../../utils/movies';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    margin: 16px;

    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${RFValue(35)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const ButtonSearch = styled(RectButton)``;

export const Options = styled.View`
    flex-direction: row;
`;

export const SearchIcon = styled(FontAwesome)`
    font-size: ${RFValue(24)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const ListMoviesContainer = styled.View`
    align-items: center;
`;

export const LoadingListContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const FlatListMovies = styled(
    FlatList as new () => FlatList<Movie>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 120
    }
})``;

export const ButtonFavorites = styled(BorderlessButton)``;

export const LoveIcon = styled(MaterialIcons)`
    color: red;
    margin-right: 16px;
`;
