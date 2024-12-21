import { Badge, Table, Group, Text, Button } from '@mantine/core';
import React from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';

import mock_data from '../../data/forms_data.json';
import classes from '@/styles/missions_table.module.css';

interface FormData {
    form_id: number;
    form_url: string;
    is_done: boolean;
}


export default function FormsTable({ data }: { data: FormData[] }) {
    if (data === undefined) {
        data = mock_data;
    }

    const [current_data, setCurrentData] = React.useState<FormData[]>(data);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [rowsPerPage] = React.useState(7);

    React.useEffect(() => {
        setCurrentData(data);
    }, [data]);

    const toggleStatus = (index: number) => {
        const updatedData = current_data.map((mission_data, i) =>
            i === index ? { ...mission_data, ['is_done']: !mission_data['is_done'] } : mission_data
        );
        setCurrentData(updatedData);
    };

    const handlePrevPage = () => {
        setPageIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextPage = () => {
        setPageIndex((prev) => Math.min(prev + 1, Math.floor(current_data.length / rowsPerPage)));
    };

    const currentPageUsers = current_data.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage);
    const rows = currentPageUsers.map((item, index) => (
        <Table.Tr key={item.form_id}>
            <Table.Td>
                <div>
                    <Text fz="md" fw={500}>
                        {item.form_url}
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
                            <Table.Th className={classes.formUrl}>כתובת סקר</Table.Th>
                            <Table.Th className={classes.isDone}>סטטוס ביצוע</Table.Th>
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