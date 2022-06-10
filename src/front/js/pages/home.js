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
      {isReady && store.character ? (
        store.character.results.map((character) => {
          return <MediaCard image={character.image} name={character.name} />;
        })
      ) : (
        <CircularProgress />
      )}
      {store.character && (
        <Stack spacing={2}>
          <Pagination
            onChange={(e, page) => handlePagination(page)}
            count={store.character.info.pages}
            color="secondary"
          />
        </Stack>
      )}
      ;
    </>
  );
};
