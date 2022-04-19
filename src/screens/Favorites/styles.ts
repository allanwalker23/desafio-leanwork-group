import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { Movie } from '../../utils/utils';
import { AntDesign } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    margin: 16px;

    flex-direction: row;
    justify-content: space-between;
`;
export const IconWithoutMovie = styled(MaterialIcons)``;

export const ButtonFavorites = styled(BorderlessButton)``;

export const ButtonDeleteAll = styled(BorderlessButton)``;
export const DeleteIcon = styled(AntDesign)`
    color: red;
`;

export const Options = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${RFValue(35)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const ListMoviesContainer = styled.View`
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

export const FlatListMovies = styled(
    FlatList as new () => FlatList<Movie>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 120
    }
})``;
