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
    FavoriteButton,
    SelectorIcon,
    SeasonSelector,
    SelectorText,
    SeasonContainer,
    SeasonTitle,
    Item,
    ModalContainer,
    Label,
    LabelContainer
} from './styles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../global/theme';

import { useNavigation } from '../../hooks/useNavigation';

import * as Linking from 'expo-linking';
import { ScrollView } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, Modal } from 'react-native';
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
            season: string;
        }
    ];
}

export function InfoMovie() {
    const [episodesData, setEpisodesData] = useState<Episode[]>([]);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [seasons, setSeasons] = useState<any[]>([]);
    const [modalSeasonOpen, setModalSeasonOpen] = useState(false);

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

    function handleOpenSeasonModal() {
        setModalSeasonOpen(true);
    }

    function handleSelectSeason(season: number) {
        setSelectedSeason(season);
        const episodesFiltered = episodesData.filter(
            (episode) => episode.season === selectedSeason
        );
        setEpisodesData(episodesFiltered);
        setModalSeasonOpen(false);
    }

    const getEpisodes = useCallback(async () => {
        try {
            const response: ResponseEpisodeTvMaze = await api.get(
                `/shows/${data.id}/episodes`
            );
            const dataIMDB = response.data;

            const episodes: Episode[] = [];
            const seasonsArray: any[] = [];

            dataIMDB.map(async (movie) => {
                seasonsArray.push(movie.season);
                const newData: Episode = {
                    id: String(movie.id),
                    title: `${movie.number} - ${movie.name}`,
                    description: movie.summary,
                    date: movie.airdate,
                    rating: movie.rating.average,
                    season: Number(movie.season),
                    image_banner: movie.image.original,
                    image_poster: movie.image.original
                };
                episodes.push(newData);
            });

            const seasonsNotRepeat = [...new Set(seasonsArray)];

            const episodesFiltered = episodes.filter(
                (episode) => episode.season === selectedSeason
            );
            console.log(episodesFiltered);
            setEpisodesData(episodesFiltered);

            setSeasons(seasonsNotRepeat);
        } catch (error) {
            alert('Erro na aplicação');
            console.log(error);
        }
    }, [data.id, selectedSeason]);

    useFocusEffect(
        useCallback(() => {
            getEpisodes();
        }, [getEpisodes])
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
                        {data.days.length >= 1 && data.days.length < 5 && (
                            <ScheduleMovie>
                                Passa {data.days} {data.hour}
                            </ScheduleMovie>
                        )}
                        {data.days.length === 5 && (
                            <ScheduleMovie>
                                Durante a semana ás {data.hour}
                            </ScheduleMovie>
                        )}
                        {data.days.length === 7 && (
                            <ScheduleMovie>
                                Todos os dias da semana ás {data.hour}
                            </ScheduleMovie>
                        )}
                        {!data.hour && (
                            <ScheduleMovie>
                                Não tem horário de exibição
                            </ScheduleMovie>
                        )}

                        <Genres>
                            {data.genres.map((gender: any) => (
                                <Gender>
                                    <Dot />
                                    <GenderName>{gender}</GenderName>
                                </Gender>
                            ))}
                        </Genres>
                    </InfoMovieContainer>
                </Header>

                <DescriptionWrapper>
                    <TitleDescription>Resumo</TitleDescription>

                    <Description>{data.description}</Description>

                    {data.url && (
                        <OpenInWebSiteButton
                            rippleColor={theme.colors.primary}
                            onPress={handleGoPage}
                        >
                            <OpenInWebSiteText>
                                Abrir Site
                                <Ionicons
                                    name="open-outline"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </OpenInWebSiteText>
                        </OpenInWebSiteButton>
                    )}
                </DescriptionWrapper>

                <EpisodesWrapper>
                    <SeasonContainer>
                        <TitleDescription>Episódios</TitleDescription>
                        <SeasonSelector onPress={handleOpenSeasonModal}>
                            <SelectorText>
                                Temporada {selectedSeason}
                            </SelectorText>
                            <SelectorIcon
                                name="down"
                                color={theme.colors.primary}
                                size={24}
                            />
                        </SeasonSelector>
                    </SeasonContainer>

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
                        />
                    </ListEpisodesContainer>
                </EpisodesWrapper>
            </ScrollView>

            <Modal
                animationType="slide"
                visible={modalSeasonOpen}
                transparent
                onRequestClose={() => {}}
            >
                <ModalContainer>
                    <LabelContainer>
                        <Label>Selecione a Temporada</Label>
                    </LabelContainer>
                    <ScrollView>
                        {seasons.map((season) => (
                            <Item onPress={() => handleSelectSeason(season)}>
                                <SeasonTitle>Temporada {season}</SeasonTitle>
                                <SelectorIcon
                                    name="right"
                                    size={32}
                                    color={theme.colors.primary}
                                />
                            </Item>
                        ))}
                    </ScrollView>
                </ModalContainer>
            </Modal>
        </Container>
    );
}
