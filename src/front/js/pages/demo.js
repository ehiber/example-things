import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { MediaCard } from "../component/Card";
import { Context } from "../store/appContext";
import dayjs from "dayjs";

// VARIAS CARDS ORDENADAS CRONOLOGICAMENTE
// BOTONES DE VER DETALLES, PLAY, Y BOTON DE EDITAR FECHA O ELIMINAR

export const Episodes = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getEpisodes();
  }, []);

  useEffect(() => {
    if (store.userEpisodes) {
      let episodes = store.userEpisodes.episodes.map(
        (episode) => episode.api_id
      );
      actions.getEpisodesApi(episodes);
    }
  }, [store.userEpisodes]);

  return (
    <>
      {store.userEpisodesApi ? (
        store.userEpisodesApi.map((episode) => {
          let episodeID = store.userEpisodes.episodes.filter(
            (userEpisode) => userEpisode.api_id == episode.id
          );
          return (
            <MediaCard
              episodeID={episodeID[0].id}
              image={episode.image}
              name={episode.name}
              schedule={dayjs(episodeID[0].date).$d.toString()}
              update={true}
              espisodeApiID={episodeID[0].api_id}
            />
          );
        })
      ) : (
        <CircularProgress />
      )}
      ;
    </>
  );
};
