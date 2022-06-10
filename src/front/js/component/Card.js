import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Context } from "../store/appContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function MediaCard({
  image,
  name,
  episodeID,
  schedule,
  update,
  espisodeApiID,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const { actions } = React.useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = () => {
    let data = {
      new_date: value.toISOString(),
    };
    actions.changeScheduleEpisode(episodeID, data);
    handleClose();
  };
  const handleCreate = () => {
    let data = {
      date: value.toISOString(),
      api_id: espisodeApiID,
    };
    actions.createScheduleEpisode(data);
    handleClose();
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {schedule && (
          <Typography gutterBottom variant="h5" component="div">
            {schedule}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>
          Agendar
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
              <Button
                size="small"
                onClick={update ? handleUpdate : handleCreate}
              >
                {update ? "Actualizar" : "Crear"}
              </Button>
            </Box>
          </Fade>
        </Modal>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
