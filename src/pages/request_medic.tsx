import {Button, Group, SimpleGrid, Textarea, Title, Select, Center, useMantineTheme} from '@mantine/core';
import React, {useState} from 'react';
import HeaderSimple from '../components/header';
import classes from '../styles/request_medic.module.css'
import constants from "../../constants.json";

function generateNext60Days() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + i);

        // Format the date as "YYYY-MM-DD"
        const formattedDate = nextDate.toISOString().split('T')[0];
        dates.push({ value: formattedDate, label: formattedDate });
    }

    return dates;
}


export default function RequestMedic() {
    const dateOptions = generateNext60Days();

    const [request_type, setRequestType] = useState('');
    const [request_date, setRequestDate] = useState('');
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
            const response = await fetch(constants.server+'/api/requestmedic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ key, full_name, request_type, request_date, request_message }),
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
            <Title size='4rem' style={ {color: theme.colors.blue[8]} }>בקשת חובש</Title>
        </Center>
        <div className={classes.formContainer}>
        <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <Select
                    label="סוג בקשה"
                    mt="md"
                    comboboxProps={{ withinPortal: true }}
                    data={['חובש', 'רופא']}
                    placeholder="בחר סוג בקשה"
                    value={request_type}
                    onChange={(event) => {
                        if (event !== null) {
                            setRequestType(event);
                        }
                    }}
                />
                <Select
                    label="תאריך"
                    mt="md"
                    comboboxProps={{ withinPortal: true }}
                    data={dateOptions}
                    placeholder="בחר תאריך בקשה"
                    value={request_date}
                    onChange={(event) => {
                        if (event !== null) {
                            setRequestDate(event);
                        }
                    }}
                />
            </SimpleGrid>

            <Textarea
                mt="md"
                label="פירוט"
                placeholder=""
                maxRows={10}
                minRows={5}
                autosize
                name="message"
                variant="filled"
                value={request_message}
                dir={'rtl'}
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