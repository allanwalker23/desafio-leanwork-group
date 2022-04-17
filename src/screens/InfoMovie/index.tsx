import React, { useCallback, useState } from 'react';
import {
    Container,
    Header,
    BackgroundContent,
    ImageBackground,
    ImageMovieContent,
    ImageMovie,
    DescriptionWrapper,
    TitleMovie,
    TitleDescription,
    Description,
    InfoMovieContainer,
    OpenInWebSiteText,
    OpenInWebSiteButton,
    EpisodesWrapper,
    ScheduleMovie,
    Dot,
    Gender,
    GenderName,
    Genres,
    FlatListEpisodes,
    ListEpisodesContainer,
    LoadingListContainer,
    LoveIcon,
    FavoriteContainer,
    FavoriteButton
} from './styles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../global/theme';

import { useNavigation } from '../../hooks/useNavigation';

import * as Linking from 'expo-linking';
import { ScrollView } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { Movie } from '../../utils/movies';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Alert, View } from 'react-native';
import { ItemMovie } from '../../components/ItemMovie';

interface ResponseEpisodeTvMaze {
    data: [
        {
            id: number;
            name: string;
            number: number;
            airdate: string;
            image: {
                medium: string;
                original: string;
            };
            rating: {
                average: number;
            };

            summary: string;
        }
    ];
}

export function InfoMovie() {
    const [episodesData, setEpisodesData] = useState<Movie[]>([]);

    const { data } = useNavigation();

    function handleGoPage() {
        Linking.openURL(data.url);
    }

    function handleResumeEpisode(resume: string) {
        Alert.alert('Resumo', resume, [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);
    }

    function addFavorite() {
        alert(`${data.title} Adicionado como favorito`);
    }

    async function getEpisodes() {
        try {
            const response: ResponseEpisodeTvMaze = await api.get(
                `/shows/${data.id}/episodes`
            );
            const dataIMDB = response.data;

            const episodes: Movie[] = [];

            dataIMDB.map(async (movie) => {
                const newData: Movie = {
                    id: String(movie.id),
                    title: `${movie.number} - ${movie.name}`,
                    description: movie.summary,
                    date: movie.airdate,
                    rating: movie.rating.average,
                    image_banner: movie.image.original,
                    image_poster: movie.image.original,
                    url: 'httpr'
                };
                episodes.push(newData);
            });
            setEpisodesData(episodes);
            console.log(episodes);
        } catch (error) {
            alert('Erro na aplicação');
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getEpisodes();
        }, [])
    );

    return (
        <Container>
            <ScrollView>
                <Header>
                    <BackgroundContent>
                        <ImageBackground
                            source={{
                                uri: data.image_banner
                            }}
                        />
                    </BackgroundContent>

                    <ImageMovieContent>
                        <ImageMovie
                            source={{
                                uri: data.image_poster
                            }}
                        />
                    </ImageMovieContent>

                    <InfoMovieContainer>
                        <FavoriteContainer>
                            <TitleMovie>{data.title}</TitleMovie>
                            <FavoriteButton onPress={addFavorite}>
                                <LoveIcon name="favorite" size={40} />
                            </FavoriteButton>
                        </FavoriteContainer>
                        <ScheduleMovie>Toda Quinta ás 20:00</ScheduleMovie>
                        <Genres>
                            <Gender>
                                <Dot />
                                <GenderName>Drama</GenderName>
                            </Gender>

                            <Gender>
                                <Dot />
                                <GenderName>Terror</GenderName>
                            </Gender>

                            <Gender>
                                <Dot />
                                <GenderName>Suspense</GenderName>
                            </Gender>
                        </Genres>
                    </InfoMovieContainer>
                </Header>

                <DescriptionWrapper>
                    <TitleDescription>Resumo</TitleDescription>

                    <Description>{data.description}</Description>

                    {/* <OpenInWebSiteButton
                        rippleColor={theme.colors.primary}
                        onPress={handleGoPage}
                    >
                        <OpenInWebSiteText>
                            Abrir no TheMovieBD
                            <Ionicons
                                name="open-outline"
                                size={24}
                                color={theme.colors.shape}
                            />
                        </OpenInWebSiteText>
                    </OpenInWebSiteButton> */}
                </DescriptionWrapper>

                <EpisodesWrapper>
                    <TitleDescription>Episódios</TitleDescription>
                    <ListEpisodesContainer>
                        <FlatListEpisodes
                            data={episodesData}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <ItemMovie
                                    title={item.title}
                                    image={item.image_poster}
                                    date={item.date}
                                    rating={item.rating}
                                    onPress={() =>
                                        handleResumeEpisode(item.description)
                                    }
                                />
                            )}
                            onEndReached={getEpisodes}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={() => (
                                <LoadingListContainer>
                                    <ActivityIndicator />
                                </LoadingListContainer>
                            )}
                        />
                    </ListEpisodesContainer>
                </EpisodesWrapper>
            </ScrollView>
        </Container>
    );
}
