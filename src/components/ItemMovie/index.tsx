import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
    Container,
    ContentViewMovie,
    DateMovie,
    ImageBackground,
    InfoMovie,
    TitleMovie,
    RatingMovie,
    ButtonDeleteAll,
    DeleteIcon
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../global/theme';
import { Item } from '../../utils/utils';

export interface ItemMovieProps extends RectButtonProps {
    title: string;
    image: string;
    date: string;
    rating: number;
    isExcludable?: boolean;
    onPressExclude?(item: Item): () => any;
}

export function ItemMovie({
    title,
    image,
    date,
    rating,
    isExcludable = false,
    onPressExclude,
    ...rest
}: ItemMovieProps) {
    return (
        <Container {...rest}>
            <>
                <ImageBackground source={{ uri: image }}>
                    <ContentViewMovie
                        style={{ marginTop: isExcludable ? 190 : 205 }}
                    >
                        <TitleMovie>{title}</TitleMovie>
                        <InfoMovie>
                            <DateMovie>{date}</DateMovie>
                            {rating && !isExcludable && (
                                <RatingMovie>
                                    {rating}
                                    <AntDesign
                                        name="star"
                                        size={14}
                                        color={theme.colors.primary}
                                    />
                                </RatingMovie>
                            )}
                            {isExcludable && (
                                <ButtonDeleteAll
                                    onPress={() => onPressExclude()}
                                >
                                    <DeleteIcon
                                        name="delete"
                                        size={30}
                                        color={theme.colors.primary}
                                    />
                                </ButtonDeleteAll>
                            )}
                        </InfoMovie>
                    </ContentViewMovie>
                </ImageBackground>
            </>
        </Container>
    );
}
