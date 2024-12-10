import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Breadcrums() {
    const location = useLocation();
    const [breadcrumbHistory, setBreadcrumbHistory] = useState([]);

    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(crumb => crumb !== '');
        const newBreadcrumbs = pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            return { label: segment, path };
        });
        setBreadcrumbHistory(prevBreadcrumbs => {
            const currentIndex = prevBreadcrumbs.findIndex(b => b.path === location.pathname);

            if (currentIndex !== -1) {
                return prevBreadcrumbs.slice(0, currentIndex + 1);
            }
            
            return [...prevBreadcrumbs, ...newBreadcrumbs];
        });
    }, [location]);

    return (
        <div className="breadcrumbs">
            {breadcrumbHistory.map((crumb, index) => (
                <div className="crumb" key={crumb.path}>
                    <Link to={crumb.path}>{crumb.label}</Link>
                    {index < breadcrumbHistory.length - 1 && ' > '}
                </div>
            ))}
        </div>
    );
}
