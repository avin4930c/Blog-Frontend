import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to="/">Head Back to home page</Link>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export { ErrorPage }