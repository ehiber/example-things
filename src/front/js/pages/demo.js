import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

// VARIAS CARDS ORDENADAS CRONOLOGICAMENTE
// BOTONES DE VER DETALLES, PLAY, Y BOTON DE EDITAR FECHA O ELIMINAR

export const Episodes = () => {
  const { store, actions } = useContext(Context);

  return <div className="container"></div>;
};
