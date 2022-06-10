import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { MediaCard } from "../component/Card";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isReady, setIsReady] = useState(false);

  const handlePagination = (page) => {
    actions.getData("character", page);
  };

  useEffect(() => {
    if (store.character) {
      setIsReady(true);
    }
  }, [isReady, store.character]);

  // CREAR BOTON DE AGENDAR PARA SELECCIONAR LA FECHA
  // CREAR VISTA DONDE MUESTRE TODOS MIS EPISODIOS AGENDADOS QUE PODAMOS MODIFICAR Y ELIMINAR

  return (
    <>
      {isReady && store.episode ? (
        store.episode.results.map((episode) => {
          return (
            <MediaCard
              espisodeApiID={episode.id}
              image={episode.image}
              name={episode.name}
            />
          );
        })
      ) : (
        <CircularProgress />
      )}
      {store.episode && (
        <Stack spacing={2}>
          <Pagination
            onChange={(e, page) => handlePagination(page)}
            count={store.episode.info.pages}
            color="secondary"
          />
        </Stack>
      )}
      ;
    </>
  );
};
