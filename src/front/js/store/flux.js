const getState = ({ getStore, getActions, setStore }) => {
  const API_URL_BASE = "https://rickandmortyapi.com/api";
  const BACKEND_URL = process.env.BACKEND_URL;
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      resultsBase: {},
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demolete: demo });
      },
      // FETCH A LA API URL BASE
      getData: async (type, page = 1) => {
        try {
          const response = await fetch(`${API_URL_BASE}/${type}/?page=${page}`);
          let data = await response.json();
          setStore({ [type]: data });
        } catch (error) {
          console.log(error);
        }
      },
      getEpisodes: async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/schedule-episode`);
          let data = await response.json();
          setStore({ userEpisodes: data });
        } catch (error) {
          console.log(error);
        }
      },
      getEpisodesApi: async (episodes) => {
        try {
          const response = await fetch(`${API_URL_BASE}/episode/${episodes}`);
          let data = await response.json();
          setStore({ userEpisodesApi: data });
        } catch (error) {
          console.log(error);
        }
      },
      changeScheduleEpisode: async (id, data) => {
        try {
          const response = await fetch(
            `${BACKEND_URL}/api/schedule-episode/${id}`,
            {
              headers: {
                // "Authorization": `Bareer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
              },
              method: "PUT",
              body: JSON.stringify(data),
            }
          );
          if (response.ok) {
            getActions().getEpisodes();
          }
        } catch (error) {
          console.log(error);
        }
      },
      createScheduleEpisode: async (data) => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/schedule-episode/`, {
            headers: {
              // "Authorization": `Bareer ${localStorage.getItem('token')}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          });
          if (response.ok) {
            getActions().getEpisodes();
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
