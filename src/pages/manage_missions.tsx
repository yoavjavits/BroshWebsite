import {
    ScrollArea,
    Title,
    Center,
    useMantineTheme,
} from '@mantine/core';
import React, {useState, useEffect} from "react";
import MissionsTable from '../components/missions_table';
// import mock_data from '../../data/missions_data.json';
import classes from '@/styles/manage_missions.module.css';
import constants from "../../constants.json";
import HeaderSimple from '../components/header'


interface MissionData {
    mission_id: number;
    mission_name: string;
    mission_date: string;
    is_done: boolean;
}

export default function ManageMissions() {
    // const data = mock_data;

    const [data, setData] = useState<MissionData[]>([]);

    let key: string | null;
    let team: string | null;

    useEffect(() => {
        key = window.localStorage.getItem('key');
        team = window.localStorage.getItem('team');
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(constants.server + '/api/getmissions', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({key, team}),
            });

            const data = await response.json();

            if (response.ok) {
                setData(data.missions);
            } else {
                console.error(data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const theme = useMantineTheme();

    useEffect(() => {
        getData().then(() => console.log('Data fetched'));
    }, []);

    return (
        <main>
            <HeaderSimple/>
            <Center>
                <Title size='4rem' style={ {color: theme.colors.blue[8]} }>ניהול משימות</Title>
            </Center>
            <div className={classes.container}>
                <div className={classes.scrollAreaWrapper}>
                    <ScrollArea>
                        <MissionsTable data={data}/>
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}