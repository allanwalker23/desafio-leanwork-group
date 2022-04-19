import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import theme from '../../global/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    ButtonDeleteAll,
    Container,
    DeleteIcon,
    FlatListMovies,
    Header,
    IconWithoutMovie,
    ListMoviesContainer,
    Options,
    TextNotMovie,
    Title,
    WhithoutMovieContent
} from './styles';
import { useNavigation } from '../../hooks/useNavigation';

import { Item } from '../../utils/utils';
import { ItemMovie } from '../../components/ItemMovie';

export function Favorites({ navigation }: any) {
    const [moviesFavoritesData, setMoviesFavoritesData] = useState<Item[]>([]);
    const { setData } = useNavigation();

    async function getMoviesFavorites() {
        try {
            const get = await AsyncStorage.getItem('@movies_favorites');
            const currentData = get ? JSON.parse(get) : [];

            setMoviesFavoritesData(currentData);
        } catch (e) {
            console.log(e);
            alert('Erro na adição');
        }
    }

    function handleGoInfoMovie(movie: Item) {
        setData(movie);
        navigation.navigate('InfoMovie');
    }

    async function handleDeleteAll() {
        setMoviesFavoritesData([]);
        await AsyncStorage.clear();
    }

    async function handleRemoveItem(item: Item): any {
        try {
            const moviesWithoutExcluded = moviesFavoritesData.filter(
                (movie) => movie.id !== item.id
            );
            await AsyncStorage.setItem(
                '@movies_favorites',
                JSON.stringify(moviesWithoutExcluded)
            );
            setMoviesFavoritesData(moviesWithoutExcluded);
            alert(`${item.title} removido com sucesso`);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    useFocusEffect(
        useCallback(() => {
            getMoviesFavorites();
        }, [])
    );

    return (
        <Container>
            <Header>
                <Title>Favoritos 💛</Title>
                <Options>
                    <ButtonDeleteAll onPress={handleDeleteAll}>
                        <DeleteIcon name="delete" size={40} />
                    </ButtonDeleteAll>
                </Options>
            </Header>

            {!moviesFavoritesData[0] ? (
                <WhithoutMovieContent>
                    <IconWithoutMovie
                        name="movie"
                        size={45}
                        color={theme.colors.primary}
                    />
                    <TextNotMovie>Não há filmes favoritos</TextNotMovie>
                </WhithoutMovieContent>
            ) : (
                <ListMoviesContainer>
                    <FlatListMovies
                        data={moviesFavoritesData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ItemMovie
                                title={item.title}
                                image={item.image_poster}
                                date={item.date}
                                rating={item.rating}
                                onPress={() => handleGoInfoMovie(item)}
                                isExcludable
                                onPressExclude={() => handleRemoveItem(item)}
                            />
                        )}
                    />
                </ListMoviesContainer>
            )}
        </Container>
    );
}
