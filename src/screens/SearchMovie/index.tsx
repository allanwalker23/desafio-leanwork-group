import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ItemMovie } from '../../components/ItemMovie';
import { SearchBarForm } from '../../components/SearchBarForm';
import { useNavigation } from '../../hooks/useNavigation';
import { ActivityIndicator, Linking } from 'react-native';
import {
    Container,
    FlatListMovies,
    ListMoviesContainer,
    SearchBarContainer,
    LoadContainer,
    WhithoutMovieContent,
    TextNotMovie,
    IconWithoutMovie
} from './styles';
import { api } from '../../services/api';
import theme from '../../global/theme';
import { Item } from '../../utils/movies';
interface FormData {
    searchText: string;
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
            schedule: {
                time: string;
                days: string[];
            };
            officialSite: string;
            genres: string[];
        }
    ];
}

interface ResponseSearchPeopleTVMaze {
    data: [
        person: {
            id: number;
            name: string;
            birthday: string;
            image: {
                medium: string;
                original: string;
            };
            url: string;
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
        if (data.searchText === undefined || data.searchText === '') {
            setIsLoading(false);
            setIsMovieWithName(false);
            return;
        }

        try {
            setIsLoading(true);
            const responseMovie: ResponseSearchTVMaze = await api.get(
                `/search/shows?q=+${data.searchText}`
            );

            const responsePeople: ResponseSearchPeopleTVMaze = await api.get(
                `/search/people?q=+${data.searchText}`
            );
            const dataMovie = responseMovie.data;
            const dataPeople = responsePeople.data;

            const movies: Item[] = [];

            dataMovie.map(async (movie: any) => {
                console.log(movie);
                const newData: Item = {
                    id: String(movie.show.id),
                    title: movie.show.name,
                    description: movie.show.summary,
                    date: movie.show.premiered,
                    rating: movie.show.rating.average,
                    image_banner: movie.show.image.original,
                    image_poster: movie.show.image.original,

                    hour: movie.show.schedule.time,
                    days: movie.show.schedule.days,
                    url: movie.show.officialSite,
                    genres: movie.show.genres,
                    type: 'Movie'
                };
                movies.push(newData);
            });

            dataPeople.map(async (people: any) => {
                const newData: Movie = {
                    id: String(people.person.id),
                    title: people.person.name,
                    date: people.person.birthday,
                    image_banner: people.person.image.original,
                    image_poster: people.person.image.original,
                    url: people.person.url,
                    type: 'People'
                };
                movies.push(newData);
            });

            if (!movies[0]) {
                setIsMovieWithName(false);
                return;
            }

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

    function handleGoInfoMovie(movie: Item) {
        setData(movie);
        navigation.navigate('InfoMovie');
    }

    function handleGoInfoPeople(people: Item) {
        Linking.openURL(people.url);
    }

    return (
        <Container>
            <SearchBarContainer>
                <SearchBarForm
                    icon="search"
                    placeholder="Digite o nome do filme ou ator/atriz"
                    name="searchText"
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
                    <IconWithoutMovie
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
                                rating={item?.rating}
                                date={item.date}
                                onPress={() =>
                                    item.type === 'Movie'
                                        ? handleGoInfoMovie(item)
                                        : handleGoInfoPeople(item)
                                }
                            />
                        )}
                    />
                </ListMoviesContainer>
            )}
        </Container>
    );
}
