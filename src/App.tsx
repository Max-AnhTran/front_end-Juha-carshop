
import CarList from "./components/CarList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Carshop
                    </Typography>
                </Toolbar>
            </AppBar>
            <CarList />
        </>
    );
}

export default App;
