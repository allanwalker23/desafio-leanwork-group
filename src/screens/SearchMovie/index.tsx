import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { ItemMovie } from '../../components/ItemMovie';
import { SearchBarForm } from '../../components/SearchBarForm';
import { useNavigation } from '../../hooks/useNavigation';
import { Movie } from '../../utils/movies';
import { ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Container,
    FlatListMovies,
    ListMoviesContainer,
    SearchBarContainer,
    LoadContainer,
    WhithoutMovieContent,
    TextNotMovie
} from './styles';
import { api } from '../../services/api';
import theme from '../../global/theme';
interface FormData {
    searchMovie: string;
}

interface ResponseSearchTVMaze {
    data: [
        show: {
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
        }
    ];
}

export function SearchMovie({ navigation }: any) {
    const { control, handleSubmit } = useForm({});
    const { setData } = useNavigation();
    const [moviesData, setMoviesData] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMovieWithName, setIsMovieWithName] = useState(false);

    async function handleSearch(data: FormData) {
        if (data.searchMovie === undefined || data.searchMovie === '') {
            setIsLoading(false);
            setIsMovieWithName(false);
            return;
        }

        try {
            setIsLoading(true);
            const response: ResponseSearchTVMaze = await api.get(
                `/search/shows?q=+${data.searchMovie}`
            );
            const dataIMDB = response.data;
            if (!dataIMDB[0].show) {
                setIsMovieWithName(false);
                return;
            }

            const movies: Movie[] = [];

            dataIMDB.map(async (movie: any) => {
                console.log(movie);
                const newData: Movie = {
                    id: String(movie.show.id),
                    title: movie.show.name,
                    description: movie.show.summary,
                    date: movie.show.premiered,
                    rating: movie.show.rating.average,
                    image_banner: movie.show.image.original,
                    image_poster: movie.show.image.original,
                    url: 'httpr'
                };
                movies.push(newData);
            });

            setMoviesData(movies);

            setIsLoading(false);
            setIsMovieWithName(true);
        } catch (err) {
            setIsMovieWithName(false);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    function handleGoInfoMovie(movie: Movie) {
        setData(movie);
        navigation.navigate('InfoMovie');
    }

    return (
        <Container>
            <SearchBarContainer>
                <SearchBarForm
                    icon="search"
                    placeholder="Digite o nome do filme ou ator/atriz"
                    name="searchMovie"
                    control={control}
                    maxLength={27}
                    blurOnSubmit
                    onBlur={handleSubmit(handleSearch)}
                />
            </SearchBarContainer>
            {isLoading ? (
                <LoadContainer>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                    />
                </LoadContainer>
            ) : isMovieWithName === false ? (
                <WhithoutMovieContent>
                    <MaterialIcons
                        name="movie"
                        size={45}
                        color={theme.colors.primary}
                    />
                    <TextNotMovie>Não há filmes ou ator/atriz</TextNotMovie>
                </WhithoutMovieContent>
            ) : (
                <ListMoviesContainer>
                    <FlatListMovies
                        data={moviesData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ItemMovie
                                title={item.title}
                                image={item.image_banner}
                                rating={item.rating}
                                date={item.date}
                                onPress={() => handleGoInfoMovie(item)}
                            />
                        )}
                    />
                </ListMoviesContainer>
            )}
        </Container>
    );
}
