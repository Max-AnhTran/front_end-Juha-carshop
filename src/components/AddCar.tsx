import { Fragment, useState, ChangeEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCar(props: any) {
    const [open, setOpen] = useState(false);

    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: 0,
        price: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const addCar = () => {
        props.saveCar(car);
        handleClose();
        setCar({ brand: "", model: "", color: "", fuel: "", modelYear: 0, price: 0 });
    };

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New Car
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: "form",
                        onSubmit: (event: FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                (formData as any).entries()
                            );
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="brand"
                        label="Brand"
                        type="text"
                        value={car.brand}
                        onChange={(e) => handleInputChange(e as any)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        label="Model"
                        type="text"
                        value={car.model}
                        onChange={(e) => handleInputChange(e as any)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        label="Color"
                        type="text"
                        value={car.color}
                        onChange={(e) => handleInputChange(e as any)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        label="Fuel"
                        type="text"
                        value={car.fuel}
                        onChange={(e) => handleInputChange(e as any)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="modelYear"
                        label="Model Year"
                        type="number"
                        value={car.modelYear}
                        onChange={(e) => handleInputChange(e as any)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        value={car.price}
                        onChange={(e) => handleInputChange(e as any)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
