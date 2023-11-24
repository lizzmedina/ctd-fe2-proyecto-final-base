import { FC } from "react";
import {NewsModal} from "../news/NewsModal ";
import { FirtsLetterOfTextInUppercase, INews } from "./fakeRest";
import {useToggle} from "../../hooks/useToggle";
import {  ReadButton,  CardNew,  DescriptionCardNews,  ImageCardNews,  DateCardNews,  TitleCardNews,} from "./styled";

interface IProps {
    news: INews;
}

export const CardNews: FC<IProps> = ({ news }) => {

    const { isOpen, toggle } = useToggle();
    const { tittle, description, date, image } = news;
    const tittleUppercase = FirtsLetterOfTextInUppercase(tittle);
    const shortDescrption = description.substring(0, 100);

    return (
        <>
        <CardNew>
            <ImageCardNews src={image} />
            <TitleCardNews aria-label="modal-title">
                {tittleUppercase}
            </TitleCardNews>
            <DateCardNews>Hace {date} minutos</DateCardNews>
            <DescriptionCardNews aria-label="description">
                {shortDescrption}
            </DescriptionCardNews>
            <ReadButton aria-label="read-more" onClick={() => toggle()}>
                Ver más
            </ReadButton>
        </CardNew>
        {isOpen && <NewsModal news={news} toggle={toggle} />}
        </>
    );
};