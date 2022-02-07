import Link from 'next/link';
import { useRouter } from 'next/router';

const AppHeader = ({ navList }: { navList?: { href: string, title: string }[] }) => {
    const router = useRouter();

    return <div className="container">
        <header className='d-flex flex-wrap justify-content-center align-items-center'>
            <div>
                <Link href='/'>
                    <a className='text-dark'>My Blog App</a>
                </Link>
            </div>
            {navList && navList.length > 0 &&
                <ul className="col nav nav-pills justify-content-end">
                    {
                        navList.map(
                            nav => (
                                <li className='nav-item'
                                    key={nav.title}>
                                    <Link href={nav.href} >
                                        <a className={`nav-link ${router.pathname === nav.href ? "active" : ""}`}>{nav.title}</a>
                                    </Link>
                                </li>
                            )
                        )
                    }
                </ul>
            }
        </header>
    </div>;
};

export default AppHeader;