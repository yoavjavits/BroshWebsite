import { Badge, Table, Group, Text, Button } from '@mantine/core';
import React from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';

import mock_data from '../../data/missions_data.json';
import classes from '@/styles/missions_table.module.css';
import constants from "../../constants.json";

interface MissionData {
    mission_id: number;
    mission_date: string;
    mission_name: string;
    is_done: boolean;
}


export default function MissionsTable({ data }: { data: MissionData[]}) {
    if (data === undefined) {
        data = mock_data;
    }

    const [current_data, setCurrentData] = React.useState<MissionData[]>(data);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [rowsPerPage] = React.useState(7);

    React.useEffect(() => {
        setCurrentData(data);
    }, [data]);

    const toggleStatus =  async (index: number) => {
        const updatedData = current_data.map((mission_data, i) =>
            i === index ? { ...mission_data, ['is_done']: !mission_data['is_done'] } : mission_data
        );
        setCurrentData(updatedData);

        // upload the data to the server
        const key = window.localStorage.getItem('key');
        const full_name = window.localStorage.getItem('full_name');
        const team = window.localStorage.getItem('team');

        const mission_id = current_data[index].mission_id;

        try {
            const response = await fetch(constants.server+'/api/missionupdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ key, full_name, mission_id, is_done: updatedData[index].is_done, team}),
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
    };

    const handlePrevPage = () => {
        setPageIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextPage = () => {
        setPageIndex((prev) => Math.min(prev + 1, Math.floor(current_data.length / rowsPerPage)));
    };

    const currentPageUsers = current_data.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage);
    const rows = currentPageUsers.map((item, index) => (
        <Table.Tr key={item.mission_id}>
            <Table.Td>
                    <div>
                    <Text fz="md" fw={500}>
                        {item.mission_date}
                    </Text>
                </div>
            </Table.Td>

            <Table.Td>
                <div>
                    <Text fz="md" fw={500}>
                        {item.mission_name}
                    </Text>
                </div>
            </Table.Td>

            <Table.Td>
                <Badge
                    fullWidth
                    variant="light"
                    onClick={() => toggleStatus(index + pageIndex * rowsPerPage)}
                    style={{ cursor: 'pointer' }}
                    color={item.is_done ? 'green' : 'red'}
                    leftSection={item.is_done ? <IconCheck size={16} /> : <IconX size={16} />}
                >
                    {item.is_done ? '' : ''}
                </Badge>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div>
            <Table.ScrollContainer minWidth={400}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className={classes.missionDate} >תאריך הגשה</Table.Th>
                            <Table.Th className={classes.missionName}>שם מטלה</Table.Th>
                            <Table.Th className={classes.isDone}>סטטוס מטלה</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <Group mt="md">
                <Button onClick={handlePrevPage} disabled={pageIndex === 0}>Previous</Button>
                <Button onClick={handleNextPage} disabled={(pageIndex + 1) * rowsPerPage >= current_data.length}>Next</Button>
            </Group>

        </div>
    );
}