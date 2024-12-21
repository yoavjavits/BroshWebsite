import cx from 'clsx';
import { Button, Overlay, Title } from '@mantine/core';
import { useRouter } from 'next/router'; // If you're using Next.js
import classes from '@/styles/index.module.css';


export default function Index() {
    const router = useRouter(); // For navigation in a Next.js app

    return (
        <div className={classes.wrapper}>
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    ברוש 87 פלוגה ד התותחים
                </Title>

                <div className={classes.controls}>
                    <Button
                        className={classes.control}
                        variant="black"
                        size="lg"
                        onClick={() => router.push('/login')} // Replace '/login' with the actual path to your login page
                    >
                        Login
                    </Button>
                    <Button
                        className={cx(classes.control, classes.secondaryControl)}
                        component="a" // Change the component to an anchor tag
                        href="https://drive.google.com/drive/folders/1tjYxZR5EF5u6A7p1xcNILxrEDekafgfZ?usp=share_link" // Replace with your actual link
                        target="_blank" // Opens in a new tab
                        rel="noopener noreferrer" // Security measure to prevent malicious activity
                        size="lg"
                        variant="black"
                    >
                        Drive
                    </Button>

                </div>
            </div>
        </div>
        </div>
    );
}