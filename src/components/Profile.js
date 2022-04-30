import { Button, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider';

function Profile() {
    const { auth, setAuth } = useContext(AuthContext);
    const paperStyle = { padding: "50px 20px", width: 1000, margin: "20px auto" };
    return (

        <Paper elevation={3} style={paperStyle}>
            <h2 style={{ color: "#05C3DD" }}>Profile</h2>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>{auth.username}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Role</TableCell>
                    <TableCell>{auth.role}</TableCell>
                </TableRow>

            </TableBody>
        </Table>
        </Paper>
    )
}

export default Profile
