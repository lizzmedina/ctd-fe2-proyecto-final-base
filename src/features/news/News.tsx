import React, { useEffect } from "react";
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
          <CardNews key={`key_notice_${news.id}`} news={news} />
        ))}
      </NewsList>
    </NewsContainer>
  );
};
