import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
export default function SnackbarMessage({
  hideduration,
  severity,
  variant,
  openstatus,
  display_message,
}) {
  const [open, setOpen] = useState(openstatus);
  const handleClose = () => setOpen(false);
  const handleSnackbar = () => setOpen(true);
// console.log(openstatus)

  useEffect(() => {
    setOpen(openstatus);
    console.log("you clicked!")
  }, [openstatus]);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={hideduration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={severity}
          variant={variant}
          sx={{
            width: 450,
            borderRadius: 3,
            fontSize: "15px",
            fontWeight: 600,
            py: 1,
            px: 2,
          }}
        >
          {display_message}
        </Alert>
      </Snackbar>
    </div>
  );
}
