import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ItemMovie } from '../../components/ItemMovie';
import { useNavigation } from '../../hooks/useNavigation';
import { api } from '../../services/api';
import { Item } from '../../utils/utils';

import {
    Container,
    Header,
    Title,
    ButtonSearch,
    SearchIcon,
    ListMoviesContainer,
    FlatListMovies,
    LoadingListContainer,
    ButtonFavorites,
    LoveIcon,
    Options
} from './styles';

interface ResponseTVMaze {
    data: [
        {
            id: number;
            name: string;
            premiered: string;
            image: {
                medium: string;
                original: string;
            };
            rating: {
                average: number;
            };

            summary: string;
            schedule: {
                time: string;
                days: string[];
            };
            officialSite: string;
            genres: string[];
        }
    ];
}

export function Home({ navigation }: any) {
    const { setData } = useNavigation();
    const [moviesData, setMoviesData] = useState<Item[]>([]);
    const [page, setPage] = useState(2);

    function handleGoInfoMovie(movie: Item) {
        setData(movie);
        navigation.navigate('InfoMovie');
    }

    function handleGoSearch() {
        navigation.navigate('SearchMovie');
    }

    function handleGoFavorites() {
        navigation.navigate('Favorites');
    }

    async function loadData() {
        try {
            const response: ResponseTVMaze = await api.get(
                `/shows?page=${page}`
            );
            const dataIMDB = response.data;

            const movies: Item[] = [];

            dataIMDB.map(async (movie) => {
                const newData: Item = {
                    id: String(movie.id),
                    title: movie.name,
                    description: movie.summary,
                    date: movie.premiered,
                    rating: movie.rating.average,
                    image_banner: movie.image.original,
                    image_poster: movie.image.original,

                    hour: movie.schedule.time,
                    days: movie.schedule.days,
                    url: movie.officialSite,
                    genres: movie.genres,
                    type: 'Movie'
                };
                movies.push(newData);
            });
            setMoviesData(movies);
            setPage(page + 1);
        } catch (error) {
            alert('Erro na aplica????o');
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <Container>
            <Header>
                <Title>Em Alta????</Title>
                <Options>
                    <ButtonFavorites onPress={handleGoFavorites}>
                        <LoveIcon name="favorite" size={40} />
                    </ButtonFavorites>
                    <ButtonSearch onPress={handleGoSearch}>
                        <SearchIcon name="search" />
                    </ButtonSearch>
                </Options>
            </Header>

            <ListMoviesContainer>
                <FlatListMovies
                    data={moviesData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ItemMovie
                            title={item.title}
                            image={item.image_poster}
                            date={item.date}
                            rating={item.rating}
                            onPress={() => handleGoInfoMovie(item)}
                        />
                    )}
                    onEndReached={loadData}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => (
                        <LoadingListContainer>
                            <ActivityIndicator />
                        </LoadingListContainer>
                    )}
                />
            </ListMoviesContainer>
        </Container>
    );
}
