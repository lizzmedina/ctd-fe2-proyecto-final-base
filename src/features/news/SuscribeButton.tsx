import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addSubscription } from "./NewsSlice";
import { INews } from "./fakeRest";
import { ButtonSuscribe } from "./styled";

export const SuscribeButton: FC<{ news: INews }> = ({ news }) => {
    
    const dispatch = useAppDispatch();
    const { suscripIdList } = useAppSelector(({ news }) => news);

    const onClickSubscribe = () => {
        dispatch(addSubscription(news.id));
        setTimeout(() => {
            alert("Felicitaciones, te has suscrito con exito");
        }, 1000);
    };

    return (
        <>
        {!suscripIdList.some((id) => id === news.id) && (
            <ButtonSuscribe aria-label="suscribe-button" onClick={onClickSubscribe}>
                Suscríbete
            </ButtonSuscribe>
        )}
        </>
    );
};