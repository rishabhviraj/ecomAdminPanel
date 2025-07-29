import { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { Span } from "app/components/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Breadcrumb, SimpleCard } from "app/components";

import {
    Box,
    Icon,
    Table,
    styled,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    IconButton,
    TablePagination,
    Select,
    MenuItem,
    Snackbar


} from "@mui/material";
import { DeleteForeverOutlined, Edit } from "@mui/icons-material";
import { set } from "lodash";
// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
    }
}));
// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));
const brandList = [
    {
        name: "Nike",
        status: "Active",
    },
    {
        name: "Adidas",
        status: "Active",
    },
    {
        name: "Puma",
        status: "In-Active",
    },
];

const Status = [
    { label: "Active", value: "Active" },
    { label: "In-Active", value: "In-Active" },

];


const Brands = () => {
    const [alert, setAlert] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: "",
        type: "" // or "error"
    });


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [openAddNew, setOpenAddNew] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [brand, setBrand] = useState(null);
    const [status, setStatus] = useState("Active");
    const handleChange = (_, newValue) => {
        if (newValue && newValue.inputValue) {
            setBrand(newValue);
            return;
        }
        setBrand(newValue);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleCloseAddUpdate = () => {
        setOpenAddNew(false);
    }
    const handleOpenAdd = () => {
        setBrand("");
        setStatus("Active");
        setIsUpdate(false);
        setOpenAddNew(true);
    }
    const handleOpenUpdate = (Brand) => {
        debugger
        setIsUpdate(true);
        setBrand(Brand.name);
        setStatus(Brand.status);
        setPage(0);
        setOpenAddNew(true);

    }
    const handleDelete = (Brand) => {
        // Logic to delete the brand
        setAlert({
            open: true,
            vertical: "top",
            horizontal: "center",
            message: `Brand ${Brand.name} deleted successfully!`,
            type: "error"

        });
        setTimeout(() => {
            setAlert({ ...alert, open: false });
        }, 3000);

        setOpenAddNew(false);
    };

    const handleAddUpdateBrand = () => {
        // Logic to add a new brand
        setOpenAddNew(false);
        setAlert({
            open: true,
            vertical: "top",
            horizontal: "center",
            message: isUpdate ? `Brand ${brand} updated successfully!` : `Brand ${brand} added successfully!`,
            type: "success"
        });
    };
    const handleCloseAlert = () => {
        setAlert(prev => ({ ...prev, open: false }));
    }
    return (

        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Brands", path: "/material" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Brand">
                    <Button className="btn btn-primary" variant="contained" color="primary" style={{ float: "right" }} onClick={handleOpenAdd}>
                        Add New Brand
                    </Button>
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Brand Name</TableCell>
                                    <TableCell align="left">Active</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {brandList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((subscriber, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{subscriber.name}</TableCell>
                                            <TableCell align="left">{subscriber.status}</TableCell>
                                            <TableCell align="left">
                                                <IconButton aria-label="edit" onClick={() => handleOpenUpdate(subscriber)}>
                                                    <Edit color="primary" x >Edit</Edit>

                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => handleDelete(subscriber)}>

                                                    <DeleteForeverOutlined color="error">Delete</DeleteForeverOutlined>

                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            sx={{ px: 2 }}
                            page={page}
                            component="div"
                            rowsPerPage={rowsPerPage}
                            count={brandList.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ "aria-label": "Next Page" }}
                            backIconButtonProps={{ "aria-label": "Previous Page" }}
                        />
                    </Box>
                </SimpleCard>


            </Stack>
            <Dialog open={openAddNew} onClose={handleCloseAddUpdate} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {isUpdate ? "Update Brand" : "Add New Brand"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Brand Name
                    </DialogContentText>
                    <TextField
                        fullWidth
                        autoFocus
                        id="name"
                        type="text"
                        margin="dense"
                        label="Brand Name"
                        variant="outlined"
                        value={brand || ""}
                        onChange={(e) => handleChange(e, e.target.value)}
                    />
                    <DialogContentText>
                        Select Status
                    </DialogContentText>
                    <Select style={{ width: "100%" }}
                        value={status || ""}
                        onChange={(e) => handleStatusChange(e)}
                    >
                        {Status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleCloseAddUpdate}>
                        Cancel
                    </Button>

                    <Button onClick={handleAddUpdateBrand} color="primary">
                        {isUpdate ? "Update " : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alert.open}
                onClose={handleCloseAlert}
                key={`${alert.vertical},${alert.horizontal}`}
                anchorOrigin={{ vertical: alert.vertical, horizontal: alert.horizontal }}
                ContentProps={{
                    "aria-describedby": "message-id",
                    sx: {
                        backgroundColor: alert.type === "success" ? "#4caf50" : "#f44336", // green or red
                        color: "#fff",
                    },
                }}
                message={<span id="message-id">{alert.message}</span>}
            />

        </Container>

    );
};

export default Brands;
