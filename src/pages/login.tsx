import {
    Button,
    Paper,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core';
import React, { useState } from "react";
import classes from '@/styles/login.module.css';
import constants from "../../constants.json";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(constants.server+'/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // save in storage the name
                window.localStorage.setItem('key', data.key);
                window.localStorage.setItem('full_name', data.full_name);
                window.localStorage.setItem('team', data.team);
                // redirect to personal page
                window.location.href = './request_medic';
                // writes to console
                console.log('login success for ' + data.full_name + ' with key ' + data.key + ' and team ' + data.team);
            } else {
                setError(data.message || 'Invalid login');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred during login.');
        }
    };


    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    כניסה לחשבון
                </Title>

                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                <TextInput
                    label="שם פרטי"
                    placeholder="שם פרטי..."
                    size="md"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} // Update username state
                    required
                />
                <PasswordInput
                    label="מספר אישי"
                    placeholder="מספר אישי..."
                    mt="md"
                    size="md"
                    value={password}
                    onChange={(event) => {
                        const value = event.target.value;

                        // Allow only numeric input
                        if (/^\d*$/.test(value)) {
                            setPassword(value);
                        }
                    }}
                    required
                />
                <Button fullWidth mt="xl" size="md" onClick={handleLogin}>
                    login
                </Button>
            </Paper>
        </div>
    );
}
