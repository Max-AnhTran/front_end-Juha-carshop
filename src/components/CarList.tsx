import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    AllCommunityModule,
    ICellRendererParams,
    ModuleRegistry,
    themeMaterial,
} from "ag-grid-community";
import { ColDef } from "ag-grid-community";

import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { Button, Snackbar } from "@mui/material";

type Car = {
    id: number;
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
};

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [open, setOpen] = useState(false);

    const fetchData = () => {
        fetch(import.meta.env.VITE_API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setCars(data._embedded.cars))
            .catch((error) => console.error("Error fetching cars:", error));
    };

    useEffect(fetchData, []);

    const resetData = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/reset", {
            method: "POST",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((text) => {
                if (text === "DB reset done") {
                    fetchData();
                } else {
                    throw new Error("Unexpected response text");
                }
            })
            .catch((error) => console.error("Error resetting cars:", error));
    };

    const deleteCar = (link: string) => {
        console.log("Delete clicked for:", link);
        if (window.confirm("Are you sure you want to delete this car?")) {
            fetch(link, { method: "DELETE" })
                .then(() => fetchData())
                .then(() => setOpen(true))
                .catch((error) => console.error("Error deleting car:", error));
        }
    };

    const saveCar = (car: Car) => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                fetchData();
            })
            .catch((error) => console.error("Error saving car:", error));
    };

    const updateCar = (car: Car, link: any) => {
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                fetchData();
            })
            .catch((error) => console.error("Error updating car:", error));
    };

    const [columnDefs] = useState<ColDef<Car>[]>([
        { field: "brand", headerName: "Brand", flex: 1 },
        { field: "model", headerName: "Model", flex: 1 },
        { field: "color", headerName: "Color", flex: 1 },
        { field: "fuel", headerName: "Fuel, flex: 1" },
        { field: "modelYear", headerName: "Model Year", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
        {
            headerName: "",
            flex: 0.5,
            cellStyle: { textAlign: "center" },
            cellRenderer: (row: any) => (
                <EditCar car={row.data} updateCar={updateCar} />
            ),
        },
        {
            headerName: "",
            flex: 0.5,
            cellStyle: { textAlign: "center" },
            cellRenderer: (row: ICellRendererParams) => (
                <Button
                    color="error"
                    onClick={() => deleteCar(row.data._links.self.href)}
                >
                    Delete
                </Button>
            ),
        },
    ]);

    return (
        <div style={{ height: "calc(100vh - 80px - 56px)", width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                }}
            >
                <AddCar saveCar={saveCar} />
                <Button variant="outlined" onClick={resetData}>
                    {" "}
                    Reset Data{" "}
                </Button>
            </div>
            <AgGridReact
                rowData={cars}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                theme={themeMaterial}
            />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="Car deleted successfully!"
            />
        </div>
    );
}
