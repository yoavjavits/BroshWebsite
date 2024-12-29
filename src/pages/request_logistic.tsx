import {Button, Center, Group, Textarea, Title, useMantineTheme} from '@mantine/core';
import React, {useState} from 'react';
import HeaderSimple from '../components/header';
import classes from '../styles/request_logistic.module.css'
import constants from "../../constants.json";

export default function RequestLogistic() {
    const [request_message, setRequestMessage] = useState('');
    const theme = useMantineTheme();

    const handleSubmit = async () => {
        // event.preventDefault(); // Prevent the form's default refresh behavior

        const key = window.localStorage.getItem('key');
        const full_name = window.localStorage.getItem('full_name');

        // // Wait for 3 seconds before refreshing the page
        // setTimeout(() => {
        //     window.location.reload(); // Refresh the page
        // }, 10000); // 3000 ms = 3 seconds

        console.log(key);
        console.log(full_name);

        try {
            const response = await fetch(constants.server+'/api/requestlogistic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ key, full_name, request_message }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
            } else {
                console.error(data);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <main>
            <HeaderSimple />
            <Center>
                <Title size='4rem' style={ {color: theme.colors.blue[8]} }>בקשה לוגיסטית</Title>
            </Center>
            <div className={classes.formContainer}>
                <div className={classes.formWrapper}>
                    <form onSubmit={handleSubmit}>
                        <Textarea
                            mt="md"
                            placeholder=""
                            maxRows={10}
                            minRows={5}
                            autosize
                            name="message"
                            variant="filled"
                            value={request_message}
                            onChange={(event) => setRequestMessage(event.currentTarget.value)}
                        />

                        <Group justify="center" mt="xl">
                            <Button type="submit" size="md">
                                שליחת בקשה
                            </Button>
                        </Group>
                    </form>
                </div>
            </div>
        </main>
    );
}