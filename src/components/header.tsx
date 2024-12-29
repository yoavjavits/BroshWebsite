import { useState, useEffect } from 'react';
import { Container, Group } from '@mantine/core';
import { useRouter } from 'next/router'; // Assuming you're using Next.js

import classes from '@/styles/header.module.css';

const Logo = () => {
    return (
        <img
            src="/bhd1_symbol.png"
            alt="Logo"
            style={{ width: '6vh', height: '6vh' }} // Adjust size as needed
        />
    );
};

const links = [
    { link: '/manage_missions', label: 'משימות' },
    { link: '/request_medic', label: 'בקשת חובש' },
    // { link: '/manage_forms', label: 'סקרים' },
    { link: '/request_logistic', label: 'בקשת לוגיסטיקה' },
];

export default function HeaderSimple() {
    const [active, setActive] = useState('');
    const [pageName, setPageName] = useState(''); // Track the current page
    const router = useRouter(); // For navigation in Next.js

    if (pageName == '') {
        console.log('pageName is empty');
    }

    useEffect(() => {
        // Set active link and pageName based on the current route
        const currentPath = router.pathname;
        const currentLink = links.find((link) => link.link === currentPath);

        if (currentLink) {
            setActive(currentPath);
            setPageName(currentLink.label);
        }
    }, [router.pathname]);

    const handleNavigation = (link) => {
        setActive(link.link);
        setPageName(link.label);
        router.push(link.link); // Navigate to the new page
    };

    const items = links.map((link) => (
        <a
            key={link.label}
            className={`${classes.link} ${active === link.link ? classes.active : ''}`}
            onClick={() => handleNavigation(link)}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <Logo />
                <Group gap={5}>
                    {items}
                </Group>

            </Container>
        </header>
    );
}
