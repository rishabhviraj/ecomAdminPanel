import { useState } from "react";
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
    TablePagination
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
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

const subscribarList = [
    {
        name: "john doe",
        date: "18 january, 2019",
        amount: 1000,
        status: "close",
        company: "ABC Fintech LTD."
    },
    {
        name: "kessy bryan",
        date: "10 january, 2019",
        amount: 9000,
        status: "open",
        company: "My Fintech LTD."
    },
    {
        name: "kessy bryan",
        date: "10 january, 2019",
        amount: 9000,
        status: "open",
        company: "My Fintech LTD."
    },
    {
        name: "james cassegne",
        date: "8 january, 2019",
        amount: 5000,
        status: "close",
        company: "Collboy Tech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    }
];

export default function orders() {
    debugger;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Orders", path: "/material" }]} />
            </Box>
            <SimpleCard title="Orders List">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Company</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subscribarList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{subscriber.name}</TableCell>
                                        <TableCell align="center">{subscriber.company}</TableCell>
                                        <TableCell align="center">{subscriber.date}</TableCell>
                                        <TableCell align="center">{subscriber.status}</TableCell>
                                        <TableCell align="center">${subscriber.amount}</TableCell>
                                        <TableCell align="right">
                                            <IconButton>
                                                <Icon color="error">close</Icon>
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
                        count={subscribarList.length}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        nextIconButtonProps={{ "aria-label": "Next Page" }}
                        backIconButtonProps={{ "aria-label": "Previous Page" }}
                    />
                </Box>
            </SimpleCard>
        </Container>

    );
}
