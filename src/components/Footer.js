import { Container, Typography, Link, Box  } from '@mui/material';
import GitHubIcon from '../images/gh.png'
import LinkedinIcon from '../images/lk.png'


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" mr={1}>
            {'Copyright © 2023.   '}
            <Typography variant="body4" color="inherit">
                Sitio desarrollado por  <Link href="mailto:augustofonsdev@gmail.com"> augustofonsdev@gmail.com</Link>
            </Typography>{' '}
        </Typography>
    );
    }

    const GitHub = () => (
        <img src={GitHubIcon} alt="github"/>
    )
    const Linkedin = () => (
        <img src={LinkedinIcon} alt="github"/>
    )

const Footer = () => {
    return (
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    borderColor: 'secondary',
                    mt: 8,
                    py: [3, 6],
                }}
                >
                <Box sx={{display:'flex', alignItems: 'center', justifyContent: "center", columnGap: '5px', flexWrap: 'wrap'}}>
                    <Copyright />
                    <Link href='https://github.com/AugustoFons'><GitHub /></Link>
                    <Link href='https://www.linkedin.com/in/augustofons/'><Linkedin /></Link>
                </Box>

            </Container>  )
}

export default Footer