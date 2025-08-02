import { useState, useContext, useEffect, useCallback } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    MenuItem,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Box,
    Stack,
    styled
} from "@mui/material";
import { DeleteForeverOutlined, Edit } from "@mui/icons-material";
import { Breadcrumb, SimpleCard } from "app/components";
import ProductContext from "../../../contexts/ProductContext";
//import swal from "sweetalert2";
import swal from "sweetalert";
//import withReactContent from 'sweetalert2-react-content';
//const GlamSwal = withReactContent(swal);

// Styles
const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
    }
}));

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));

const StatusOptions = [
    { label: "Active", value: "Active" },
    { label: "In-Active", value: "In-Active" }
];

const Brands = () => {
    const { addBrand, getBrandList, brands, updateBrand, deleteBrand } = useContext(ProductContext);

    const [brandData, setBrandData] = useState([]);
    const [alert, setAlert] = useState({ open: false, message: "", type: "" });
    const [openAddNew, setOpenAddNew] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [brand, setBrand] = useState("");
    const [status, setStatus] = useState("Active");
    const [brandId, setBrandId] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const showAlert = (message, type = "info", duration = 2000) => {
        setAlert({ open: true, message, type });
        setTimeout(() => {
            setAlert({ open: false, message: "", type: "" });
        }, duration);
    };

    const handleOpenAdd = () => {
        setIsUpdate(false);
        setBrand("");
        setStatus("Active");
        setOpenAddNew(true);
    };

    const handleOpenUpdate = (e, brand) => {
        setIsUpdate(true);
        setBrand(brand.brandName);
        setStatus(brand.status);
        setBrandId(brand.id);
        setOpenAddNew(true);
    };

    const handleCloseAddUpdate = () => {
        setOpenAddNew(false);
    };

    const handleDelete = async (e, brand) => {
        debugger
        e.preventDefault();
        e.stopPropagation(); // Prevent row click event
        if (!brand || !brand.id) {
            return showAlert("Invalid brand data", "error");
        }

        swal({
            title: "Are you sure?",
            text: `Are you sure you want to delete the brand "${brand.brandName}"?`,
            icon: "warning",
            dangerMode: true,
            buttons: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const deleteResult = await deleteBrand(brand.id, brand.brandName, brand.status);
                    if (deleteResult.success) {
                        showAlert(`Brand "${brand.brandName}" deleted successfully!`, "success");
                    } else {
                        showAlert(deleteResult.error || "Failed to delete brand", "error");
                    }

                    fetchBrandList(); // refresh list after delete
                    setOpenAddNew(false);
                }
            });

        // Call deleteBrand function from context

    };

    const handleAddBrand = async () => {
        if (!brand.trim()) {
            return showAlert("Brand name is required", "error");
        }

        const result = await addBrand(brand, status);


        if (result.success) {
            showAlert(isUpdate ? `Brand "${brand}" updated!` : `Brand "${brand}" added!`, "success");
            setOpenAddNew(false);
            setBrand("");
            setStatus("Active");
            setBrandId(0);
            setIsUpdate(false);
            fetchBrandList(); // refresh list after add/update
        } else {
            showAlert(result.error || "Failed to add brand", "error");
        }
    };
    const handleUpdateBrand = async () => {
        debugger;
        if (!brand.trim()) {
            return showAlert("Brand name is required", "error");
        }


        swal({
            title: "Are you sure?",
            text: `Are you sure you want to update the brand "${brand}"?`,
            icon: "warning",
            dangerMode: true,
            buttons: true,

        })
            .then(async (willUpdate) => {
                if (willUpdate) {
                    const result = await updateBrand(brandId, brand, status);
                    if (result.success) {
                        showAlert(`Brand "${brand}" updated successfully!`, "success");
                        setOpenAddNew(false);
                        setBrandId(0);
                        setBrand("");
                        setStatus("Active");
                        setIsUpdate(false);
                        fetchBrandList(); // refresh list after update
                    } else {
                        showAlert(result.error || "Failed to update brand", "error");
                    }
                }
            });

    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const fetchBrandList = useCallback(async () => {
        try {
            const result = await getBrandList();
            if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                setBrandData(result.data);
                fetchBrandList();
                //showAlert("Brand list fetched successfully!", "success");
            } else {
                setBrandData([]);
                showAlert("No brand data found.", "error");
            }
        } catch (e) {
            setBrandData([]);
            showAlert(e.message || "Failed to fetch brand list", "error");
        }
    }, [getBrandList]);

    useEffect(() => {
        fetchBrandList();
    }, []);

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Brands", path: "/material" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Brand">
                    <Button variant="contained" color="primary" style={{ float: "right" }} onClick={handleOpenAdd}>
                        Add New Brand
                    </Button>

                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Brand Name</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {brandData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((b, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{b.brandName}</TableCell>
                                            <TableCell align="left">{b.status}</TableCell>
                                            <TableCell align="left">
                                                <IconButton onClick={(e) => handleOpenUpdate(e, b)}>
                                                    <Edit color="primary" />
                                                </IconButton>
                                                <IconButton onClick={(e) => handleDelete(e, b)}>
                                                    <DeleteForeverOutlined color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            page={page}
                            component="div"
                            rowsPerPage={rowsPerPage}
                            count={brandData.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </SimpleCard>
            </Stack>

            <Dialog open={openAddNew} onClose={handleCloseAddUpdate} className="modal-backdrop">
                <DialogTitle>{isUpdate ? "Update Brand" : "Add New Brand"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Brand Name</DialogContentText>
                    <TextField
                        fullWidth
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        label="Brand Name"
                        variant="outlined"
                        margin="dense"
                    />
                    <DialogContentText sx={{ mt: 2 }}>Select Status</DialogContentText>
                    <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
                        {StatusOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleCloseAddUpdate}>
                        Cancel
                    </Button>
                    {isUpdate ? (
                        <Button variant="contained" onClick={handleUpdateBrand} color="primary">
                            Update
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleAddBrand} color="primary">
                            Save
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            <Snackbar
                open={alert.open}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                ContentProps={{
                    sx: {
                        backgroundColor: alert.type === "success" ? "#4caf50" : "#f44336",
                        color: "#fff"
                    }
                }}
                message={alert.message}
            />
        </Container>
    );
};

export default Brands;
