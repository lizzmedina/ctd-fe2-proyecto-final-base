import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {CardNews} from "./CardNews";
import { getNewList } from "./NewsSlice";
import { NewsContainer, NewsList, NewsTitle } from "./styled";
import { INews } from "./fakeRest";

export const News = () => {
  
  const dispatch = useAppDispatch();
  const { newList } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewList());
  }, [dispatch]);

  return (
    <NewsContainer>
      <NewsTitle>Noticias de los Simpsons</NewsTitle>
      <NewsList>
        {newList?.map((news: INews) => (
          <CardNews key={`key_news_${news.id}`} news={news} />
        ))}
      </NewsList>
    </NewsContainer>
  );
};
// Aplicación de los principios SOLID / Explicación:
// estos principios pueden verse aplicados en los componentes nuevos: CardNews, NewsModal, NewsSlice y SuscribeButton, de la siguiente manera:

// En CardNews, se encapsula la información de la tarjeta de noticias de manera clara y legible,
// siguiendo el principio de Responsabilidad Única (SRP) al separar la presentación de los datos.
// Además, se usa el principio de Abierto/Cerrado (OCP) al adaptar el comportamiento mediante props,
// permitiendo su reutilización y extensión sin modificar su código interno.
// En NewsModal, se maneja la lógica para mostrar el modal de noticias dependiendo de si el usuario
// está suscrito o no a la noticia, lo que ejemplifica el principio de SRP al tener una única
// responsabilidad: mostrar el contenido del modal basado en una condición.

// En SuscribeButton, se implementa un botón de suscripción que muestra la interacción con la acción de
// suscripción, siguiendo el principio de SRP al tener una responsabilidad única y específica: gestionar
// la suscripción del usuario y mostrar el botón solo si no está suscrito.

// En NewsSlice, se maneja la lógica de manejo del estado de las noticias, agregando suscripciones,
// limpiando la lista, y obteniendo la lista de noticias, lo que sigue el principio de SRP al tener
// una única responsabilidad en el manejo del estado específico de las noticias.
// También utiliza el principio de Sustitución de Liskov (LSP) al permitir que cada acción sea
// intercambiable sin afectar otras partes del sistema.
// Además, sigue el principio de Segregación de Interfaces (ISP) al separar la lógica del manejo de
// estado de las noticias de otros componentes, manteniendo la cohesión y evitando dependencias innecesarias.
// Las acciones `addSubscription` y `cleanList` permiten agregar suscripciones y limpiar la lista, respectivamente.
// `getNewList` obtiene la lista de noticias.

// El resto de los componentes, se encargan de la presentaciónvisual y la organización de los elementos en
// la interfaz de usuario, manteniendo así una separación clara entre la lógica de presentación y la lógica de negocio,
//  lo que sigue el principio de SRP.