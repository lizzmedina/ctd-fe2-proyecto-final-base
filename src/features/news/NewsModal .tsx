import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import {   ModalCard,  ModalContainer,  TextContainer,  ModalDescription,  ModalImage,  ModalTittle,  CloseButton,} from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { INews } from "./fakeRest";
import {SuscribeButton} from "./SuscribeButton";

interface IProps {
    news: INews;
    toggle: () => void;
}

export const NewsModal: FC<IProps> = ({ news, toggle }) => {
    
    const { suscripIdList } = useAppSelector((state) => state.news);

    const esPremium = suscripIdList.some((id : number) => id === news.id);

    const modalData = {
        title: "Suscríbete",
        image: SuscribeImage,
        description:
        "Una suscripción que te brindará acceso a contenido adicional, acceso anticipado a nuevas actualizaciones, descuentos exclusivos, regalos y bonificaciones especiales, y un soporte exclusivo para mejorar tu experiencia de juego. ¡Disfruta de una experiencia de juego más completa y emocionante con una suscripción.",
    };

    const { tittle, image, description } = news;

    const src = esPremium ? image : modalData.image;
    const alt = esPremium ? "news-image" : "mr-burns-excelent";
    const title = esPremium ? tittle : modalData.title;
    const descriptionModal = esPremium ? description : modalData.description;

    return (
        <ModalContainer>
            <ModalCard>
                <CloseButton aria-label="close-modal" onClick={toggle}>
                    <img src={Close} alt="close-button" />
                </CloseButton>
                <ModalImage src={src} alt={alt} />
                <TextContainer>
                    <ModalTittle>{title}</ModalTittle>
                    <ModalDescription>{descriptionModal}</ModalDescription>
                    <SuscribeButton news={news} />
                </TextContainer>
            </ModalCard>
        </ModalContainer>
    );
};