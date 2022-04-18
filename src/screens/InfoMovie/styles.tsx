import { FlatList } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Episode, Movie } from '../../utils/movies';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const FavoriteButton = styled(BorderlessButton)``;

export const LoveIcon = styled(MaterialIcons)`
    color: red;
    margin-right: 16px;
`;

export const SelectorIcon = styled(AntDesign)`
    /* color:${({ theme }) => theme.colors.primary}; */
`;

export const SelectorText = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.primary};
`;

export const SeasonSelector = styled(BorderlessButton)`
    flex-direction: row;
    align-items: center;
`;

export const SeasonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const FavoriteContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ImageBackground = styled.ImageBackground.attrs({
    imageStyle: { borderRadius: 7 }
})`
    height: 100%;
`;

export const ImageMovie = styled.ImageBackground.attrs({})`
    height: 100%;
`;

export const Header = styled.View``;

export const BackgroundContent = styled.View`
    width: 100%;
    height: ${RFValue(234)}px;
    margin-bottom: 16px;
`;

export const ImageMovieContent = styled(BorderlessButton)`
    width: 100px;
    height: 150px;
    position: absolute;
    margin: 16px;
    margin-top: 150px;
`;

export const TitleMovie = styled.Text`
    font-size: ${RFValue(36)}px;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 130px;
    width: 190px;
`;

export const Dot = styled.View`
    width: 4px;
    height: 4px;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.primary};
    margin: 8px;
`;

export const Gender = styled.View`
    flex-direction: row;
`;

export const LabelContainer = styled.View`
    align-items: center;
    margin: 16px;
`;
export const Label = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.shape};
`;

export const Item = styled(BorderlessButton)`
    margin: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const SeasonTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.shape};
`;

export const Genres = styled.View`
    flex-direction: row;
    align-items: flex-end;
    margin-left: 130px;
    width: 100px;
`;

export const EpisodesWrapper = styled.View`
    margin: 16px;
`;

export const GenderName = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
`;

export const ScheduleMovie = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.shape};
    margin-left: 130px;
`;

export const InfoMovieContainer = styled.View`
    flex-direction: column;
`;
export const TitleDescription = styled.Text`
    font-size: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.shape};
`;

export const DescriptionWrapper = styled.View`
    margin: 16px;
    margin-top: -20px;
`;

export const Description = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
`;

export const OpenInWebSiteText = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.shape};
`;

export const OpenInWebSiteButton = styled(RectButton)`
    align-items: center;
    justify-content: center;
    margin-top: 16px;
`;

export const ListEpisodesContainer = styled.View`
    align-items: center;
`;

export const LoadingListContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const FlatListEpisodes = styled(
    FlatList as new () => FlatList<Episode>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 120
    }
})``;

export const ModalContainer = styled.View`
    flex: 1;
   
    margin-top:450px
    background-color: ${({ theme }) => theme.colors.background};
    
`;
