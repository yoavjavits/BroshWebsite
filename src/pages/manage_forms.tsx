import {
    ScrollArea,
    Title,
    Center,
    useMantineTheme,
} from '@mantine/core';
import React from "react";
import FormsTable from '../components/forms_table';
import mock_data from '../../data/forms_data.json';
import classes from '@/styles/manage_forms.module.css';
import HeaderSimple from '../components/header'


// interface MissionData {
//     mission_id: number;
//     mission_date: string;
//     mission_name: string;
//     is_done: boolean;
// }

export default function ManageForms() {
    // const [data, setData] = useState<MissionData[]>([]);
    // setData(mock_data);

    const data = mock_data;
    const theme = useMantineTheme();

    return (
        <main>
            <HeaderSimple/>
            <Center>
                <Title size='4rem' style={ {color: theme.colors.blue[8]} }>ניהול סקרים</Title>
            </Center>
            <div className={classes.container}>
                <div className={classes.scrollAreaWrapper}>
                    <ScrollArea>
                        <FormsTable data={data}/>
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}